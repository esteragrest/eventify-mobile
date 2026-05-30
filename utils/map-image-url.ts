const LOCALHOST = "http://localhost:3000";
const MOBILE_BASE = "http://192.168.0.101:3000";

export const mapImageUrl = (url?: string) => {
  if (!url) return url;
  return url.replace(LOCALHOST, MOBILE_BASE);
};
