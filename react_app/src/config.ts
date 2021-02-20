const port: number = 5000;
const base: string =
  process.env.NODE_ENV === "development"
    ? "http://localhost"
    : window.location.hostname;

const baseUrl: string =
  process.env.NODE_ENV === "development" ? `${base}:${port}/api/` : "/api/";

const config = {
  baseUrl,
  API: {
    clouds: `${baseUrl}clouds`,
    cosestCloud: `${baseUrl}clouds/closest`,
    platforms: `${baseUrl}platforms`,
    regions: `${baseUrl}regions`
  }
};

export default config;
