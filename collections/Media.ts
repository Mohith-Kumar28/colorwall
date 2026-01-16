import type { CollectionConfig, CollectionBeforeValidateHook } from "payload";
import { isSuperAdmin } from "@/lib/access";
import { APIError } from "payload";

/**
 * Maximum file size for uploads (in bytes)
 * 45 MB = 45 * 1024 * 1024 bytes
 */
export const MAX_FILE_SIZE_MB = 45;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * Hook to validate file size before saving
 * Ensures uploaded files don't exceed the size limit
 */
const validateFileSize: CollectionBeforeValidateHook = async ({
  data,
  operation,
}) => {
  // Only validate on create operations (new uploads)
  if (operation !== "create") {
    return data;
  }

  const fileSize = data?.filesize as number | undefined;
  if (fileSize && fileSize > MAX_FILE_SIZE_BYTES) {
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    const errorMessage = `File size (${fileSizeMB} MB) exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB} MB. Please compress your file and try again.`;

    const error = new APIError(errorMessage, 400);
    error.isPublic = true;
    throw error;
  }

  return data;
};

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  access: {
    read: () => true,
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  hooks: {
    beforeValidate: [validateFileSize],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
