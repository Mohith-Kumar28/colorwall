import type { CollectionConfig } from "payload";
import { isSuperAdmin } from "@/lib/access";
import type { CollectionBeforeValidateHook } from "payload";
import { APIError } from "payload";

/**
 * Poster size presets for print quality (300 DPI)
 * These can be easily modified to change the minimum required dimensions
 */
export const POSTER_SIZE_PRESETS = {
  // Custom size based on user requirement
  custom: { width: 3824, height: 5032, label: "Custom Poster" },
  // Standard poster sizes at 300 DPI
  "18x24": { width: 5400, height: 7200, label: '18x24" Standard Poster' },
  "24x36": { width: 7200, height: 10800, label: '24x36" Large Poster' },
  A3: { width: 3508, height: 4961, label: "A3 (11.7 x 16.5 inches)" },
  A2: { width: 4961, height: 7016, label: "A2 (16.5 x 23.4 inches)" },
  A1: { width: 7016, height: 9933, label: "A1 (23.4 x 33.1 inches)" },
  // More lenient options (150 DPI - acceptable for viewing distance)
  "18x24_150dpi": { width: 2700, height: 3600, label: '18x24" (150 DPI)' },
  A3_150dpi: { width: 1754, height: 2480, label: "A3 (150 DPI)" },
} as const;

// Current active preset - change this to switch minimum requirements
export const ACTIVE_PRESET: keyof typeof POSTER_SIZE_PRESETS = "custom";

export const currentPreset = POSTER_SIZE_PRESETS[ACTIVE_PRESET];
export const MIN_WIDTH = currentPreset.width;
export const MIN_HEIGHT = currentPreset.height;

/**
 * Maximum file size for uploads (in bytes)
 * 45 MB = 45 * 1024 * 1024 bytes
 */
export const MAX_FILE_SIZE_MB = 45;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * Hook to validate image dimensions and file size before saving
 * Ensures uploaded images meet print quality requirements and size limits
 */
const validateImageDimensions: CollectionBeforeValidateHook = async ({
  data,
  operation,
}) => {
  // Only validate on create operations (new uploads)
  if (operation !== "create") {
    return data;
  }

  // Validate file size
  const fileSize = data?.filesize as number | undefined;
  if (fileSize && fileSize > MAX_FILE_SIZE_BYTES) {
    const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    const errorMessage = `File size (${fileSizeMB} MB) exceeds the maximum allowed size of ${MAX_FILE_SIZE_MB} MB. Please compress your image and try again.`;

    const error = new APIError(errorMessage, 400);
    error.isPublic = true;
    throw error;
  }

  const width = data?.width as number | undefined;
  const height = data?.height as number | undefined;

  if (width && height) {
    // Check both orientations (landscape and portrait)
    const meetsPortraitRequirements =
      width >= MIN_WIDTH && height >= MIN_HEIGHT;
    const meetsLandscapeRequirements =
      width >= MIN_HEIGHT && height >= MIN_WIDTH;

    if (!meetsPortraitRequirements && !meetsLandscapeRequirements) {
      const errorMessage = `Image too small (${width}x${height}). Need ${MIN_WIDTH}x${MIN_HEIGHT}px min.`;

      // APIError with isPublic=true shows the message in admin UI toast
      const error = new APIError(errorMessage, 400);
      error.isPublic = true;
      throw error;
    }
  }

  return data;
};

export const ProductMedia: CollectionConfig = {
  slug: "product-media",
  admin: {
    description: `High-resolution product images for poster printing. Minimum resolution: ${MIN_WIDTH}x${MIN_HEIGHT}px (${currentPreset.label} at 300 DPI)`,
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  access: {
    read: () => true,
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  hooks: {
    beforeValidate: [validateImageDimensions],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/tiff"],
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 400,
        position: "centre",
      },
      {
        name: "preview",
        width: 1200,
        height: 1200,
        position: "centre",
      },
    ],
  },
};
