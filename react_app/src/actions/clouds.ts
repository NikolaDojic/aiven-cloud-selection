import { SET_CLOUDS, REQUEST_CLOUDS, REQUEST_CLOUDS_FINISHED } from "./types";
import { INoPayloadAction, ICloud, ISetCloudsAction } from "../interfaces";
import { objToQuery } from "../utils";
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

interface fetchCloudsArgs {
  platform?: string | null | undefined;
  region?: string | null | undefined;
}

export const fetchClouds = (
  args: fetchCloudsArgs = { platform: "", region: "" }
) => {
  return (dispatch: any, getState: any) => {
    const platform =
      (args || {}).platform || getState().platforms.activePlatform;
    const region = (args || {}).region || getState().platforms.activeRegion;
    const queryParams: string = objToQuery({ platform, region }) || "";
    fetch(`${config.API.clouds}${queryParams}`)
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
