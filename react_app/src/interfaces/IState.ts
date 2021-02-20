import { IRegionState } from "./IRegionState";
import { ICloudState } from "./ICloudState";
import { IPlatformState } from "./IPlatformState";
import { ILocation } from "./ILocation";

export interface IState {
  regions: IRegionState;
  platforms: IPlatformState;
  clouds: ICloudState;
  location: ILocation;
}
