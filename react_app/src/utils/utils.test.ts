import { objToQuery, getDistance } from "./index";

describe("Test util functions", () => {
  it("Should create query parameters from object", () => {
    const params = "?arg1=2&arg2=tst";
    const paramObj = {
      arg1: 2,
      arg2: "tst"
    };
    expect(objToQuery(paramObj)).toBe(params);
  });

  it("Should return the distance between two coordinates", () => {
    const coord1 = {
      latitude: -23,
      longitude: -45
    };
    const coord2 = {
      latitude: 10,
      longitude: 1
    };

    //per https://www.nhc.noaa.gov/gccalc.shtml and
    //https://www.movable-type.co.uk/scripts/latlong.html
    const roundedDistance = 6206;

    const calculatedDistance = Math.round(getDistance(coord1, coord2));
    expect(calculatedDistance).toBe(roundedDistance);
  });
});
