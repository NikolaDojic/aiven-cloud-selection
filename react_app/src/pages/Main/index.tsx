import React from "react";
import "./Main.css";
import PlatformList from "./PlatformList";
import RegionList from "./RegionList";

const Main: React.FC = props => {
  return (
    <div className="Main">
      <PlatformList />
      <RegionList />
    </div>
  );
};
export default Main;
