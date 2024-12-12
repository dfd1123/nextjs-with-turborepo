import { NextFederationPlugin } from '@module-federation/nextjs-mf';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    port: 3002,
    webpack(config, options){
      config.plugins.push(
        new NextFederationPlugin({
          name: 'docs',
          filename: `static/${options.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          exposes: {
            './pages/docs': './src/pages/docs',
          },
          remotes: {
            // 원격 엔트리 캐싱 비활성화를 위한 설정
            '@remote': `docs@http://localhost:3002/_next/static/chunks/remoteEntry.js`
          },
          shared: {},
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
