/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the page still ships as plain HTML/CSS/JS (out/).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
