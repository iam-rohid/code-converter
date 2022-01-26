import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { InputType, OutputType } from "../types";

const menus: InputType[] = [
  {
    input: "Converters",
    outputs: [
      {
        title: "SVG to JSX",
        href: "/svg-to-jsx",
      },
      {
        title: "HTML to JSX",
        href: "/html-to-jsx",
      },
      {
        title: "JSON to TS",
        href: "/json-to-ts",
      },
    ],
  },
  {
    input: "Formatters",
    outputs: [
      {
        title: "JSON Formatter",
        href: "/json-formatter",
      },
    ],
  },
];

const SideBar = () => {
  return (
    <aside className="w-64 h-full border-r border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
      <SearchBar />
      <MenuList />
      {/* <div className="h-48 border-t border-gray-100 dark:border-gray-800"></div> */}
    </aside>
  );
};

export default SideBar;

const MenuList = () => {
  return (
    <div className="flex-1 flex flex-col p-2 gap-4 overflow-y-auto">
      {menus.map((menu) => (
        <div className="flex flex-col gap-2" key={menu.input}>
          <p className="opacity-50 text-sm uppercase">{menu.input}</p>
          <div className="flex flex-col gap-1">
            {menu.outputs.map((item) => (
              <MenuItem data={item} key={item.title} input={menu.input} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const MenuItem = ({
  data: { title: name, href },
  input,
}: {
  data: OutputType;
  input: string;
}) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`w-full h-8 rounded-md flex items-center justify-start px-4 truncate ${
          router.pathname === href
            ? "bg-primary-500 text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        {name}
      </a>
    </Link>
  );
};

const SearchBar = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="h-14 w-full border-b border-gray-100 dark:border-gray-800 px-2 py-2 relative"
    >
      <input
        type="text"
        placeholder="Search"
        className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-md pr-4 pl-10 outline-none focus:ring-1 ring-gray-200 dark:ring-gray-700"
      />
      <SearchIcon className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 opacity-50" />
    </form>
  );
};
