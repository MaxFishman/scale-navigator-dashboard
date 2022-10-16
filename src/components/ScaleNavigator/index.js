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
    // const homePageStyle = isMobileAndNotHomePage ? { height: "100%" } : {};
    // const style = hasActiveRoute ? otherPageStyle : homePageStyle;
    // const size = useWindowSize();

    return (
        <div
            // style={{
            //     marginTop: "3rem",
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     height: "500px",
            // }}
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
