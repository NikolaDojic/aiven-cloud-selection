import React from "react";
import { shallow } from "enzyme";
import Platforms from "./index";
import Platform from "./Platform";
import { testStore, findByTestAttr } from "../../../../test_utils";

const state = {
  platforms: {
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
  }
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  return shallow(<Platforms store={store} />)
    .childAt(0)
    .dive();
};

describe("Platform List Component", () => {
  describe("Platforms Component", () => {
    let component;
    beforeEach(() => (component = setUp(state)));

    it("Should render Platform component * n", () => {
      const platformComponent = component.find("Platform");
      expect(platformComponent.length).toBe(state.platforms.platforms.length);
    });
  });

  describe("Platform Component", () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        platform: state.platforms.platforms[0],
        onClick: mockFunc,
        isSelected: () => false
      };
      wrapper = shallow(<Platform {...props} />);
    });
    it("Shoud trigger onClick callback", () => {
      const button = findByTestAttr(wrapper, "platform");
      button.simulate("click");
      const calls = mockFunc.mock.calls.length;
      expect(calls).toBe(1);
    });
  });
});
