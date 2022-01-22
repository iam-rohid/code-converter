const Coverter = ({
  inputName,
  outputName,
  inputValue,
  onInputValueChange,
  outputValue,
}: {
  inputName: string;
  outputName: string;
  inputValue: string;
  onInputValueChange: (value: string) => void;
  outputValue: string;
}) => {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 flex flex-col border-r border-gray-100 dark:border-gray-800">
        <div className="h-14 w-full border-b border-gray-100 dark:border-gray-800 flex gap-2 items-center px-4">
          <h2 className="font-bold">{inputName}</h2>
          <p className="text opacity-20">Input</p>
        </div>
        <div className="flex-1">
          <textarea
            className="w-full h-full bg-transparent outline-none resize-none border-none"
            value={inputValue}
            onChange={(e) => onInputValueChange(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-14 w-full border-b border-gray-100 dark:border-gray-800 flex gap-2 items-center px-4">
          <h2 className="font-bold">{outputName}</h2>
          <p className="text opacity-20">Output</p>
        </div>
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
