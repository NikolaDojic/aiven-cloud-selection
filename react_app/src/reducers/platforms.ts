import { PlatformActions } from "../interfaces";
import {
  SET_PLATFORMS,
  REQUEST_PLATFORMS,
  REQUEST_PLATFORMS_FINISHED,
  SET_ACTIVE_PLATFORM
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
    [REQUEST_PLATFORMS_FINISHED]: () => ({ ...state, isFetching: false }),
    [SET_ACTIVE_PLATFORM]: () => ({ ...state, activePlatform: action.payload })
  };
  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

export default platforms;
