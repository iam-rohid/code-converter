import { EditorConfiguration } from "codemirror";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const CodeEditor = ({
  value,
  onChange,
  disabled,
  options,
}: {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  options?: EditorConfiguration;
}) => {
  const [moduleLoaded, setModuleLoaded] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const load = async () => {
      switch (options.mode) {
        case "jsx":
          await require("codemirror/mode/jsx/jsx");
          break;
        case "xml":
          await require("codemirror/mode/xml/xml");
          break;
        case "javascript":
          await require("codemirror/mode/javascript/javascript");
          break;
        case "markdown":
          await require("codemirror/mode/markdown/markdown");
          break;
        default:
          await require("codemirror/mode/javascript/javascript");
          break;
      }
      setModuleLoaded(true);
    };

    if (typeof window !== "undefined") {
      setModuleLoaded(false);
      load();
      console.log("Loading module");
    }
  }, [typeof window]);

  if (!moduleLoaded) return null;

  return (
    <CodeMirror
      value={value}
      options={{
        mode: "jsx",
        theme: isDark ? "material" : "xq-light",
        lineNumbers: true,
        ...options,
      }}
      className="w-full h-full flex-1 text-base overflow-hidden"
      onBeforeChange={(editor, data, value) => {
        if (disabled) return;
        onChange && onChange(value);
      }}
      onChange={(editor, data, value) => {}}
    />
  );
};
export default CodeEditor;
