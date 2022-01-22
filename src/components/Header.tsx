import { MenuIcon, StarIcon, SunIcon } from "@heroicons/react/outline";
const Header = () => {
  return (
    <nav className="w-full h-14 border-b border-gray-100 dark:border-gray-800 px-4 gap-4 flex overflow-hidden text-white">
      <div className="h-full flex items-center flex-1">
        <p className="font-bold text-lg truncate">Code Converter</p>
      </div>
      <div className="h-full flex items-center justify-end gap-2">
        <div className="hidden gap-2 md:flex">
          <a
            href="https://github.com/rohid-hub/code-converter"
            target="_blank"
            className="h-9 px-4 transition-colors bg-white bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-10 flex items-center justify-center gap-2 rounded-md font-medium"
          >
            <p className="truncate">Star on GitHub</p>
          </a>
          <a
            href="https://www.buymeacoffee.com/rohid"
            target="_blank"
            className="h-9 px-4 transition-colors bg-white bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-10 flex items-center justify-center gap-2 rounded-md font-medium"
          >
            <p className="truncate">Buy me a Coffee</p>
          </a>
          <button className="h-9 w-9 transition-colors bg-white bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-10 flex items-center justify-center rounded-md">
            <SunIcon className="h-5 w-5" />
          </button>
        </div>
        <button className="md:hidden h-9 w-9 transition-colors bg-white bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-10 flex items-center justify-center rounded-md">
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};

export default Header;
