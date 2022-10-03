import React, { useRef } from "react";
import Pfivesketch from "../Navigation/Navigator/Pfivesketch";
import { useSelector } from "react-redux";

export const sketchWrapperStyle = {
    height: "50vh",
    marginTop: "80px",
};

const ScaleNavigator = ({ hasActiveRoute }) => {
    const { isEnsembleMember } = useSelector((state) => state.root);
    const wrapperRef = useRef();

    return (
        <div
            ref={wrapperRef}
            id="canv_container"
            className="navigation__scalenav canvas-wrapper"
            style={hasActiveRoute ? sketchWrapperStyle : {}}
        >
            <Pfivesketch isMember={isEnsembleMember} wrapperRef={wrapperRef} />
        </div>
    );
};

export default ScaleNavigator;
