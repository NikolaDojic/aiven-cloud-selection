import React from "react";
import { ICloud, ILocation } from "../../../interfaces";

interface Props {
  cloud: ICloud;
  onClick: (cloud: ICloud) => void;
  isSelected: (cloud: ICloud) => boolean;
}

const Cloud: React.FC<Props> = ({ cloud, onClick, isSelected }) => {
  return (
    <div
      onClick={() => onClick(cloud)}
      className={`Cloud${isSelected(cloud) ? " selected" : ""}`}
    >
      <div>
        <div className="cloudName">{cloud.cloud_name}</div>
        <div className="cloudDescription">{cloud.cloud_description}</div>
      </div>
      <div className="distance">{(cloud.distance || 0).toFixed(2)} km</div>
    </div>
  );
};

export default Cloud;
