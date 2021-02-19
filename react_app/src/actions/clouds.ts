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
  geoRegion?: string | null | undefined;
}

export const fetchClouds = (args?: fetchCloudsArgs) => {
  const queryParams: string = objToQuery(args) || "";
  return (dispatch: any) => {
    fetch(`${config.API.clouds}${queryParams}`)
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(json => {
        console.log(json);
        dispatch(setClouds(json["clouds"]));
      });
  };
};
