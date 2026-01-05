import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Colorwall",
  description: "Get in touch with the Colorwall team. We're here to help with any questions about art, orders, or becoming an artist.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
