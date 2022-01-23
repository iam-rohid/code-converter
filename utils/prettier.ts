import prettier, { Options } from "prettier";
const prettify = (code: string, options?: Options) => {
  let newCode = prettier.format(code, {
    ...options,
  });
  return newCode;
};

export default prettify;
