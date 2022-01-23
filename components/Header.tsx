import { MenuIcon, StarIcon, SunIcon } from "@heroicons/react/outline";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
const Header = () => {
  return (
    <nav className="w-full h-14 border-b border-gray-100 dark:border-gray-800 px-4 gap-4 flex overflow-hidden">
      <div className="h-full flex items-center flex-1">
        <p className="font-bold text-lg truncate">Code Converter</p>
      </div>
      <div className="h-full flex items-center justify-end gap-2">
        <div className="hidden gap-2 md:flex">
          <TextButton
            as="a"
            href="https://github.com/rohid-hub/code-converter"
            target="_blank"
            name="Star on GitHub"
          />
          <TextButton
            as="a"
            href="https://www.buymeacoffee.com/rohid"
            target="_blank"
            name="Buy me a Coffee"
          />
          <IconButton icon={<SunIcon className="h-5 w-5" />} />
        </div>
        <IconButton
          icon={<MenuIcon className="h-5 w-5" />}
          className="md:hidden"
        />
      </div>
    </nav>
  );
};

export default Header;