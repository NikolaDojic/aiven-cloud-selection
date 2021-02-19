import React from "react";
import "./Main.css";
import PlatformList from "./PlatformList";

const Main: React.FC = props => {
  return (
    <div className="Main">
      <PlatformList />
    </div>
  );
};
export default Main;
