import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="Footer" data-testid="footer">
      <div data-testid="iconContrib">
        Crab icon made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};
export default Footer;
