import { IPlatform } from "./IPlatform";

export interface IPlatformState {
  platforms: IPlatform[];
  isFetching: boolean;
  activePlatform: string | undefined | null;
}
