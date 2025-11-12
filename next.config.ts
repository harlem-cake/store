// next.config.js
/** @type {import('next').NextConfig} */
const isGH = process.env.GITHUB_ACTIONS === 'true';

module.exports = {
  output: 'export',                   // ✅ reemplaza a "next export"
  images: { unoptimized: true },      // ✅ necesario en GitHub Pages
  trailingSlash: true,                // ✅ genera index.html por carpeta (mejor en GH Pages)
};
