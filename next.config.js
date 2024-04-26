/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'ulktftvdjrjqufolvcxd.supabase.co' },
      { hostname: 'korean.visitseoul.net' },
      { hostname: 'pds.dailypharm.com' },
      { hostname: 'img1.daumcdn.net' },
    ],
  },
};

module.exports = nextConfig;
