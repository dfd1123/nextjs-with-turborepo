import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import PagesMap from 'docs/pages-map';
// const DocsPage = dynamic(() =>
//   import("docs/pages-map").then((mod) => mod["/"]), {
//     ssr: false
//   }
// )

// console.log(DocsPage);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router; // 현재 경로 가져오기



  return (
    <div>
      <Component />
    </div>
  );
}
