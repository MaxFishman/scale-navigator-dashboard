import React from "react";
import Pfivesketch from "../Navigation/Navigator/Pfivesketch";
import { useSelector } from "react-redux";

export const sketchWrapperStyle = {
    height: "35vh",
    marginTop: "53px",
};

const ScaleNavigator = ({ navRef, canvasWrapperRef, hasActiveRoute }) => {
    const { isEnsembleMember } = useSelector((state) => state.root);

    return (
        <div
            className="navigation__scalenav canvas-wrapper"
            id="canv_container"
            ref={canvasWrapperRef}
            style={hasActiveRoute ? sketchWrapperStyle : {}}
        >
            <Pfivesketch
                // navRef={navRef}
                canvasWrapperRef={canvasWrapperRef}
                isMember={isEnsembleMember}
            />
        </div>
    );
};

export default ScaleNavigator;
