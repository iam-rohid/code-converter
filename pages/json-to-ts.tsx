import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Coverter from "../components/Coverter";
import pascalcase from "pascalcase";
import IconButton from "../components/IconButton";
import { ClipboardIcon, DownloadIcon } from "@heroicons/react/outline";
import Switch from "../components/Switch";
import { saveAs } from "file-saver";
import { useSnackbar } from "../hooks/useSnackbar";
import { JsonTsOptions } from "json-ts";
import { validate } from "jsonschema";

const defaultHtml = `{
  "glossary": {
      "title": "example glossary",
  "GlossDiv": {
          "title": "S",
    "GlossList": {
              "GlossEntry": {
                  "ID": "SGML",
        "SortAs": "SGML",
        "GlossTerm": "Standard Generalized Markup Language",
        "Acronym": "SGML",
        "Abbrev": "ISO 8879:1986",
        "GlossDef": {
                      "para": "A meta-markup language, used to create markup languages such as DocBook.",
          "GlossSeeAlso": ["GML", "XML"]
                  },
        "GlossSee": "markup"
              }
          }
      }
  }
}
`;

export default () => {
  const [inputValue, setInputValue] = useState(defaultHtml);
  const [outputValue, setOutputValue] = useState("");
  const [rootName, setRootName] = useState("RootObject");
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<JsonTsOptions>({
    rootName: rootName,
  });

  const snackbar = useSnackbar();

  const transform = async (code: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/json-to-ts", {
        json: code,
        config: config,
      });
      let ts = data.ts;
      setOutputValue(ts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputValue === "") {
      setOutputValue("");
      return;
    }

    transform(inputValue);
  }, [inputValue, config]);

  const onComponentNameChagne = (e) => {
    e.preventDefault();

    if (!rootName) {
      setRootName(config.rootName);
      return;
    }
    // Converting string to PascalCase
    const pascalcaseName = pascalcase(rootName);
    setRootName(pascalcaseName);
    setConfig({
      ...config,
      rootName: pascalcaseName,
    });
  };
  const exportFile = () => {
    var blob = new Blob([outputValue], {
      type: "text/plain;charset=utf-8",
    });
    const extention = "ts";
    const fileName = `${config.rootName}.${extention}`;
    saveAs(blob, fileName);
    snackbar.show({
      message: `${fileName} downloaded successfully`,
      type: "success",
    });
  };

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(outputValue);
    snackbar.show({
      message: "Successfully copied to your clipboard",
      type: "success",
    });
  };

  return (
    <Coverter
      inputName="json"
      outputName="ts"
      inputLanguage="javascript"
      outputLanguage="javascript"
      inputValue={inputValue}
      outputValue={outputValue}
      onInputValueChange={setInputValue}
      loading={loading}
      inputActions={
        <Fragment>
          <Switch
            value={config.flow}
            onChange={(value) => {
              setConfig({
                ...config,
                flow: value,
              });
            }}
            label="Flow"
          />
        </Fragment>
      }
      outputActions={
        <Fragment>
          <form onSubmit={onComponentNameChagne}>
            <input
              type="text"
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
              onBlur={onComponentNameChagne}
              placeholder="Component Name"
              className="bg-gray-100 dark:bg-gray-800 px-4 h-9 rounded-md outline-none focus:ring-1 ring-gray-200 dark:ring-gray-700"
            />
          </form>
          <IconButton
            icon={<ClipboardIcon className="h-5 w-5" />}
            title="Copy to clipboard"
            onClick={copyToClipboard}
          />
          <IconButton
            icon={<DownloadIcon className="h-5 w-5" />}
            title="Download File"
            onClick={exportFile}
          />
        </Fragment>
      }
    />
  );
};
