import {
  SET_PLATFORMS,
  REQUEST_PLATFORMS,
  REQUEST_PLATFORMS_FINISHED,
  SET_ACTIVE_PLATFORM
} from "../../actions/types";
import platformsReducer from "../platforms";

describe("Tests platforms reducer", () => {
  let initialState;
  const platforms = [
    {
      platform_id: "aws",
      name: "Amazon Web Services",
      img: "https://console.aiven.io/178c42cbb2c415976529db5c05b18304.png",
      regions: [
        "africa",
        "south asia",
        "east asia",
        "southeast asia",
        "australia",
        "north america",
        "europe",
        "south america"
      ]
    },
    {
      platform_id: "azure",
      name: "Azure",
      img: "https://console.aiven.io/44dc479a1802bcb6996ab03a40b15923.png",
      regions: [
        "africa",
        "southeast asia",
        "south asia",
        "east asia",
        "australia",
        "north america",
        "europe",
        "south america"
      ]
    },
    {
      platform_id: "google",
      name: "Google Cloud",
      img: "https://console.aiven.io/9789c734722bef53b119852d91132a79.png",
      regions: [
        "east asia",
        "southeast asia",
        "australia",
        "north america",
        "europe",
        "south america"
      ]
    },
    {
      platform_id: "do",
      name: "DigitalOcean",
      img: "https://console.aiven.io/0b0c79059b641ca7867be39863a97de1.png",
      regions: ["south asia", "southeast asia", "north america", "europe"]
    },
    {
      platform_id: "upcloud",
      name: "UpCloud",
      img: "https://console.aiven.io/f00b8cd058bf543584144ec9205eb51a.png",
      regions: ["southeast asia", "europe", "north america"]
    }
  ];
  beforeEach(() => {
    initialState = {
      platforms: [],
      isFetching: false,
      activePlatform: ""
    };
  });

  it("tests SET_PLATFORMS action", () => {
    const state = platformsReducer(initialState, {
      type: SET_PLATFORMS,
      payload: platforms
    });
    expect(state).toStrictEqual({ ...initialState, platforms });
  });

  it("test SET_ACTIVE_PLATFORM action", () => {
    const activePlatform = "aws";
    const state = platformsReducer(initialState, {
      type: SET_ACTIVE_PLATFORM,
      payload: activePlatform
    });
    expect(state).toStrictEqual({ ...initialState, activePlatform });
  });

  it("test REQUEST_PLATFORMS action", () => {
    const state = platformsReducer(initialState, {
      type: REQUEST_PLATFORMS
    });
    expect(state).toStrictEqual({ ...initialState, isFetching: true });
  });

  it("test REQUEST_PLATFORMS action", () => {
    const state = platformsReducer(initialState, {
      type: REQUEST_PLATFORMS_FINISHED
    });
    expect(state).toStrictEqual({ ...initialState, isFetching: false });
  });
});
