import { testStore } from "../../../test_utils";
import config from "../../config";
import fetchMock from "fetch-mock-jest";
import { fetchPlatforms, findClosestPlatform } from "../platforms";
import { fetchCloudsResponse } from "./clouds.test";

const fetchPlatformsResponse = {
  platforms: [
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
  ]
};

describe("Test fetch platforms action", () => {
  let store;
  beforeEach(() => {
    store = testStore();
    fetchMock.reset();
  });

  it("tests fetchPlatforms function", async () => {
    fetchMock.mock(config.API.platforms, fetchPlatformsResponse);
    fetchMock.mock(
      `${config.API.clouds}?platform=aws&region=africa`,
      fetchCloudsResponse
    );
    await store.dispatch(fetchPlatforms());
    const newState = store.getState();
    await expect(newState.platforms.platforms).toStrictEqual(
      fetchPlatformsResponse.platforms
    );
  });
});
