import { NextFederationPlugin } from '@module-federation/nextjs-mf';

/** @type {import('next').NextConfig} */
const nextConfig = {
    port: 3001,
    webpack(config){
        config.plugins.push(
          new NextFederationPlugin({
            name: 'test-app',
            filename: 'static/chunks/remoteEntry.js',
            exposes: {},
            shared: {},
            extraOptions: {
                exposePages: true,
                enableImageLoaderFix: true,
                enableUrlLoaderFix: true,
                skipSharingNextInternals: true
              },
          })
        )
        return config
      }
};

export default nextConfig;
