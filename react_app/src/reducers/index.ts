import { combineReducers } from "redux";
import clouds from "./clouds";
import platforms from "./platforms";
import location from "./location";

const reducers = () =>
  combineReducers({
    clouds,
    platforms,
    location
  });

export default reducers;
