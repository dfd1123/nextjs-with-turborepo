import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const NODE_ENV = process.env.NODE_ENV;
const prod = NODE_ENV === 'production';

const tsConfigPath = prod ? './tsconfig.prod.json' : './tsconfig.json';
const transpilePackages = prod ? undefined : ['../shop', '../community'];

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    tsconfigPath: tsConfigPath
  },
  transpilePackages: transpilePackages,
  webpack(config, options) {
    if (prod) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'shell',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            '@shop': `shop@http://localhost:3002/_next/static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
            '@community': `community@http://localhost:3001/_next/static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          },
          extraOptions: {
            exposePages: true
          },
        })
      )
    }
    return config
  }
};

export default nextConfig;
