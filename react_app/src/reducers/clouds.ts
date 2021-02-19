import { CloudActions } from "../interfaces";
import {
  SET_CLOUDS,
  REQUEST_CLOUDS,
  REQUEST_CLOUDS_FINISHED
} from "../actions/types";

const initialState = {
  clouds: [],
  isFetching: false,
  activeCloud: ""
};

const clouds = (state = initialState, action: any) => {
  const actions: any = {
    [SET_CLOUDS]: () => ({ ...state, clouds: action.payload }),
    [REQUEST_CLOUDS]: () => ({ ...state, isFetching: true }),
    [REQUEST_CLOUDS_FINISHED]: () => ({ ...state, isFetching: false })
  };
  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

export default clouds;
