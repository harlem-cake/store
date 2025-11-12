// next.config.mjs
const isProd = process.env.GITHUB_ACTIONS === 'true';
const repo = 'Harlem-Cake';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',
  },
};

export default nextConfig;
