// Base path for assets. Empty for local dev; set to "/random" by the GitHub
// Pages build (NEXT_PUBLIC_BASE_PATH) so /assets and /_next resolve under the
// project subpath.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE}${path}`;
