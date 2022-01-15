import { VercelRequest, VercelResponse } from "@vercel/node";
import { return200, return500 } from "../utils/response";
import contracts from "../utils/constants/contracts";
import { getInfoNFTContract } from "../utils";

export default async function (req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    let nfts = contracts;

    for (let i = 0; i < nfts.length; i++) {
      const { totalSupply, symbol } = await getInfoNFTContract(nfts[i].address);
      nfts[i].totalSupply = totalSupply;
      nfts[i].symbol = symbol;
    }

    return200(res, { total: nfts.length, data: nfts });
  } catch (error: any) {
    return500(res, error);
  }
}
