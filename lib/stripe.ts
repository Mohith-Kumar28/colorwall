import Stripe from "stripe";

// Stripe is optional - only initialize if API key is configured
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-08-27.basil",
      typescript: true,
    })
  : null;

// Helper to check if Stripe is enabled
export const isStripeEnabled = () => stripe !== null;
