import React from "react";
import { connect } from "react-redux";
import Region from "./Region";
import { IRegion } from "../../../interfaces";
import { setActiveRegion } from "../../../actions/regions";

interface Props {
  onClick: (region: IRegion) => void;
  isSelected: (region: IRegion) => boolean;
  regions: IRegion[];
}

const RegionList: React.FC<Props> = ({ onClick, isSelected, regions }) => {
  return (
    <div className="RegionList">
      {regions.map(region => (
        <Region
          key={region.region}
          onClick={onClick}
          isSelected={isSelected}
          region={region}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const regions: IRegion[] = state.regions.regions;
  return {
    regions,
    isSelected: (region: IRegion) =>
      region.region === state.regions.activeRegion
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onClick: (region: IRegion) => {
    dispatch(setActiveRegion(region.region));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionList);
