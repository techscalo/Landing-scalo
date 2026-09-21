import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/b", permanent: true },
      { source: "/a", destination: "/b", permanent: true },
      {
        source: "/b-leadmagnet",
        destination: "/a-leadmagnet",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
