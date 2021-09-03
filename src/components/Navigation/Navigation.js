import Pfivesketch from "./Navigator/Pfivesketch";
import React, { useContext, useEffect, useRef } from "react";
import { ScaleContext } from "../Context/ScaleContext";
import ScaleData from "common/ScaleData";
import PitchClassData from "common/PitchClassData";
import Navigator from "./Navigator/Navigator";
import Tabs from "components/Tabs";

import "./Navigation.scss";

const Navigation = () => {
  const { scaleData, setScaleData } = useContext(ScaleContext);
  const { scale } = scaleData;

  const navRef = useRef(null);

  useEffect(() => {
    navRef.current = new Navigator.Navigator(setScaleData);
  }, []);

  useEffect(() => {
    navRef.current.jumpToScale(scale);
  }, [scale]);

  useEffect(() => {
    navRef.current.scaleDataCallback(setScaleData);
  }, [setScaleData]);

  return (
    <div className="navigation">
      <div className="navigation__logowrap">
        <h1 className="navigation__logo">Scale Navigator</h1>
        <h2 className="navigation__sublogo">DASHBOARD</h2>
      </div>

      <div className="navigation__scalenav canvas-wrapper" id="canv_container">
        <Pfivesketch nav={navRef.current}/>
      </div>

      <div className="navinfo">
        <div className="navinfo__root">
          <h5>ROOT</h5>
          {PitchClassData[ScaleData[scale].root].note}
        </div>
        <div className="navinfo__scaleclass">
          <h5>SCALE CLASS</h5>
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

          {/* <div className="navinfo__option">
            <input
              type="checkbox"
              autoComplete="off"
              name="labels"
              id="labels_checkbox"
              defaultChecked="false"
            ></input>
            <label for="labels">Labels</label>
          </div> */}

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
          </div>
        </div>
      </div>

      <Tabs className="mobile-tabs"/>
    </div>
  );
};

export default Navigation;
