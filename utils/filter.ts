export function filterByString(data: any, s: string) {
  return data
    .filter((e: any) => e.address.includes(s))
    .sort((a: any, b: any) => (a.address.includes(s) ? 1 : 0));
}
