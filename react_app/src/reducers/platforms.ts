import { PlatformActions } from "../interfaces";
import {
  SET_PLATFORMS,
  REQUEST_PLATFORMS,
  REQUEST_PLATFORMS_FINISHED
} from "../actions/types";

const initialState = {
  platforms: [],
  isFetching: false,
  activePlatform: ""
};

const platforms = (state = initialState, action: PlatformActions) => {
  const actions: any = {
    [SET_PLATFORMS]: () => ({ ...state, platforms: action.payload }),
    [REQUEST_PLATFORMS]: () => ({ ...state, isFetching: true }),
    [REQUEST_PLATFORMS_FINISHED]: () => ({ ...state, isFetching: false })
  };
  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

export default platforms;
