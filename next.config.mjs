/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/cs", destination: "/", permanent: true },
      { source: "/cs/:path*", destination: "/:path*", permanent: true },
      { source: "/pl", destination: "/", permanent: true },
      { source: "/pl/:path*", destination: "/:path*", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
