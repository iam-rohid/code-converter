import React, { ReactNode } from "react";
import { Rings } from "react-loader-spinner";
import { useTheme } from "../hooks/useTheme";
import CodeEditor from "./CodeEditor";

const Coverter = ({
  inputName,
  outputName,
  inputValue,
  onInputValueChange,
  outputValue,
  inputActions,
  outputActions,
  inputLanguage,
  outputLanguage,
  loading,
}: {
  inputName: string;
  outputName: string;
  inputValue: string;
  onInputValueChange: (value: string) => void;
  outputValue: string;
  inputActions?: ReactNode;
  outputActions?: ReactNode;
  inputLanguage: string;
  outputLanguage: string;
  loading?: boolean;
}) => {
  const { isDark } = useTheme();
  return (
    <div className="flex-1 flex w-full h-full overflow-hidden relative">
      <div className="w-1/2 h-full left-0 flex flex-col absolute border-r border-gray-100 dark:border-gray-800">
        <Header title={inputName} actions={inputActions} />
        <CodeEditor
          value={inputValue}
          onChange={onInputValueChange}
          options={{
            mode: inputLanguage,
          }}
        />
      </div>
      <div className="w-1/2 h-full left-1/2 flex flex-col absolute">
        <Header
          title={outputName}
          subTitle="Read only"
          actions={outputActions}
        />
        <CodeEditor
          value={outputValue}
          disabled
          options={{
            mode: outputLanguage,
          }}
        />
        {loading && (
          <div className="absolute w-full h-full left-0 top-0 z-10 flex items-center justify-center">
            <div className="scale-75">
              <div className="spinner"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coverter;

const Header = ({
  title,
  subTitle,
  actions,
}: {
  actions: ReactNode;
  title: string;
  subTitle?: string;
}) => {
  return (
    <div className="h-14 w-full border-b border-gray-100 dark:border-gray-800 flex gap-2 items-center overflow-hidden justify-between">
      <div className="flex items-center gap-2 pl-4 pr-2">
        <h2 className="font-bold uppercase">{title}</h2>
        {subTitle && <p className="text opacity-30">{subTitle}</p>}
      </div>
      <div className="h-full flex items-center px-4 gap-2 overflow-x-auto">
        {actions}
      </div>
    </div>
  );
};
