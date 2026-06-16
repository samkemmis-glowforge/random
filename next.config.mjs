const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the page ships as plain HTML/CSS/JS (out/).
  output: "export",
  images: { unoptimized: true },
  // Set to "/random" on GitHub Pages; empty locally.
  basePath: base,
  trailingSlash: true,
};

export default nextConfig;
