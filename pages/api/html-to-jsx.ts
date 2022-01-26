import { NextApiRequest, NextApiResponse } from "next";
import httpStatusCode from "../../utils/httpStatusCode";
import HtmlToJsx from "htmltojsx";
import prettify from "../../utils/prettier";
import { HtmlToJsxConfig } from "../../types/configTypes";

const ConvertHtmlToJsx = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const config: HtmlToJsxConfig = req.body.config;

    const converter = new HtmlToJsx({
      createClass: false,
    });

    let jsx = converter.convert(req.body.html);

    if (config.createFunction) {
      jsx = `import * as React from "react";
      ${config.memo ? `import { memo } from "react";` : ``}
      
      const ${config.componentName} = (props) => {
        return (
          ${jsx}
        )
      };

      ${
        config.memo
          ? `
      const Memo = memo(${config.componentName});
export default Memo;
      `
          : `
      export default ${config.componentName};
      `
      }`;
    }

    jsx = prettify(jsx);

    if (!config.createFunction) jsx = jsx.slice(0, jsx.length - 2);
    res.status(httpStatusCode.OK).send({ jsx });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).send({ message: error.message });
  }
};
export default ConvertHtmlToJsx;
