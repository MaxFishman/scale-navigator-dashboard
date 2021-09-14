import React, { useContext, useEffect, useRef } from "react";
import Pfivesketch from "./Navigator/Pfivesketch";
import { ScaleContext } from "../Context/ScaleContext";
import ScaleData from "common/ScaleData";
import PitchClassData from "common/PitchClassData";
import Navigator from "./Navigator/Navigator";
import Tabs from "components/Tabs";
import MobileMenu from "../MobileMenu";
import useWindowSize from "../../hooks/device/index";

import "./Navigation.scss";

const Navigation = () => {
  const size = useWindowSize();
  const isMobile = size.width < 425;

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

  const hasActiveRoute = isMobile && window.location.pathname !== '/';
  const wrapperStyle = hasActiveRoute ? {height: '0', overflow: 'hidden'} : {};
  const logoStyle = hasActiveRoute ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    background: 'black',
    'z-index': 123,
    'padding-top': '12px'
  } : {};

  return (
    <div className="navigation" style={wrapperStyle}>

      <div className="header-wrapper" style={logoStyle}>
        <h1 className="navigation__logo">
          Scale Navigator
          <h2 className="navigation__sublogo">Dashboard</h2>
        </h1>

        {isMobile && <MobileMenu/>}
      </div>

      <div className="navigation__scalenav canvas-wrapper" id="canv_container">
        {!hasActiveRoute && <Pfivesketch nav={navRef.current}/>}
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
            .map((word) => word.charAt(0) + word.slice(1))
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
            <label for="autopilot">autopilot</label>
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
              style={{direction: "rtl"}}
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
