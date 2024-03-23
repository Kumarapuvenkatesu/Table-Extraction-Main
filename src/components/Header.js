import logo from "../logo.png";
import React from "react";

function HeaderComponent() {
  return (
    <div className="header-extracttable" >
      <div className="container" >
        <div className="header-section">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="contact">
            <button type="button">Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeaderComponent;
