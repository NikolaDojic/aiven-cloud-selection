import React from "react";
import { IPlatform } from "../../../interfaces";

interface Props {
  platform: IPlatform;
  onClick: (platform: IPlatform) => any;
  isSelected: (platform: IPlatform) => boolean;
}

const Platform: React.FC<Props> = ({ platform, onClick, isSelected }) => {
  return (
    <div
      data-test="platform"
      className={`Platform${
        isSelected && isSelected(platform) ? " selected" : ""
      }`}
      onClick={() => onClick(platform)}
    >
      <img src={platform.img} alt={`${platform.name} logo`} />
    </div>
  );
};
export default Platform;
