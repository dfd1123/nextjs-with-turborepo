import "@/styles/globals.css";
import { revalidate } from "@module-federation/nextjs-mf/utils";
import type { AppContext, AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}


App.getInitialProps = async ({ctx}: AppContext) => {
  if(process.env.NODE_ENV === "production") {
    ctx?.res?.on("finish", async () => {
      revalidate();
    });
  }

  return { pageProps: {} };
};

