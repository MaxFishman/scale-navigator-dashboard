import React, { useRef } from "react";
import Pfivesketch from "../Navigation/Navigator/Pfivesketch";
import { useSelector } from "react-redux";

export const otherPageStyle = {
    height: "40vh",
    marginTop: "10px",
};

const ScaleNavigator = ({ hasActiveRoute, isMobileAndNotHomePage }) => {
    const { isEnsembleMember } = useSelector((state) => state.root);
    const wrapperRef = useRef();
    const homePageStyle = isMobileAndNotHomePage ? { height: "100%" } : {};
    const style = hasActiveRoute ? otherPageStyle : homePageStyle;

    return (
        <div
            style={style}
            ref={wrapperRef}
            id="canv_container"
            className="navigation__scalenav canvas-wrapper"
        >
            <Pfivesketch
                isMember={isEnsembleMember}
                wrapperRef={wrapperRef}
                isMobileAndNotHomePage={isMobileAndNotHomePage}
            />
        </div>
    );
};

export default ScaleNavigator;
