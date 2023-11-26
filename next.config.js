const withMDX = require('@next/mdx')()


/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects (){
    return [
      {
        source:'/',
        destination:'/home',
        permanent:true
      },
    ]
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

module.exports = withMDX(nextConfig)
