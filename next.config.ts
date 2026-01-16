import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Allow uploads up to 50 MB (buffer over 40 MB file limit)
    },
  },
};

export default withPayload(nextConfig);
