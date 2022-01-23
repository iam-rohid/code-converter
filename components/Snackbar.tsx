import { XIcon } from "@heroicons/react/outline";
import React from "react";
import { SnackbarType } from "../types";

const Snackbar = ({
  snackbar,
  onClose,
  className,
}: {
  snackbar: SnackbarType;
  onClose?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`w-[400px] bg-white dark:bg-gray-800 rounded-md flex shadow-lg gap-2 p-2 items-center overflow-hidden ${className}`}
    >
      <div
        className={`w-2 h-full absolute left-0 top-0 bottom-0 ${
          snackbar.type === "success"
            ? "bg-green-500"
            : snackbar.type == "error"
            ? "bg-red-500"
            : snackbar.type === "warning"
            ? "bg-orange-500"
            : "bg-sky-500"
        }`}
      ></div>
      <p className="flex-1 pl-4 px-2">{snackbar.message}</p>
      <button
        className="bg-gray-100 hover:bg-gray-200 active:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-700 text-gray-900 dark:text-white w-8 h-8 rounded-full flex items-center justify-center"
        onClick={() => {
          snackbar.onClose && snackbar.onClose();
          onClose && onClose();
        }}
      >
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Snackbar;
