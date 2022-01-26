import { json2ts } from "json-ts";
import { NextApiRequest, NextApiResponse } from "next";
import httpStatusCode from "../../utils/httpStatusCode";
import prettify from "../../utils/prettier";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    let ts = "";
    ts = await json2ts(req.body.json, {
      ...req.body.config,
    });
    ts = prettify(ts);
    res.status(httpStatusCode.OK).send({ ts });
  } catch (error) {
    res.status(httpStatusCode.BAD_REQUEST).send({ message: error.message });
  }
}
