import {
  REQUEST_REGIONS,
  REQUEST_REGIONS_FINISHED,
  SET_ACTIVE_REGION,
  SET_REGIONS
} from "./types";
import {
  IAction,
  IRegion,
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
    const currentRegion: IRegion = getState().regions.regions.find(
      (region: IRegion) => region.region === regionId
    );
    if (
      currentRegion &&
      !currentRegion.platforms.includes(getState().platforms.activePlatform)
    ) {
      dispatch(setActivePlatform(currentRegion.platforms[0]));
    } else {
      dispatch(fetchClouds());
    }
  };
};

export const fetchRegions = () => {
  return (dispatch: any, getState: any) => {
    fetch(config.API.regions)
      .then(res => {
        dispatch(requestRegionsFinished());
        return res.json();
      })
      .then(json => {
        const regions = json["regions"];
        const activeRegion = getState().regions.activeRegion;
        dispatch(setRegions(regions));
        if (regions.length && !activeRegion) {
          dispatch(setActiveRegion(regions[0].region));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(requestRegionsFinished());
      });
  };
};
