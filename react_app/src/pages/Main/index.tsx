import React from "react";
import "./Main.css";
import Platforms from "./Platforms";
import Regions from "./Regions";
import Clouds from "./Clouds";
import Buttons from "./Buttons";

const Main: React.FC = props => {
  return (
    <div className="Main">
      <Platforms />
      <Regions />
      <Clouds />
      <Buttons />
    </div>
  );
};
export default Main;
