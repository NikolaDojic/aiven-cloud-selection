import { CloudActions, ICloudState } from "../interfaces";
import {
  SET_CLOUDS,
  REQUEST_CLOUDS,
  REQUEST_CLOUDS_FINISHED,
  SET_ACTIVE_CLOUD
} from "../actions/types";

const initialState: ICloudState = {
  clouds: [],
  isFetching: false,
  activeCloud: ""
};

const clouds: (state: ICloudState, action: CloudActions) => ICloudState = (
  state = initialState,
  action
) => {
  const actions: any = {
    [SET_CLOUDS]: () => ({ ...state, clouds: action.payload }),
    [REQUEST_CLOUDS]: () => ({ ...state, isFetching: true }),
    [REQUEST_CLOUDS_FINISHED]: () => ({ ...state, isFetching: false }),
    [SET_ACTIVE_CLOUD]: () => ({ ...state, activeCloud: action.payload })
  };
  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

export default clouds;
