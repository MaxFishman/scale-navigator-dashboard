import React, { useRef } from "react";
import Pfivesketch from "../Navigation/Navigator/Pfivesketch";
import { useSelector } from "react-redux";

export const otherPageStyle = {
    height: "50vh",
    marginTop: "26px",
};

const ScaleNavigator = ({ hasActiveRoute, isMobile }) => {
    const { isEnsembleMember } = useSelector((state) => state.root);
    const wrapperRef = useRef();
    const homePageStyle = isMobile ? { height: "100%" } : {};
    const style = hasActiveRoute ? otherPageStyle : homePageStyle;

    return (
        <div
            style={style}
            ref={wrapperRef}
            id="canv_container"
            className="navigation__scalenav canvas-wrapper"
        >
            <Pfivesketch isMember={isEnsembleMember} wrapperRef={wrapperRef} />
        </div>
    );
};

export default ScaleNavigator;
