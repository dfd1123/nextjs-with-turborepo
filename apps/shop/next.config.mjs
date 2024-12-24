import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options){
      config.plugins.push(
        new NextFederationPlugin({
          name: 'shop',
          filename: `static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          exposes: {
            './pages/shop': './src/pages/shop',
          },
          extraOptions: {
              exposePages: true,
              enableImageLoaderFix: true,
              enableUrlLoaderFix: true,
              automaticAsyncBoundary: true,  
            },
        })
      )

      return config
    }
};

export default nextConfig;
