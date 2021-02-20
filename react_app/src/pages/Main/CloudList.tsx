import React from "react";
import { connect } from "react-redux";
import Cloud from "./Cloud";
import { IRegion, ICloud, ILocation } from "../../interfaces";
import { setActiveCloud } from "../../actions/clouds";
import { getDistance } from "../../utils";

interface Props {
  clouds: ICloud[];
  isSelected: (cloud: ICloud) => boolean;
  onClick: (cloud: ICloud) => void;
}

const CloudList: React.FC<Props> = ({ clouds, isSelected, onClick }) => {
  return (
    <div data-testid="CloudList" className="CloudList">
      {clouds.map(cloud => (
        <Cloud
          key={cloud.cloud_name}
          cloud={cloud}
          onClick={onClick}
          isSelected={isSelected}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const userLocation: ILocation = state.location;
  return {
    clouds: state.clouds.clouds
      .map((cloud: ICloud) => ({
        ...cloud,
        distance: getDistance(cloud.location, userLocation)
      }))
      .sort((a: ICloud, b: ICloud) => (a.distance || 0) - (b.distance || 0)),
    isSelected: (cloud: ICloud) => cloud.cloud_name === state.clouds.activeCloud
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onClick: (cloud: ICloud) => dispatch(setActiveCloud(cloud.cloud_name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloudList);
