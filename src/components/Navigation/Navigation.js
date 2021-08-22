import Pfivesketch from "./Navigator/Pfivesketch";
import React, { useEffect } from "react";
import { ScaleContext } from "../Context/ScaleContext";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <div className="navigation">
      <div>
        <div id="title_container">scale navigator</div>
        <div id="logo">dashboard</div>
        <p id="author">
          by <a href="https://www.nathanturczan.com/">Nathan Turczan</a>
        </p>
      </div>
      <div className="scalenav_container" id="canv_container">
        <ScaleContext.Consumer>
          {({ navigator }) => {
            return <Pfivesketch nav={navigator}></Pfivesketch>;
          }}
        </ScaleContext.Consumer>
      </div>
      <div id="autopilot_container">
        <form>
          <label>Autopilot</label>
          <input
            type="checkbox"
            autoComplete="off"
            id="autopilot_checkbox"
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Navigation;
