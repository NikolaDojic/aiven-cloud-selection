import React from "react";

interface Props {
  region: string;
  onClick: (region: string) => void;
  isSelected: (region: string) => boolean;
}

const Region: React.FC<Props> = ({ region, onClick, isSelected }) => {
  return (
    <div
      onClick={() => onClick(region)}
      className={`Region${isSelected(region) ? " selected" : ""}`}
    >
      {region.titleCase()}
    </div>
  );
};
export default Region;
