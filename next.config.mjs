import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  // phmarket.de has no German-for-Germany site yet, it sends visitors to the Austrian one (temporary redirect)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?phmarket\\.de"}],
        destination: "https://www.phmarket.at/:path*",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
