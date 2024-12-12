import "@/styles/globals.css";
import { revalidate } from "@module-federation/nextjs-mf/utils";
import type { AppContext, AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router; // 현재 경로 가져오기



  return (
    <div>
      <Component />
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

