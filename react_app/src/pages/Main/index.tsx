import React from "react";
import "./Main.css";
import PlatformList from "./PlatformList";
import RegionList from "./RegionList";
import CloudList from "./CloudList";
import Buttons from "./Buttons";

const Main: React.FC = props => {
  return (
    <div className="Main">
      <RegionList />
      <PlatformList />
      <CloudList />
      <Buttons />
    </div>
  );
};
export default Main;
