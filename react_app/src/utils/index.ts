import { ILocation } from "../interfaces";
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

//credits Tijs Martens https://stackoverflow.com/a/65799152/7562654
export const getDistance: (a: ILocation, b: ILocation) => number = (
  cord1,
  cord2
) => {
  if (cord1.latitude == cord2.latitude && cord1.longitude == cord2.longitude) {
    return 0;
  }

  const radlat1 = (Math.PI * cord1.latitude) / 180;
  const radlat2 = (Math.PI * cord2.latitude) / 180;

  const theta = cord1.longitude - cord2.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km

  return dist;
};
