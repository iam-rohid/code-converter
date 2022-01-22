import { useEffect, useState } from "react";
import Coverter from "../Coverter";
import transform from "@balajmarius/svg2jsx/index";
import isSvg from "is-svg";

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
