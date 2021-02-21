import React from "react";
import { shallow } from "enzyme";
import Clouds from "./index";
import Cloud from "./Cloud";
import { testStore, findByTestAttr } from "../../../../test_utils";

const state = {
  clouds: {
    clouds: [
      {
        cloud_description: "Canada, Ontario - DigitalOcean: Toronto",
        cloud_name: "do-tor",
        location: {
          latitude: 45.7,
          longitude: -79.4,
          region: "north america"
        }
      },
      {
        cloud_description:
          "United States, California - DigitalOcean: San Francisco",
        cloud_name: "do-sfo",
        location: {
          latitude: 37.78,
          longitude: -122.42,
          region: "north america"
        }
      },
      {
        cloud_description: "United States, New York - DigitalOcean: New York",
        cloud_name: "do-nyc",
        location: {
          latitude: 40.7,
          longitude: -70,
          region: "north america"
        }
      }
    ]
  }
};

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  return shallow(<Clouds store={store} />)
    .childAt(0)
    .dive();
};

describe("Cloud List Component", () => {
  describe("Clouds Component", () => {
    let component;
    beforeEach(() => (component = setUp(state)));

    it("Should render Cloud component * n", () => {
      const cloudComponent = component.find("Cloud");
      expect(cloudComponent.length).toBe(state.clouds.clouds.length);
    });
  });

  describe("Cloud Component", () => {
    let wrapper;
    let mockFunc;
    beforeEach(() => {
      mockFunc = jest.fn();
      const props = {
        cloud: state.clouds.clouds[0],
        onClick: mockFunc,
        isSelected: () => false
      };
      wrapper = shallow(<Cloud {...props} />);
    });
    it("Shoud trigger onClick callback", () => {
      const button = findByTestAttr(wrapper, "cloud");
      button.simulate("click");
      const calls = mockFunc.mock.calls.length;
      expect(calls).toBe(1);
    });
  });
});
