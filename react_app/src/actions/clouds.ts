import {
  REQUEST_CLOUDS,
  REQUEST_CLOUDS_FINISHED,
  SET_ACTIVE_CLOUD,
  SET_CLOUDS
} from "./types";
import {
  INoPayloadAction,
  ICloud,
  ISetCloudsAction,
  ISetActiveCloud,
  IState
} from "../interfaces";
import { objToQuery } from "../utils";
import { setActiveRegion } from "./regions";
import { setActivePlatform } from "./platforms";
import config from "../config";

export const requestClouds: () => INoPayloadAction = () => ({
  type: REQUEST_CLOUDS
});

export const requestCloudsFinished: () => INoPayloadAction = () => ({
  type: REQUEST_CLOUDS_FINISHED
});

export const setClouds: (clouds: ICloud[]) => ISetCloudsAction = clouds => ({
  type: SET_CLOUDS,
  payload: clouds
});

export const setActiveCloud: (cloud_name: string) => ISetActiveCloud = (
  cloud_name: string
) => ({
  type: SET_ACTIVE_CLOUD,
  payload: cloud_name
});

interface fetchCloudsArgs {
  platform?: string | null | undefined;
  region?: string | null | undefined;
}

export const fetchClouds = (
  args: fetchCloudsArgs = { platform: "", region: "" }
) => {
  return (dispatch: any, getState: () => IState) => {
    const platform =
      (args || {}).platform || getState().platforms.activePlatform;
    const region = (args || {}).region || getState().regions.activeRegion;
    const fetchArgs: any = { platform, region };
    Object.keys(fetchArgs).map((key: string) => {
      if (!fetchArgs[key]) {
        delete fetchArgs[key];
      }
    });

    const queryParams = objToQuery(fetchArgs) || "";
    return fetch(`${config.API.clouds}${queryParams}`)
      .then(res => {
        dispatch(requestCloudsFinished());
        return res.json();
      })
      .then(json => {
        dispatch(setClouds(json["clouds"]));
      })
      .catch(err => {
        console.log(err);
        dispatch(requestCloudsFinished());
      });
  };
};

export const findClosestCloud = () => {
  return (dispatch: any, getState: () => IState) => {
    const location = getState().location;
    const queryParams = objToQuery(location) || "";
    return fetch(`${config.API.cosestCloud}${queryParams}`)
      .then(res => res.json())
      .then(json => {
        dispatch(setActiveCloud(json.cloud_name));
        dispatch(setActiveRegion(json.location.region));
        dispatch(setActivePlatform(json.cloud_name.split("-")[0]));
      });
  };
};
