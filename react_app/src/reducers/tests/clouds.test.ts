import {
  SET_CLOUDS,
  REQUEST_CLOUDS,
  REQUEST_CLOUDS_FINISHED,
  SET_ACTIVE_CLOUD
} from "../../actions/types";
import cloudsReducer from "../clouds";

describe("Tests clouds reducer", () => {
  let initialState;
  const clouds = [
    {
      cloud_description: "Asia, Bahrain - Amazon Web Services: Bahrain",
      cloud_name: "aws-me-south-1",
      location: {
        latitude: 26.07,
        longitude: 50.55,
        region: "south asia"
      }
    },
    {
      cloud_description: "Asia, India - Amazon Web Services: Mumbai",
      cloud_name: "aws-ap-south-1",
      location: {
        latitude: 19.13,
        longitude: 72.89,
        region: "south asia"
      }
    }
  ];
  beforeEach(() => {
    initialState = {
      clouds: [],
      isFetching: false,
      activeCloud: ""
    };
  });

  it("tests SET_CLOUDS action", () => {
    const state = cloudsReducer(initialState, {
      type: SET_CLOUDS,
      payload: clouds
    });
    expect(state).toStrictEqual({ ...initialState, clouds });
  });

  it("test SET_ACTIVE_CLOUD action", () => {
    const activeCloud = "aws-ap-south-1";
    const state = cloudsReducer(initialState, {
      type: SET_ACTIVE_CLOUD,
      payload: activeCloud
    });
    expect(state).toStrictEqual({ ...initialState, activeCloud });
  });

  it("test REQUEST_CLOUDS action", () => {
    const state = cloudsReducer(initialState, {
      type: REQUEST_CLOUDS
    });
    expect(state).toStrictEqual({ ...initialState, isFetching: true });
  });

  it("test REQUEST_CLOUDS action", () => {
    const state = cloudsReducer(initialState, {
      type: REQUEST_CLOUDS_FINISHED
    });
    expect(state).toStrictEqual({ ...initialState, isFetching: false });
  });
});
