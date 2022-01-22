import Header from "../components/Header";
import SideBar from "../components/SideBar";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="bg-white dark:bg-gray-900 w-screen h-screen flex overflow-hidden flex-col text-gray-900 dark:text-white">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <SideBar />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default MyApp;
