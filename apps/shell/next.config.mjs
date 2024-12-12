import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const NODE_ENV = process.env.NODE_ENV;
const prod = NODE_ENV === 'production';

const tsConfigPath = prod ? './tsconfig.prod.json' : './tsconfig.json';
const transpilePackages = prod ? undefined : ['../docs'];

/** @type {import('next').NextConfig} */
const nextConfig = {
  port: 3000,
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
            '@docs': `docs@http://localhost:3002/_next/static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
            'test-app': `test-app@http://localhost:3001/_next/static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          },
          shared: {},
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
