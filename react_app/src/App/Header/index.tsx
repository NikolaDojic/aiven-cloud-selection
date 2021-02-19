import React from "react";
import Logo from "../../assets/imgs/crab.svg";
import "./Header.css";

const Header: React.FC = props => {
  return (
    <div data-testid="header" className="Header">
      <div data-testid="logoContainer" className="logo">
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
};
export default Header;
