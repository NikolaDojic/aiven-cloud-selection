export const objToQuery: (obj: any) => string = obj => {
  if (!obj) return "";
  const keys = Object.keys(obj);
  if (!keys.length) return "";
  return (
    "?" + keys.map(key => (obj[key] ? `${key}=${obj[key]}` : "")).join("&")
  );
};
