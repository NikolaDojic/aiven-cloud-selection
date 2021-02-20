import { RegionActions, IRegionState } from "../interfaces";
import {
  SET_REGIONS,
  REQUEST_REGIONS,
  REQUEST_REGIONS_FINISHED,
  SET_ACTIVE_REGION
} from "../actions/types";

const initialState: IRegionState = {
  regions: [],
  isFetching: false,
  activeRegion: ""
};

const regions: (state: IRegionState, action: RegionActions) => IRegionState = (
  state = initialState,
  action
) => {
  const actions: any = {
    [SET_REGIONS]: () => ({ ...state, regions: action.payload }),
    [REQUEST_REGIONS]: () => ({ ...state, isFetching: true }),
    [REQUEST_REGIONS_FINISHED]: () => ({ ...state, isFetching: false }),
    [SET_ACTIVE_REGION]: () => ({ ...state, activeRegion: action.payload })
  };
  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

export default regions;
