/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['books.google.com'],
  },
  webpack: (config) => {
    config.externals = {
      jquery: 'jQuery',
    };
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.map$/,
          loader: 'ignore-loader',
        },
      ],
    };
    return config;
  },
};

export default nextConfig;
