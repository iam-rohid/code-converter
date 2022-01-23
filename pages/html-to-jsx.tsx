import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Coverter from "../components/Coverter";
import pascalcase from "pascalcase";
import IconButton from "../components/IconButton";
import { ClipboardIcon, DownloadIcon } from "@heroicons/react/outline";
import Switch from "../components/Switch";
import { HtmlToJsxConfig } from "../types/configTypes";

const defaultHtml = `<!DOCTYPE html>
<html>
  <body>
    <!-- An awesome comment -->
    <h1 class="title">My Title</h1>
    <p class="paragraph">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam veniam
      non atque. Suscipit aperiam facilis illum quasi sit quas error hic laborum
      tempore vitae, quis ipsam amet nulla similique corporis.
    </p>
  </body>
</html>
`;

export default () => {
  const [inputValue, setInputValue] = useState(defaultHtml);
  const [outputValue, setOutputValue] = useState("");
  const [componentName, setComponentName] = useState("MyCompoennt");
  const [config, setConfig] = useState<HtmlToJsxConfig>({
    createFunction: true,
    componentName: componentName,
  });

  const transform = async (code: string) => {
    try {
      const { data } = await axios.post("/api/html-to-jsx", {
        html: code,
        config: config,
      });
      let jsx = data.jsx;
      setOutputValue(jsx);
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

    if (!componentName) {
      setComponentName(config.componentName);
      return;
    }
    // Converting string to PascalCase
    const pascalcaseName = pascalcase(componentName);
    setComponentName(pascalcaseName);
    setConfig({
      ...config,
      componentName: pascalcaseName,
    });
  };

  return (
    <Coverter
      inputName="html"
      outputName="jsx"
      inputLanguage="xml"
      outputLanguage="jsx"
      inputValue={inputValue}
      outputValue={outputValue}
      onInputValueChange={setInputValue}
      inputActions={
        <Fragment>
          {config.createFunction && (
            <Switch
              value={config.memo}
              onChange={(value) => {
                setConfig({
                  ...config,
                  memo: value,
                });
              }}
              label="Memo"
            />
          )}
          <Switch
            value={config.createFunction}
            onChange={(value) => {
              setConfig({
                ...config,
                createFunction: value,
              });
            }}
            label="Create Function"
          />
        </Fragment>
      }
      outputActions={
        <Fragment>
          <form onSubmit={onComponentNameChagne}>
            <input
              type="text"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              onBlur={onComponentNameChagne}
              placeholder="Component Name"
              className="bg-gray-100 dark:bg-gray-800 px-4 h-9 rounded-md outline-none focus:ring-1 ring-gray-200 dark:ring-gray-700"
            />
          </form>
          <IconButton
            icon={<ClipboardIcon className="h-5 w-5" />}
            title="Copy to clipboard"
          />
          <IconButton
            icon={<DownloadIcon className="h-5 w-5" />}
            title="Download File"
          />
        </Fragment>
      }
    />
  );
};
