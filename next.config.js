const createNextPluginPreval = require('next-plugin-preval/config');
const withNextPluginPreval = createNextPluginPreval();
const nextConfig = {
  scrollRestoration: 'manual',
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = withNextPluginPreval(nextConfig);
