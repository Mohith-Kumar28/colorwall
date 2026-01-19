import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders } from "next/headers";
import { loginSchema, registerSchema } from "../schemas";
import { generateAuthCookie } from "../utils";
import { stripe, isStripeEnabled } from "@/lib/stripe";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.payload.auth({ headers });

    return session;
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const existingData = await ctx.payload.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingUser = existingData.docs[0];

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

      // Also check if a tenant with this slug already exists
      const existingTenant = await ctx.payload.find({
        collection: "tenants",
        limit: 1,
        where: {
          slug: {
            equals: input.username,
          },
        },
      });

      if (existingTenant.docs[0]) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This username is already taken",
        });
      }

      // Stripe account creation is optional
      let stripeAccountId: string | undefined;
      if (isStripeEnabled() && stripe) {
        try {
          const account = await stripe.accounts.create({});
          stripeAccountId = account.id;
        } catch (error) {
          console.warn("Stripe account creation skipped:", error);
          // Continue without Stripe - will be set up later
        }
      }

      try {
        const tenant = await ctx.payload.create({
          collection: "tenants",
          data: {
            name: input.username,
            slug: input.username,
            stripeAccountId: stripeAccountId || "pending", // Placeholder when Stripe is disabled
          },
        });

        await ctx.payload.create({
          collection: "users",
          data: {
            email: input.email,
            password: input.password, // This will be hashed
            username: input.username,
            tenants: [{ tenant: tenant.id }],
          },
        });
      } catch (error) {
        console.error("Registration error:", error);
        if (error instanceof Error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
            cause: error,
          });
        }
        throw error;
      }


      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      await generateAuthCookie({
        prefix: ctx.payload.config.cookiePrefix,
        value: data.token,
      });
    }),
  login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const data = await ctx.payload.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }

    await generateAuthCookie({
      prefix: ctx.payload.config.cookiePrefix,
      value: data.token,
    });

    return { user: data.user };
  }),
});
