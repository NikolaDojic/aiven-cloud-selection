import { testStore } from "../../../test_utils";
import config from "../../config";
import fetchMock from "fetch-mock-jest";
import { fetchClouds, findClosestCloud } from "../clouds";

export const fetchCloudsResponse = {
  clouds: [
    {
      cloud_description: "Asia, Hong Kong - Amazon Web Services: Hong Kong",
      cloud_name: "aws-ap-east-1",
      location: {
        latitude: 22.5,
        longitude: 114.0,
        region: "east asia"
      }
    },
    {
      cloud_description: "Asia, Japan - Amazon Web Services: Tokyo",
      cloud_name: "aws-ap-northeast-1",
      location: {
        latitude: 35.68,
        longitude: 139.68,
        region: "east asia"
      }
    },
    {
      cloud_description: "Asia, Korea - Amazon Web Services: Seoul",
      cloud_name: "aws-ap-northeast-2",
      location: {
        latitude: 37.57,
        longitude: 126.97,
        region: "east asia"
      }
    }
  ]
};
const fetchClosestCloudResponse = {
  cloud_description: "Asia, Korea - Amazon Web Services: Seoul",
  cloud_name: "aws-ap-northeast-2",
  location: {
    latitude: 37.57,
    longitude: 126.97,
    region: "east asia"
  }
};

describe("Test fetch clouds action", () => {
  let store;
  beforeEach(() => {
    store = testStore();
    fetchMock.reset();
  });

  it("tests fetchClouds function", async () => {
    fetchMock.mock(config.API.clouds, fetchCloudsResponse);
    await store.dispatch(fetchClouds());
    const newState = store.getState();
    await expect(newState.clouds.clouds).toStrictEqual(
      fetchCloudsResponse.clouds
    );
  });

  it("tests findClosestCloud function", async () => {
    fetchMock.mock(config.API.closestCloud, fetchClosestCloudResponse);
    await store.dispatch(findClosestCloud());
    const newState = store.getState();
    await expect(newState.platforms.activePlatform).toBe(
      fetchClosestCloudResponse.cloud_name.split("-")[0]
    );
    await expect(newState.clouds.activeCloud).toBe(
      fetchClosestCloudResponse.cloud_name
    );
    await expect(newState.regions.activeRegion).toBe(
      fetchClosestCloudResponse.location.region
    );
  });
});
