// next.config.ts
const isProd = process.env.GITHUB_ACTIONS === "true";
const repo = "store";
const base = isProd ? `/${repo}` : "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base ? `${base}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: base, // 👈 disponible en el cliente
  },
};

export default nextConfig;
