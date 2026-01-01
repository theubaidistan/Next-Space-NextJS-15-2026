// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com',
//         port: '',
//         pathname: '/u/**',
//       }
//     ]
//   }
// }

// module.exports = nextConfig
//*--------------------------------------------------------------
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i1.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.rookiemag.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.hdwallpapers.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.wallpapersden.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.creativeuncut.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.alistdaily.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },

      // ✅ GOOGLE IMAGE CDN (THIS FIXES YOUR ERROR)
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dobkoncyi/**', // 👈 your cloud name
      },
    ],
  },
};

module.exports = nextConfig;
