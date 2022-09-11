const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  trailingSlash: true,
  webpack5: true,
  images: {
    domains: ['cdn.pixabay.com', 'pixabay.com', 'www.paypal.com', 'paypal.com'],
  },
})
