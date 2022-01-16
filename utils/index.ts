import BigNumber from "bignumber.js";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import nftAbi from "./abi/nft.json";
import Moralis from "moralis/node";

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://polygon-mainnet.infura.io/v3/${process.env.infura}`)
);

const serverUrl = process.env.serverUrl;
const appId = process.env.appId;

Moralis.start({ serverUrl, appId });

// Moralis.Web3 = web3

export async function getInfoNFTContract(address: string) {
  const contract = new web3.eth.Contract(nftAbi as AbiItem[], address);

  const totalSupply = await contract.methods.totalSupply().call();
  const symbol = await contract.methods.symbol().call();

  return { totalSupply, symbol };
}

export async function getAttributesContract(address: string) {}

export async function getTokenInfo(address: string, tokenId: string) {
  const options: any = { address: address, token_id: tokenId, chain: "polygon" };
  const NFT = await Moralis.Web3API.token.getTokenIdMetadata(options);

  return NFT;
}

export async function getAllTokenInfo(address: string) {
  const options: any = { address: address, chain: "polygon" };
  const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);

  return NFTs;
}
