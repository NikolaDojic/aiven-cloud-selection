import {
  REQUEST_REGIONS,
  REQUEST_REGIONS_FINISHED,
  SET_ACTIVE_REGION,
  SET_REGIONS
} from "./types";
import {
  IAction,
  IRegion,
  IPlatform,
  ISetActiveRegion,
  ISetRegionsAction
} from "../interfaces";
import { fetchClouds } from "./clouds";
import { setActivePlatform } from "./platforms";
import config from "../config";

export const requestRegions: () => IAction = () => ({
  type: REQUEST_REGIONS
});

export const requestRegionsFinished: () => IAction = () => ({
  type: REQUEST_REGIONS_FINISHED
});

export const setRegions: (
  regions: IRegion[]
) => ISetRegionsAction = regions => ({
  type: SET_REGIONS,
  payload: regions
});

export const setActiveRegion = (regionId: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({
      type: SET_ACTIVE_REGION,
      payload: regionId
    });
    dispatch(fetchClouds());
  };
};

export const fetchRegions = () => {
  return (dispatch: any, getState: any) => {
    return fetch(config.API.regions)
      .then(res => {
        dispatch(requestRegionsFinished());
        return res.json();
      })
      .then(json => {
        const regions = json["regions"];
        const activeRegion = getState().regions.activeRegion;
        dispatch(setRegions(regions));
        if (regions.length && !activeRegion) {
          const currentPlatform = getState().platforms.platforms.find(
            (platform: IPlatform) =>
              platform.platform_id === getState().platforms.activePlatform
          );
          if (currentPlatform) {
            dispatch(setActiveRegion(currentPlatform.regions[0]));
          }
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(requestRegionsFinished());
      });
  };
};
