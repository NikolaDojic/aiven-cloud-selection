import { SET_USER_LOCATION } from "./types";
import { ILocation, ISetLocationAction } from "../interfaces";

export const setUserLocation: (
  location: ILocation
) => ISetLocationAction = location => ({
  type: SET_USER_LOCATION,
  payload: location
});

export const askForGeolocation: () => (dispatch: any) => void = () => {
  return (dispatch: any) => {
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
