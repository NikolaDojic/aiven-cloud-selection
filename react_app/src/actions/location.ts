import { SET_USER_LOCATION } from "./types";
import { ILocation, ISetLocationAction, AllActions } from "../interfaces";
import { Dispatch } from "redux";

export const setUserLocation: (
  location: ILocation
) => ISetLocationAction = location => ({
  type: SET_USER_LOCATION,
  payload: location
});

export const askForGeolocation: () => (dispatch: Dispatch) => void = () => {
  return dispatch => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      dispatch(
        setUserLocation({
          latitude,
          longitude
        })
      );
    });
  };
};
