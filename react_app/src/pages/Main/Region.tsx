import React from "react";
import { IRegion } from "../../interfaces";

interface Props {
  region: IRegion;
  onClick: (region: IRegion) => void;
  isSelected: (region: IRegion) => boolean;
}

const Region: React.FC<Props> = ({ region, onClick, isSelected }) => {
  return (
    <div
      onClick={() => onClick(region)}
      className={`Region${isSelected(region) ? " selected" : ""}`}
    >
      {region.region.titleCase()}
    </div>
  );
};
export default Region;
