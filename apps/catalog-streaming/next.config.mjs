/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@synapse/design-tokens",
    "@synapse/sdui-engine",
    "@synapse/ui-core",
  ],
};

export default nextConfig;
