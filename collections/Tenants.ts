import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
    // Hide from non-super-admins in admin panel
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Store name",
      admin: {
        description: "This is the name of the store (e.g Fabio's Store)",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Store slug",
      admin: {
        description:
          "This is the subdomain of the store (e.g [slug].colorwall.com)",
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      validate: (value: string | null | undefined) => {
        if (!value) return "Slug is required";
        if (value.length < 3) return "Slug must be at least 3 characters long";
        if (value.length > 63) return "Slug must be at most 63 characters long";
        if (value.includes("--")) {
          return "Slug cannot contain consecutive hyphens.";
        }
        // The regex requires at least 2 chars: start [a-z0-9], middle [a-z0-9-]*, end [a-z0-9]
        if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(value)) {
          return "Slug can only contain lowercase letters, numbers, and hyphens. It must start and end with a letter or number.";
        }
        return true;
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: "Stripe account ID associated with your shop",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "You cannot create products until you have submitted your Stripe details",
      },
    },
  ],
};
