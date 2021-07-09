export default async function Fetcher(
  input: RequestInfo,
  init?: RequestInit | undefined
) {
  const res = await fetch(input, init);

  return res.json();
}
