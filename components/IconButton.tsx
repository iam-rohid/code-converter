import { ReactNode } from "react";

const IconButton = ({
  icon,
  title,
  onClick,
  className,
}: {
  icon: JSX.Element;
  title?: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`bg-gray-100 hover:bg-gray-200 active:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-800 h-9 w-9 transition-colors flex items-center justify-center rounded-md ${className}`}
      title={title}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
