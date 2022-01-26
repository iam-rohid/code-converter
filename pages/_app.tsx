import Header from "../components/Header";
import SideBar from "../components/SideBar";
import "tailwindcss/tailwind.css";
import "../styles/main.scss";
import ThemeProvider from "../hooks/useTheme";
import SnackbarProvider from "../hooks/useSnackbar";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
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
  );
};
export default MyApp;
