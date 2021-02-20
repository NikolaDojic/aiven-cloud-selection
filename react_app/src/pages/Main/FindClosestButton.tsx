import React from "react";
import { connect } from "react-redux";
import { findClosestCloud } from "../../actions/clouds";

const FindClosestButton: React.FC = ({ findClosestCloud }) => {
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
