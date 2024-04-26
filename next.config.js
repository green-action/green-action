/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'ulktftvdjrjqufolvcxd.supabase.co',
      'korean.visitseoul.net',
      'pds.dailypharm.com',
      'img1.daumcdn.net',
    ],
  },
};

module.exports = nextConfig;
