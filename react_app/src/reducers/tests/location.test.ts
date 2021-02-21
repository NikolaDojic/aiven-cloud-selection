import { SET_USER_LOCATION } from "../../actions/types";
import locationReducer from "../location";

describe("tests location reducer", () => {
  it("tests SET_USER_LOCATION action", () => {
    const initialState = {
      latitude: 0,
      longitude: 0
    };
    const newCoord = {
      latitude: 13,
      longitude: 36
    };
    const state = locationReducer(initialState, {
      type: SET_USER_LOCATION,
      payload: newCoord
    });
    expect(state).toStrictEqual({ ...initialState, ...newCoord });
  });
});
