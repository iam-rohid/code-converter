const Switch = ({
  value,
  onChange,
  label,
}: {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label: string;
}) => {
  return (
    <div className="flex gap-1 items-center">
      <p className="uppercase text-xs opacity-50 truncate">{label}</p>
      <button
        onClick={() => {
          onChange(!value);
        }}
        className="w-10 h-6 rounded-full bg-gray-100 dark:bg-gray-800 relative group"
      >
        <div
          className={`w-4 h-4 rou rounded-full absolute top-1 transition-all group-active:w-6 ${
            value
              ? "bg-primary-500 right-1"
              : "left-1 bg-white dark:bg-gray-700"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Switch;
