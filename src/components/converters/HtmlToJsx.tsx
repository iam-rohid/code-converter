import { useState } from "react";
import Coverter from "../Coverter";

const HtmlToJsx = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  return <Coverter inputName="HTML" outputName="JSX"
  
  
  inputValue={inputValue}
  outputValue={outputValue}
  onInputValueChange={setInputValue}/>;
};

export default HtmlToJsx;
