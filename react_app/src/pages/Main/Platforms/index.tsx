import React from "react";
import { connect } from "react-redux";
import Platform from "./Platform";
import { IRegion, IPlatform } from "../../../interfaces";
import { setActivePlatform } from "../../../actions/platforms";

interface Props {
  platforms: IPlatform[];
  isSelected: (platform: IPlatform) => boolean;
  onClick: (platform: IPlatform) => void;
}

const PlatformList: React.FC<Props> = ({ platforms, isSelected, onClick }) => {
  return (
    <div data-testid="PlatformList" className="PlatformList">
      {platforms.map(platform => (
        <Platform
          key={platform.platform_id}
          platform={platform}
          onClick={onClick}
          isSelected={isSelected}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    platforms: state.platforms.platforms,
    isSelected: (platform: IPlatform) =>
      platform.platform_id === state.platforms.activePlatform
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onClick: (platform: IPlatform) =>
    dispatch(setActivePlatform(platform.platform_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformList);
