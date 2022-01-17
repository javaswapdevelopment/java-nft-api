import { VercelRequest, VercelResponse } from "@vercel/node";
import { return200, return400, return500 } from "../../../utils/response";
import contracts from "../../../utils/constants/contracts";
import { getTokenInfo } from "../../../utils";
import { getAddress } from "@ethersproject/address";
import { filterByString, getIPFSUrl } from "../../../utils/helper";
import { fetch } from "cross-fetch";

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
    const id = req.query.id;
    let nfts = contracts;

    let scope: any = filterByString(nfts, address)[0];

    const data = await getTokenInfo(scope.address, id as string);

    let metaData = JSON.parse(data.metadata as string);
    if (metaData == null) {
      metaData = await (await fetch(data.token_uri as string)).json();
    }

    let legacy: any = {
      tokenId: data.token_id,
      name: metaData.name,
      description: metaData.description,
      image: {
        original: getIPFSUrl(metaData.image.substr(7)),
        thumbnail: getIPFSUrl(metaData.image.substr(7)),
        mp4: null,
        webm: null,
        gif: null,
      },
      createdAt: data.synced_at,
      updatedAt: data.synced_at,
      attributes: [],
      collection: {
        name: data.name,
      },
    };

    return200(res, { data: legacy });
  } catch (error: any) {
    return500(res, error);
  }
}
