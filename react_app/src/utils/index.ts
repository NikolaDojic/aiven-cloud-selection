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
    "?" +
    keys
      .map(key => (obj[key] || obj[key] == 0 ? `${key}=${obj[key]}` : ""))
      .join("&")
  );
};

// credits user1921 https://stackoverflow.com/a/27943/7562654
export const getDistance: (a: ILocation, b: ILocation) => number = (
  coord1,
  coord2
) => {
  var R = 6371e3 / 1000; // Radius of the earth in km
  var dLat = deg2rad(coord2.latitude - coord1.latitude); // deg2rad below
  var dLon = deg2rad(coord2.longitude - coord1.longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
