/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // We primarily use plain <img> tags so images work anywhere (not just Vercel).
    // If you move to next/image, no extra domains are needed since all photos
    // are served from /public.
  },
};

module.exports = nextConfig;
