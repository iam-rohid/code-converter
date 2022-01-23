import { ClipboardIcon, DownloadIcon } from "@heroicons/react/outline";
import { Config, State } from "@svgr/core";
import axios from "axios";
import isSvg from "is-svg";
import { Fragment, useEffect, useState } from "react";
import Coverter from "../components/Coverter";
import IconButton from "../components/IconButton";
import Switch from "../components/Switch";
import { pascalcase } from "pascalcase";

const defaultSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="48px" height="1px" viewBox="0 0 48 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
    <title>Rectangle 5</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="19-Separator" transform="translate(-129.000000, -156.000000)" fill="#063855">
            <g id="Controls/Settings" transform="translate(80.000000, 0.000000)">
                <g id="Content" transform="translate(0.000000, 64.000000)">
                    <g id="Group" transform="translate(24.000000, 56.000000)">
                        <g id="Group-2">
                            <rect id="Rectangle-5" x="25" y="36" width="48" height="1"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>`;

export default () => {
  const [inputValue, setInputValue] = useState(defaultSvg);
  const [outputValue, setOutputValue] = useState("");
  const [componentName, setComponentName] = useState("MyComponent");
  const [config, setConfig] = useState<Config>({
    plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
  });

  const [statePartial, setStatePartial] = useState<Partial<State>>({
    componentName: componentName,
  });

  const transform = async (svg: string) => {
    try {
      const { data } = await axios.post("/api/svgr", {
        svg: inputValue,
        config: config,
        state: statePartial,
      });
      setOutputValue(data.jsx);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (inputValue == "") {
      setOutputValue("");
      return;
    }

    if (!isSvg(inputValue)) {
      setOutputValue("This is not a valid svg code!");
    } else {
      transform(inputValue);
    }
  }, [inputValue, config, statePartial]);

  const onComponentNameChagne = (e) => {
    e.preventDefault();

    if (!componentName) {
      setComponentName(statePartial.componentName);
      return;
    }
    // Converting string to PascalCase
    const pascalcaseName = pascalcase(componentName);
    setComponentName(pascalcaseName);
    setStatePartial({
      ...statePartial,
      componentName: pascalcaseName,
    });
  };

  return (
    <Coverter
      inputName="svg"
      outputName="jsx"
      inputLanguage="xml"
      outputLanguage="jsx"
      inputValue={inputValue}
      outputValue={outputValue}
      onInputValueChange={setInputValue}
      inputActions={
        <Fragment>
          <Switch
            label="React Native"
            value={config.native === true}
            onChange={(value) => {
              setConfig({
                ...config,
                native: value,
              });
            }}
          />
          <Switch
            label="Title"
            value={config.titleProp === true}
            onChange={(value) => {
              setConfig({
                ...config,
                titleProp: value,
              });
            }}
          />
          <Switch
            label="Memo"
            value={config.memo === true}
            onChange={(value) => {
              setConfig({
                ...config,
                memo: value,
              });
            }}
          />
          <Switch
            label="TypeScript"
            value={config.typescript === true}
            onChange={(value) => {
              setConfig({
                ...config,
                typescript: value,
              });
            }}
          />
          <Switch
            label="Icon"
            value={config.icon === true}
            onChange={(value) => {
              setConfig({
                ...config,
                icon: value,
              });
            }}
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
