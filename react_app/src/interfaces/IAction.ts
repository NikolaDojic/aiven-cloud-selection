import { ICloud } from "./ICloud";
import { IPlatform } from "./IPlatform";
import { ILocation } from "./ILocation";

export interface IAction {
  type: string;
  payload?: any;
}

export interface INoPayloadAction {
  type: string;
}

//clouds
export interface ISetCloudsAction {
  type: string;
  payload: ICloud[];
}

export type CloudActions = ISetCloudsAction | IAction;

//platform
export interface ISetPlatformsAction {
  type: string;
  payload: IPlatform[];
}

export type PlatformActions = ISetPlatformsAction | IAction;

//location
export interface ISetLocationAction {
  type: string;
  payload: ILocation;
}

export type LocationActions = ISetLocationAction | IAction;
