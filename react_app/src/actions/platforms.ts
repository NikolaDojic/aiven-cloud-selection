import {
  REQUEST_PLATFORMS,
  REQUEST_PLATFORMS_FINISHED,
  SET_ACTIVE_PLATFORM,
  SET_ACTIVE_REGION,
  SET_PLATFORMS
} from "./types";
import {
  IAction,
  IPlatform,
  ISetActivePlatform,
  ISetActiveRegion
} from "../interfaces";
import { fetchClouds } from "./clouds";
import config from "../config";

export const requestPlatforms: () => IAction = () => ({
  type: REQUEST_PLATFORMS
});

export const requestPlatformsFinished: () => IAction = () => ({
  type: REQUEST_PLATFORMS_FINISHED
});

export const setPlatforms: (platforms: IPlatform[]) => IAction = platforms => ({
  type: SET_PLATFORMS,
  payload: platforms
});

export const setActivePlatform = (platformId: string) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_ACTIVE_PLATFORM,
      payload: platformId
    });
    dispatch(fetchClouds());
  };
};

export const setActiveRegion: (
  region: string
) => ISetActiveRegion = region => ({
  type: SET_ACTIVE_REGION,
  payload: region
});

export const fetchPlatforms = () => {
  return (dispatch: any, getState: any) => {
    fetch(config.API.platforms)
      .then(res => {
        dispatch(requestPlatformsFinished());
        return res.json();
      })
      .then(json => {
        const platforms = json["platforms"];
        const activePlatform = getState().platforms.activePlatform;
        dispatch(setPlatforms(platforms));
        if (platforms.length && !activePlatform) {
          dispatch(setActivePlatform(platforms[0].platform_id));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(requestPlatformsFinished());
      });
  };
};
