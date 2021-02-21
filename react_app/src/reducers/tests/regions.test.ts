import {
  SET_REGIONS,
  REQUEST_REGIONS,
  REQUEST_REGIONS_FINISHED,
  SET_ACTIVE_REGION
} from "../../actions/types";
import regionsReducer from "../regions";

describe("Tests regions reducer", () => {
  let initialState;
  const regions = [
    {
      region: "africa",
      platforms: ["aws", "azure"]
    },
    {
      region: "south asia",
      platforms: ["aws", "azure", "do"]
    },
    {
      region: "east asia",
      platforms: ["aws", "google", "azure"]
    },
    {
      region: "southeast asia",
      platforms: ["azure", "google", "aws", "do", "upcloud"]
    },
    {
      region: "australia",
      platforms: ["aws", "azure", "google"]
    },
    {
      region: "north america",
      platforms: ["azure", "do", "aws", "google", "upcloud"]
    },
    {
      region: "europe",
      platforms: ["google", "aws", "azure", "do", "upcloud"]
    },
    {
      region: "south america",
      platforms: ["aws", "azure", "google"]
    }
  ];
  beforeEach(() => {
    initialState = {
      regions: [],
      isFetching: false,
      activeRegion: ""
    };
  });

  it("tests SET_REGIONS action", () => {
    const state = regionsReducer(initialState, {
      type: SET_REGIONS,
      payload: regions
    });
    expect(state).toStrictEqual({ ...initialState, regions });
  });

  it("test SET_ACTIVE_REGION action", () => {
    const activeRegion = "africa";
    const state = regionsReducer(initialState, {
      type: SET_ACTIVE_REGION,
      payload: activeRegion
    });
    expect(state).toStrictEqual({ ...initialState, activeRegion });
  });

  it("test REQUEST_REGIONS action", () => {
    const state = regionsReducer(initialState, {
      type: REQUEST_REGIONS
    });
    expect(state).toStrictEqual({ ...initialState, isFetching: true });
  });

  it("test REQUEST_REGIONS action", () => {
    const state = regionsReducer(initialState, {
      type: REQUEST_REGIONS_FINISHED
    });
    expect(state).toStrictEqual({ ...initialState, isFetching: false });
  });
});
