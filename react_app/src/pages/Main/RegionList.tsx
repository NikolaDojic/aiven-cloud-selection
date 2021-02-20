import React from "react";
import { connect } from "react-redux";
import Region from "./Region";
import { IPlatform } from "../../interfaces";
import { setActiveRegion } from "../../actions/platforms";

interface Props {
  onClick: (region: string) => void;
  isSelected: (region: string) => boolean;
  regions: string[];
}

const RegionList: React.FC<Props> = ({ onClick, isSelected, regions }) => {
  return (
    <div className="RegionList">
      {regions.map(region => (
        <Region
          key={region}
          onClick={onClick}
          isSelected={isSelected}
          region={region}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const currentPlatform =
    state.platforms.platforms.find(
      (platform: IPlatform) =>
        platform.platform_id === state.platforms.activePlatform
    ) || {};
  return {
    regions: currentPlatform.regions || [],
    isSelected: (region: string) => region === state.platforms.activeRegion
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onClick: (region: string) => {
    dispatch(setActiveRegion(region));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionList);
