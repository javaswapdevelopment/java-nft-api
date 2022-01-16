import { VercelRequest, VercelResponse } from "@vercel/node";
import { return200, return400, return500 } from "../../utils/response";

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  if (
    !req.query.address ||
    typeof req.query.address !== "string" ||
    !req.query.address.match(/^0x[0-9a-fA-F]{40}$/)
  ) {
    return400(res, "Invalid address");
    return;
  }

  try {
    return200(res, { total: 0, data: {} });
  } catch (error: any) {
    return500(res, error);
  }
}
