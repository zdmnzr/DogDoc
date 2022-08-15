/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },

  reactStrictMode: true,
  // swcMinify: true,
  
  images:{
    domains:['brucecai55520.gitee.io','cdn.sanity.io',
    'yt3.ggpht.com',
              'lh3.googleusercontent.com',
               'image.baidu.com']
  }
}

module.exports = nextConfig
