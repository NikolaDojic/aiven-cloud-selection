import {
  SET_PLATFORMS,
  REQUEST_PLATFORMS,
  REQUEST_PLATFORMS_FINISHED
} from "./types";
import { IAction, IPlatform } from "../interfaces";
import config from "../config";

export const requestPlatforms: () => IAction = () => ({
  type: REQUEST_PLATFORMS
});

export const requestPlatformsFinished: () => IAction = () => ({
  type: REQUEST_PLATFORMS_FINISHED
});

export const setPlatforms: (platforms: IPlatform[]) => IAction = platforms => ({
  type: REQUEST_PLATFORMS_FINISHED,
  payload: platforms
});

interface fetchPlatformsArgs {
  platform?: string | null;
  geoRegion?: string | null;
}

export const fetchPlatforms: () => (dispatch: any) => void = () => {
  return dispatch => {
    fetch(config.API.platforms)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(json => {
        console.log(json);
        dispatch(setPlatforms(json["platforms"]));
      });
  };
};
