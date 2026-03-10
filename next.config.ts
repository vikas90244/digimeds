import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"res.cloudinary.com",
        pathname:"/dnz8xhjtx/**"
      }
    ]
  }
};

export default nextConfig;
