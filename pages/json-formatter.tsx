import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Coverter from "../components/Coverter";
import pascalcase from "pascalcase";
import IconButton from "../components/IconButton";
import { ClipboardIcon, DownloadIcon } from "@heroicons/react/outline";
import { saveAs } from "file-saver";
import { useSnackbar } from "../hooks/useSnackbar";
import prettify from "../utils/prettier";

const defaultJs = `[{"id":1,"first_name":"Celka","last_name":"Graal","email":"cgraal0@delicious.com","gender":"Female","ip_address":"145.251.107.245"},{"id":2,"first_name":"Sande","last_name":"Iacomettii","email":"siacomettii1@gmpg.org","gender":"Male","ip_address":"219.110.69.181"},{"id":3,"first_name":"Elvina","last_name":"Sworder","email":"esworder2@adobe.com","gender":"Male","ip_address":"250.156.230.133"},{"id":4,"first_name":"Kristen","last_name":"Frean","email":"kfrean3@scribd.com","gender":"Female","ip_address":"37.0.133.80"},{"id":5,"first_name":"Gabriele","last_name":"Lie","email":"glie4@tuttocitta.it","gender":"Male","ip_address":"233.9.139.18"},{"id":6,"first_name":"Libby","last_name":"MacCheyne","email":"lmaccheyne5@netscape.com","gender":"Female","ip_address":"128.245.66.81"},{"id":7,"first_name":"Felice","last_name":"Ravens","email":"fravens6@4shared.com","gender":"Male","ip_address":"219.15.201.240"},{"id":8,"first_name":"Diandra","last_name":"Hewell","email":"dhewell7@cpanel.net","gender":"Male","ip_address":"233.80.111.176"},{"id":9,"first_name":"Aubree","last_name":"O'Doghesty","email":"aodoghesty8@reference.com","gender":"Female","ip_address":"226.88.161.75"},{"id":10,"first_name":"Sergeant","last_name":"Hovington","email":"shovington9@webs.com","gender":"Male","ip_address":"190.74.24.47"}]
`;

const JsonFormatterPage = () => {
  const [inputValue, setInputValue] = useState(defaultJs);
  const [outputValue, setOutputValue] = useState("");
  const [fileName, setFileName] = useState("Untitled");
  const [loading, setLoading] = useState(false);

  const snackbar = useSnackbar();

  const transform = async (code: string) => {
    setLoading(true);
    try {
      let { data } = await axios.post("/api/json-formatter", {
        json: code,
      });
      setOutputValue(data.json);
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
  }, [inputValue]);

  const onComponentNameChagne = (e) => {
    e.preventDefault();

    if (!fileName) {
      setFileName("Untitled");
      return;
    }
    // Converting string to PascalCase
    const pascalcaseName = pascalcase(fileName);
    setFileName(pascalcaseName);
  };
  const exportFile = () => {
    var blob = new Blob([outputValue], {
      type: "text/plain;charset=utf-8",
    });
    const extention = "json";
    const _fileName = `${fileName}.${extention}`;
    saveAs(blob, _fileName);
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
      outputName="formatted json"
      inputLanguage="javascript"
      outputLanguage="javascript"
      inputValue={inputValue}
      outputValue={outputValue}
      onInputValueChange={setInputValue}
      loading={loading}
      inputActions={<Fragment></Fragment>}
      outputActions={
        <Fragment>
          <form onSubmit={onComponentNameChagne}>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
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

export default JsonFormatterPage;
