import React, { useRef } from "react";
import Pfivesketch from "../Navigation/Navigator/Pfivesketch";
import { useSelector } from "react-redux";

import "./ScaleNavigator.scss";
// import useWindowSize from "hooks/device";

// export const otherPageStyle = {
//     height: "40vh",
//     marginTop: "10px",
// };

const ScaleNavigator = ({ isMobileAndNotHomePage }) => {
    const { isEnsembleMember } = useSelector((state) => state.root);
    const wrapperRef = useRef();

    let style;
    if (isMobileAndNotHomePage) {
        style = {
            marginTop: "3rem",
        };
    } else {
        style = { marginTop: "auto" };
    }
    console.log(isMobileAndNotHomePage);

    return (
        <div
            ref={wrapperRef}
            id="canv_container"
            className="navigation__scalenav canvas-wrapper"
            style={style}
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
