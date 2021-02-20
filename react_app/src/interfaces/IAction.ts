import { ICloud } from "./ICloud";
import { IPlatform } from "./IPlatform";
import { IRegion } from "./IRegion";
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

export interface ISetActiveCloud {
  type: string;
  payload: string;
}

export type CloudActions = ISetCloudsAction | ISetActiveCloud | IAction;

//platform
export interface ISetPlatformsAction {
  type: string;
  payload: IPlatform[];
}

export interface ISetActivePlatform {
  type: string;
  payload: string;
}

export type PlatformActions =
  | ISetPlatformsAction
  | ISetActivePlatform
  | IAction;

//region
export interface ISetRegionsAction {
  type: string;
  payload: IRegion[];
}

export interface ISetActiveRegion {
  type: string;
  payload: string;
}

export type RegionActions = ISetRegionsAction | ISetActiveRegion | IAction;

//location
export interface ISetLocationAction {
  type: string;
  payload: ILocation;
}

export type LocationActions = ISetLocationAction | IAction;
