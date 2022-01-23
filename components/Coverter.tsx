import { ReactNode } from "react";

const Coverter = ({
  inputName,
  outputName,
  inputValue,
  onInputValueChange,
  outputValue,
  inputActions,
  outputActions,
}: {
  inputName: string;
  outputName: string;
  inputValue: string;
  onInputValueChange: (value: string) => void;
  outputValue: string;
  inputActions?: ReactNode;
  outputActions?: ReactNode;
}) => {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 flex flex-col border-r border-gray-100 dark:border-gray-800 overflow-hidden">
        <Header title={inputName} subTitle="Input" actions={inputActions} />
        <div className="flex-1">
          <textarea
            className="w-full h-full bg-transparent outline-none resize-none border-none"
            value={inputValue}
            onChange={(e) => onInputValueChange(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <Header title={outputName} subTitle="Output" actions={outputActions} />
        <div className="flex-1">
          <textarea
            className="w-full h-full bg-transparent outline-none resize-none border-none"
            value={outputValue}
            disabled
          ></textarea>
        </div>
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
  subTitle: string;
}) => {
  return (
    <div className="h-14 w-full border-b border-gray-100 dark:border-gray-800 flex gap-2 items-center overflow-hidden justify-between">
      <div className="flex items-center gap-2 pl-4 pr-2">
        <h2 className="font-bold">{title}</h2>
        <p className="text opacity-20">{subTitle}</p>
      </div>
      <div className="h-full flex items-center px-4 gap-2 overflow-x-auto">
        {actions}
      </div>
    </div>
  );
};
