import React, { useEffect, useCallback } from "react";
import { compose } from "recompose";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ScaleData from "common/ScaleData";
import PitchClassData from "common/PitchClassData";
import Tabs from "components/Tabs";
import ScaleNavigator from "components/ScaleNavigator";
import MobileMenu from "../MobileMenu";
import useWindowSize from "../../hooks/device/index";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { withFirebase } from "../Firebase";
import { logoStyle } from "../../common/LayoutConfig";
import { jumpToScaleEvent, navigatorAutoPilot } from "../../events";

import "./Navigation.scss";

const MainWrapper = styled.div`
    height: 100%;

    .canvas-wrapper {
        height: 80%;
    }
    .navinfo {
        height: 20%;
    }
`;

const HostBanner = styled.div`
    text-align: center;
    margin-bottom: -36px;
`;

const Navigation = ({ firebase, authUser }) => {
    const dispatch = useDispatch();
    const { scaleData, isEnsembleMember, currentRoomId } = useSelector(
        (state) => state.root
    );
    const { scale } = scaleData;

    const setScaleData = useCallback(
        (payload) => {
            dispatch({ type: "SET_SCALE_DATA", payload });
        },
        [dispatch]
    );

    const getFirebaseScaleData = useCallback(() => {
        if (!currentRoomId) {
            return;
        }

        firebase.room(currentRoomId).onSnapshot((doc) => {
            if (!doc.exists) {
                return;
            }

            const { scaleData } = doc.data();

            jumpToScaleEvent(scaleData);
            setScaleData(scaleData);
        });
    }, [currentRoomId, firebase, setScaleData]);

    const location = useLocation();
    const size = useWindowSize();
    const isMobile = size.width < 425;

    useEffect(() => {
        jumpToScaleEvent(scale);
    }, [scale]);

    useEffect(() => {
        if (isEnsembleMember) getFirebaseScaleData();
    }, [isEnsembleMember, getFirebaseScaleData]);

    // TODO: refactor
    // shouldnt be under window object.
    //
    // const setFirebaseScaleData = (scaleData) => {
    //     const roomId = currentRoomId;
    //     firebase.room(roomId).update({ scaleData });
    // };
    // window.setFirebaseScaleData = setFirebaseScaleData;

    const hasActiveRoute = isMobile && location.pathname !== "/";
    const wrapperStyle = hasActiveRoute
        ? { height: "40vh", overflow: "hidden" }
        : {};
    const navInfoStyle = hasActiveRoute ? { display: "none" } : {};

    const handleAutoPilotToggle = (event) => {
        navigatorAutoPilot(event.target.checked);
    };

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

            <MainWrapper>
                {authUser && (
                    <HostBanner>
                        {authUser.isHost ? (
                            <p>
                                You are currently the host of :{" "}
                                <span>{authUser.currentEnsemble}</span>
                            </p>
                        ) : (
                            <p>
                                You are currently the guest of :{" "}
                                <span>{authUser.currentEnsemble}</span>
                            </p>
                        )}
                    </HostBanner>
                )}

                <ScaleNavigator hasActiveRoute={hasActiveRoute} />

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
                            <label>
                                <input
                                    type="checkbox"
                                    autoComplete="off"
                                    name="autopilot"
                                    onChange={handleAutoPilotToggle}
                                />
                                autopilot
                            </label>
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
                            />
                        </div>
                    </div>
                </div>
            </MainWrapper>

            <Tabs className="mobile-tabs" />
        </div>
    );
};

export default compose(withFirebase)(Navigation);
