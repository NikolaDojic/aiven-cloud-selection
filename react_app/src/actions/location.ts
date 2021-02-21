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
    navigator.permissions.query({ name: "geolocation" }).then(status => {
      if (status.state === "prompt") {
        alert(
          "We will ask for your geolocation. The only purpous is to help you find the closest server."
        );
      }
      window.navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        dispatch(
          setUserLocation({
            latitude,
            longitude
          })
        );
      });
    });
  };
};
