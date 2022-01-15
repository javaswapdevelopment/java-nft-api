import { VercelRequest, VercelResponse } from "@vercel/node";
import { return200, return400, return500 } from "../../utils/response";
import contracts from "../../utils/constants/contracts";
import { getAllTokenInfo, getInfoNFTContract, getTokenInfo } from "../../utils";
import { getAddress } from "@ethersproject/address";
import { filterByString } from "../../utils/filter";

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
    const address = getAddress(req.query.address);
    let nfts = contracts;

    let scope: any = filterByString(nfts, address)[0];
    scope.attributes = [];

    const { totalSupply, symbol } = await getInfoNFTContract(scope.address);
    scope.totalSupply = totalSupply;
    scope.symbol = symbol;

    let data: any = null;
    data = await getAllTokenInfo(address);

    return200(res, { total: data.length, data: data });
  } catch (error: any) {
    return500(res, error);
  }
}
