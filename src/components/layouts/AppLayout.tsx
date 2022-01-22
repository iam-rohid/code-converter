import { Outlet } from "react-router-dom";
import Header from "../Header";
import SideBar from "../SideBar";

const AppLayout = () => {
  return (
    <div className="bg-white dark:bg-gray-900 w-screen h-screen flex overflow-hidden flex-col text-gray-900 dark:text-white">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <SideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
