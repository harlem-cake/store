const isProd = process.env.NODE_ENV === "production";

// ⚠️ Cambia esto por el nombre de tu repo en GitHub
const REPO_NAME = "Harlem-Cake";

const nextConfig = {
  output: "export",                 // <-- genera estáticos en /out
  images: { unoptimized: true },    // <-- necesario para export
  basePath: isProd ? `/${REPO_NAME}` : "",
  assetPrefix: isProd ? `/${REPO_NAME}/` : "",
  trailingSlash: true,              // rutas como /cakes/ (mejor en GH Pages)
};

export default nextConfig;
