import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import {
  revalidate,
  FlushedChunks,
  flushChunks,
} from '@module-federation/nextjs-mf/utils';

interface MyDocumentProps extends DocumentInitialProps {
  chunks: any[];
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    if (ctx.pathname) {
      if (!ctx.pathname.endsWith('_error')) {
        await revalidate().then((shouldUpdate) => {
          if (shouldUpdate) {
            console.log('should HMR', shouldUpdate);
          }
        });
      }
    }

    const initialProps = await Document.getInitialProps(ctx);

    const chunks = await flushChunks();

    return {
      ...initialProps,
      chunks,
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <FlushedChunks chunks={this.props.chunks} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
