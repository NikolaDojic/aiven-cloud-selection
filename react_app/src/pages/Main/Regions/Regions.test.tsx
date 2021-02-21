import React from "react";
import { shallow } from "enzyme";
import Regions from "./index";
import Region from "./Region";
import { testStore, findByTestAttr } from "../../../../test_utils";

const state = {
  regions: {
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
  },
  platforms: {
    activePlatform: "aws",
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
      }
    ]
  }
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  return shallow(<Regions store={store} />)
    .childAt(0)
    .dive();
};

describe("Region List Component", () => {
  describe("Regions Component", () => {
    let component;
    beforeEach(() => (component = setUp(state)));

    it("Should render Region component * n", () => {
      const regionComponent = component.find("Region");
      expect(regionComponent.length).toBe(state.regions.regions.length);
    });
  });

  describe("Region Component", () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        region: state.regions.regions[0],
        onClick: mockFunc,
        isSelected: () => false
      };
      wrapper = shallow(<Region {...props} />);
    });
    it("Shoud trigger onClick callback", () => {
      const button = findByTestAttr(wrapper, "region");
      button.simulate("click");
      const calls = mockFunc.mock.calls.length;
      expect(calls).toBe(1);
    });
  });
});
