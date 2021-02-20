import { ICloud } from "./ICloud";

export interface ICloudState {
  clouds: ICloud[];
  isFetching: boolean;
  activeCloud: string | undefined | null;
}
