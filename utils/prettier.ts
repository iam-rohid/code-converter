import prettier, { Options } from "prettier";
const prettify = (code: string, options?: Options) => {
  let newCode = prettier.format(code, {
    parser: "babel",
    ...options,
  });
  return newCode;
};

export default prettify;
