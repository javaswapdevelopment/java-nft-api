export function filterByString(data: any, s: string) {
  return data
    .filter((e: any) => e.address.includes(s))
    .sort((a: any, b: any) => (a.address.includes(s) ? 1 : 0));
}

export function getIPFSUrl(ipfsHash: string) {
  return `https://ipfs.moralis.io:2053/ipfs/${ipfsHash}`;
}
