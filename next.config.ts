import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  deploymentId: process.env.NEXT_DEPLOYMENT_ID ?? process.env.VERCEL_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA,
  async headers() {
    return ["/", "/a", "/b-leadmagnet"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
    }));
  },
  async redirects() {
    return [
      { source: "/", destination: "/b", permanent: false },
      { source: "/a", destination: "/b", permanent: false },
      {
        source: "/b-leadmagnet",
        destination: "/a-leadmagnet",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
