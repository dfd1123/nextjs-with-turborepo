import { revalidate, FlushedChunks, flushChunks }from '@module-federation/nextjs-mf/utils';
import { NextPageContext } from 'next';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

interface MyDocumentProps extends DocumentInitialProps {
  chunks: any;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    if(process.env.NODE_ENV === "development" && !ctx.req?.url?.includes("_next")) {
      await revalidate().then((shouldReload) =>{
        if (shouldReload) {
          ctx.res?.writeHead(302, { Location: ctx.req?.url });
          ctx.res?.end();
        }
      });
    } else {
      ctx?.res?.on("finish", () => {
        revalidate()
      });
    }

    console.log("initialProps", initialProps, 'ctx', ctx);

    if(process.env.NODE_ENV === "production") {
      const chunks = await flushChunks();
      return {
        ...initialProps,
        chunks
      };
    }

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
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
