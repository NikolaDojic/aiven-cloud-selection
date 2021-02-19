import { LocationActions, ILocation } from "../interfaces";
import { SET_USER_LOCATION } from "../actions/types";

const initialState: ILocation = {
  latitude: 0,
  longitude: 0
};

const locations = (
  state: ILocation = initialState,
  action: LocationActions
) => {
  const actions: any = {
    [SET_USER_LOCATION]: () => ({ ...state, ...action.payload })
  };
  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

export default locations;
