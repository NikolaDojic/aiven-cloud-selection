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
  IRegion,
  ISetActivePlatform,
  ISetPlatformsAction,
  IState
} from "../interfaces";
import { Dispatch } from "redux";
import { fetchClouds } from "./clouds";
import { setActiveRegion } from "./regions";
import config from "../config";

export const requestPlatforms: () => IAction = () => ({
  type: REQUEST_PLATFORMS
});

export const requestPlatformsFinished: () => IAction = () => ({
  type: REQUEST_PLATFORMS_FINISHED
});

export const setPlatforms: (
  platforms: IPlatform[]
) => ISetPlatformsAction = platforms => ({
  type: SET_PLATFORMS,
  payload: platforms
});

export const setActivePlatform = (platformId: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: SET_ACTIVE_PLATFORM,
      payload: platformId
    });
    const currentPlatform: IPlatform = getState().platforms.platforms.find(
      (platform: IPlatform) => platform.platform_id === platformId
    );
    if (
      currentPlatform &&
      !currentPlatform.regions.includes(getState().regions.activeRegion)
    ) {
      dispatch(setActiveRegion(currentPlatform.regions[0]));
    } else {
      dispatch(fetchClouds());
    }
  };
};

export const fetchPlatforms: () => (
  dispatch: any,
  getState: any
) => IAction | any = () => {
  return (dispatch, getState) => {
    return fetch(config.API.platforms)
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
