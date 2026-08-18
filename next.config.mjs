/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pg has optional native bindings; keep it external so Next.js doesn't
  // fail to bundle it for serverless. It's a normal npm dep, loaded at runtime.
  experimental: {
    serverComponentsExternalPackages: ["pg", "pg-native"],
  },
};
export default nextConfig;
