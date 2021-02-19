declare global {
  interface String {
    capitalize(): string;
    titleCase(): string;
  }
}

//eslint-disable-next-line
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.titleCase = function() {
  return this.split(" ")
    .map(word => word.capitalize())
    .join(" ");
};

export const objToQuery: (obj: any) => string = obj => {
  if (!obj) return "";
  const keys = Object.keys(obj);
  if (!keys.length) return "";
  return (
    "?" + keys.map(key => (obj[key] ? `${key}=${obj[key]}` : "")).join("&")
  );
};
