import { revalidate, FlushedChunks, flushChunks } from '@module-federation/nextjs-mf/utils';
import { NextPageContext } from 'next';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

interface MyDocumentProps extends DocumentInitialProps {
  chunks: any;
}

class MyDocument extends Document<MyDocumentProps> {

  render() {
    return (
      <Html lang="en">
        <Head>
          <title>awdadwadw</title>
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
