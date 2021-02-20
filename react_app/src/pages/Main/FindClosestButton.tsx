import React from "react";
import { connect } from "react-redux";
import { findClosestCloud } from "../../actions/clouds";

interface Props {
  findClosestCloud: () => void;
}

const FindClosestButton: React.FC<Props> = ({ findClosestCloud }) => {
  return (
    <button className="FindClosestButton" onClick={() => findClosestCloud()}>
      Find Closest Cloud
    </button>
  );
};

export default connect(
  null,
  { findClosestCloud }
)(FindClosestButton);
