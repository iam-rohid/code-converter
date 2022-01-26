import { NextApiRequest, NextApiResponse } from "next";
import httpStatusCode from "../../utils/httpStatusCode";
import prettify from "../../utils/prettier";

const FormatJson = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    let json = prettify(req.body.json, { parser: "json" });
    res.status(httpStatusCode.OK).send({ json });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).send({ message: error.message });
  }
};
export default FormatJson;
