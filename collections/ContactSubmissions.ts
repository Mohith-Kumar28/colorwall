import type { CollectionConfig } from "payload";
import { isSuperAdmin } from "@/lib/access";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["name", "email", "subject", "createdAt"],
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  access: {
    // Anyone can create (submit contact form)
    create: () => true,
    // Only super admins can read, update, delete
    read: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "subject",
      type: "text",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
  ],
  timestamps: true,
};
