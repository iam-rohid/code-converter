import Header from "../components/Header";
import SideBar from "../components/SideBar";
import "tailwindcss/tailwind.css";
import "../styles/main.scss";
import ThemeProvider from "../hooks/useTheme";
import SnackbarProvider from "../hooks/useSnackbar";
import { AppProps } from "next/app";
import Script from "next/script";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7322439099058988"
        crossOrigin="anonymous"
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
        }}
      />
      <ThemeProvider>
        <SnackbarProvider>
          <div className="w-screen h-screen flex overflow-hidden flex-col">
            <Header />
            <div className="flex-1 flex overflow-hidden">
              <SideBar />
              <div className="flex-1">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};
export default MyApp;
