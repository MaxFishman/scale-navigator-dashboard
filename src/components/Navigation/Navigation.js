import Pfivesketch from "./Navigator/Pfivesketch";
import React, { useEffect } from "react";
import { ScaleContext } from "../Context/ScaleContext";
import ScaleData from "common/ScaleData";
import PitchClassData from "common/PitchClassData";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <ScaleContext.Consumer>
      {({ navigator, scale }) => {
        return (
          <div className="navigation">
            <div className="navigation__logowrap">
              <h1 className="navigation__logo">SCALE NAVIGATOR</h1>
              <h2 className="navigation__sublogo">DASHBOARD</h2>
            </div>
            <div className="navigation__scalenav" id="canv_container">
              <Pfivesketch nav={navigator}></Pfivesketch>
            </div>
            <div className="navinfo">
              <div className="navinfo__note">
                <h5>NOTE</h5>
                {PitchClassData[ScaleData[scale].root].note}
              </div>
              <div className="navinfo__scale">
                <h5>SCALE</h5>
                {ScaleData[scale].scale_class
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </div>
              <div className="navinfo__options">
                <div className="navinfo__option">
                  <input
                    type="checkbox"
                    autoComplete="off"
                    name="autopilot"
                    id="autopilot_checkbox"
                  ></input>
                  <label for="autopilot">Autopilot</label>
                </div>
                <div className="navinfo__option">
                  <input
                    type="checkbox"
                    autoComplete="off"
                    name="labels"
                    id="labels_checkbox"
                    defaultChecked="false"
                  ></input>
                  <label for="labels">Labels</label>
                </div>
                <div className="navinfo__option">
                  <input
                    type="range"
                    autoComplete="off"
                    name="autopilot_interval"
                    id="autopilot_interval"
                    min="1"
                    max="4"
                    step="0.01"
                  ></input>
                  <label for="labels">Interval</label>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ScaleContext.Consumer>
  );
};

export default Navigation;
