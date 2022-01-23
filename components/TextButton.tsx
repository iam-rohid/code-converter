import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

type LinkType = {
  as: "a";
  name: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  className?: string;
};

type ButtonType = {
  as: "button";
  name: string;
  onClick?: () => void;
  className: string;
};
const TextButton = (props: LinkType | ButtonType) => {
  const getClassName = () =>
    `bg-gray-100 hover:bg-gray-200 active:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-800 h-9 px-4 rounded-md flex items-center justify-center font-medium truncate ${props.className}`;

  if (props.as === "button") {
    return (
      <button onClick={props.onClick} className={getClassName()}>
        {props.name}
      </button>
    );
  }
  return (
    <Link href={props.href} passHref>
      <a target={props.target} className={getClassName()}>
        {props.name}
      </a>
    </Link>
  );
};

export default TextButton;
