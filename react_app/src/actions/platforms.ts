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
import { fetchClouds } from "./clouds";
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
  return (dispatch: any) => {
    dispatch({
      type: SET_ACTIVE_PLATFORM,
      payload: platformId
    });
    dispatch(fetchClouds());
  };
};

export const fetchPlatforms = () => {
  return (dispatch: any, getState: any): IAction | any => {
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
          const currentRegion = getState().regions.regions.find(
            (region: IRegion) =>
              region.region === getState().regions.activeRegion
          );
          if (currentRegion) {
            dispatch(setActivePlatform(currentRegion.platforms[0]));
          }
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(requestPlatformsFinished());
      });
  };
};
