import { CogIcon, MenuIcon, MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useSnackbar } from "../hooks/useSnackbar";
import { useTheme } from "../hooks/useTheme";
import IconButton from "./IconButton";
import TextButton from "./TextButton";
const Header = () => {
  const { isDark, setIsDark } = useTheme();
  const snackbar = useSnackbar();
  return (
    <nav className="w-full h-14 border-b border-gray-100 dark:border-gray-800 px-4 gap-4 flex overflow-hidden">
      <div className="h-full flex items-center flex-1 gap-2">
        <h1 className="font-bold text-lg truncate">Code Converter</h1>
        <span className="opacity-50 text-sm font-normal">v0.1.4</span>
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
          <IconButton
            icon={
              isDark ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )
            }
            onClick={() => {
              setIsDark(!isDark);
              snackbar.show({
                message: `Dark mode truned ${isDark ? "off" : "on"}`,
                type: "success",
              });
            }}
            title="Toggle Dark Mode"
          />
          <IconButton
            icon={<CogIcon className="h-5 w-5" />}
            onClick={() => {}}
            title="Settings"
          />
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
