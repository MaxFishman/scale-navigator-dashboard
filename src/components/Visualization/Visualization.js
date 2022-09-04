import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ScaleData from "common/ScaleData";
import PitchClassData from "common/PitchClassData";
import Navigator from "./Navigator/Navigator";
import Tabs from "components/Tabs";
import ScaleNavigator from "components/ScaleNavigator";
import MobileMenu from "../MobileMenu";
import useWindowSize from "../../hooks/device/index";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { logoStyle } from "../../common/LayoutConfig";
import { jumpToScaleEvent } from "../../events";

import "./Navigation.scss";

const Navigation = () => {
    const dispatch = useDispatch();
    const { scaleData } = useSelector((state) => state.root);
    const { scale } = scaleData;

    const setScaleData = (payload) =>
        dispatch({ type: "SET_SCALE_DATA", payload });

    const location = useLocation();
    const size = useWindowSize();
    const isMobile = size.width < 425;

    const canvasWrapperRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        navRef.current = new Navigator.Navigator(setScaleData);
    }, []);

    useEffect(() => {
        jumpToScaleEvent(scale);
    }, [scale]);

    const hasActiveRoute = isMobile && location.pathname !== "/";
    const wrapperStyle = hasActiveRoute
        ? { height: "20vh", overflow: "hidden" }
        : {};
    const navInfoStyle = hasActiveRoute ? { display: "none" } : {};

    return (
        <div className="navigation" style={wrapperStyle}>
            <div
                className="header-wrapper"
                style={hasActiveRoute ? logoStyle : {}}
            >
                <div className="app-logo">
                    <Logo />
                </div>

                {isMobile && <MobileMenu />}
            </div>

            <ScaleNavigator
                canvasWrapperRef={canvasWrapperRef}
                navRef={navRef.current}
                hasActiveRoute={hasActiveRoute}
            />

            <div className="navinfo" style={navInfoStyle}>
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
                        <label htmlFor="autopilot">autopilot</label>
                    </div>

                    <div className="navinfo__option">
                        <input
                            style={{ direction: "rtl" }}
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

            <Tabs className="mobile-tabs" />
        </div>
    );
};

export default Navigation;
