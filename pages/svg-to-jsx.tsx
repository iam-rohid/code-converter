import isSvg from "is-svg";
import { useEffect, useState } from "react";
import Coverter from "../components/Coverter";

const SvgToJsx = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  useEffect(() => {
    if (inputValue == "") {
      setOutputValue("");
      return;
    }

    if (!isSvg(inputValue)) {
      setOutputValue("This is not a valid svg code!");
    } else {
      setOutputValue(inputValue);
    }
  }, [inputValue]);

  return (
    <Coverter
      inputName="SVG"
      outputName="JSX"
      inputValue={inputValue}
      outputValue={outputValue}
      onInputValueChange={setInputValue}
    />
  );
};

export default SvgToJsx;
