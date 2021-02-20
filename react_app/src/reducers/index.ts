import { combineReducers } from "redux";
import clouds from "./clouds";
import platforms from "./platforms";
import regions from "./regions";
import location from "./location";

const reducers = () =>
  combineReducers({
    clouds,
    platforms,
    regions,
    location
  });

export default reducers;
