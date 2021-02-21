import { testStore } from "../../../test_utils";
import config from "../../config";
import fetchMock from "fetch-mock-jest";
import { fetchRegions } from "../regions";
import { fetchCloudsResponse } from "./clouds.test";

const fetchRegionsResponse = {
  regions: [
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
  ]
};

describe("Test fetch regions action", () => {
  let store;
  beforeEach(() => {
    store = testStore();
    fetchMock.reset();
  });

  it("tests fetchRegions function", async () => {
    fetchMock.mock(config.API.regions, fetchRegionsResponse);
    fetchMock.mock(`${config.API.clouds}?region=africa`, fetchCloudsResponse);
    await store.dispatch(fetchRegions());
    const newState = store.getState();
    await expect(newState.regions.regions).toStrictEqual(
      fetchRegionsResponse.regions
    );
  });
});
