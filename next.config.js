const withMDX = require('@next/mdx')()


/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:['placehold.co','firebasestorage.googleapis.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
      {
        source: '/admin',
        destination: '/admin/posts',
        permanent: true
      }
    ]
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async headers() {
    return [
      {
        // matching all API routes
        // https://vercel.com/guides/how-to-enable-cors
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
      {
        source: "/api/posts/:slug/publish",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      }
    ];
  },
}

module.exports = withMDX(nextConfig)
