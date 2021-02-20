import { IRegion } from "./IRegion";

export interface IRegionState {
  regions: IRegion[];
  activeRegion: string;
  isFetching: boolean;
}
