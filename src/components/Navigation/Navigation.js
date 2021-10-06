import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import Pfivesketch from "./Navigator/Pfivesketch";
import ScaleData from "common/ScaleData";
import PitchClassData from "common/PitchClassData";
import Navigator from "./Navigator/Navigator";
import Tabs from "components/Tabs";
import MobileMenu from "../MobileMenu";
import useWindowSize from "../../hooks/device/index";
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/logo.svg'

import "./Navigation.scss";

const MainWrapper = styled.div`
    height: calc(100vh - 188px);

    .canvas-wrapper {
        height: 80%;
    }

    .navinfo {
        height: 20%;
    }
`;

const Navigation = () => {
    const dispatch = useDispatch()
    const { scaleData } = useSelector(state => state.root)
    const setScaleData = (payload) => dispatch({ type: 'SET_SCALE_DATA', payload })

    // Note for Scott:
    //
    // Persist the scale data on firebase once changed
    // Listen to the scale data changes and use this line to set the view.
    // dispatch({ type: 'SET_SCALE_DATA', payload })

    const location = useLocation();
    const size = useWindowSize();
    const isMobile = size.width < 425;

    const { scale } = scaleData;

    const canvasWrapperRef = useRef(null);
    const navRef = useRef(null);
    window.navRef = navRef;

    useEffect(() => {
        navRef.current = new Navigator.Navigator(setScaleData);
    }, []);

    useEffect(() => {
        navRef.current.jumpToScale(scale);
    }, [scale]);

    useEffect(() => {
        navRef.current.scaleDataCallback(setScaleData);
    }, [setScaleData]);

    const hasActiveRoute = isMobile && location.pathname !== '/';
    const wrapperStyle = hasActiveRoute ? { height: '40vh', overflow: 'hidden' } : {};
    const navInfoStyle = hasActiveRoute ? { display: 'none' } : {};
    const logoStyle = hasActiveRoute ? {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: 'black',
        'z-index': 123
    } : {};

    const sketchWrapperStyle = hasActiveRoute ? { height: '40vh', overflow: 'hidden', marginTop: '70px' } : {}

    return (
        <div className="navigation" style={wrapperStyle}>
            <div className="header-wrapper" style={logoStyle}>
                <div className="app-logo">
                    <Logo/>
                </div>
                {isMobile && <MobileMenu/>}
            </div>

            <MainWrapper>
                <div className="navigation__scalenav canvas-wrapper" id="canv_container" ref={canvasWrapperRef} style={sketchWrapperStyle}>
                    <Pfivesketch navRef={navRef.current} canvasWrapperRef={canvasWrapperRef}/>
                </div>

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
                            />
                            <label for="autopilot">autopilot</label>
                        </div>

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
                            />
                        </div>
                    </div>
                </div>
            </MainWrapper>

            <Tabs className="mobile-tabs"/>
        </div>
    );
};

export default Navigation;
