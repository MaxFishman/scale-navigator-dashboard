import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Sketch from "react-p5";
import {
    init,
    navigatorDraw,
    navigatorMousePressed,
    navigatorMouseReleased,
} from "./Navigator";

const fps = 30;

function Pfivesketch({ canvasWrapperRef, isMember = false }) {
    const dispatch = useDispatch();

    const setScaleData = useCallback(
        (payload) => {
            dispatch({ type: "SET_SCALE_DATA", payload });
        },
        [dispatch]
    );

    const setNavigatorData = useCallback(
        (payload) => {
            dispatch({ type: "SET_NAVIGATOR_DATA", payload });
        },
        [dispatch]
    );

    // const location = useLocation();

    // useLayoutEffect(() => {
    // const p = wrapperElm && wrapperElm.getBoundingClientRect();
    // window.scaleP5 && window.scaleP5.resizeCanvas(p.width, p.height);
    // }, [location.pathname]);

    const wrapperElm = canvasWrapperRef.current;

    const setup = (p5, canvasParentRef) => {
        const p = wrapperElm && wrapperElm.getBoundingClientRect();

        p5.createCanvas(
            p.width,
            Math.max(p.height, document.body.getBoundingClientRect().height / 2)
        ).parent(canvasParentRef);
        p5.frameRate(fps);
        windowResized(p5);
        init({ p5, setNavigatorData, setScaleData });
    };

    const draw = (p5) => {
        p5.clear();
        navigatorDraw({ p5 });
        // if (
        //     document.getElementById("autopilot_checkbox").checked !==
        //     navRef.autopilot_data.active
        // ) {
        //     navRef.toggle_autopilot();
        // }
    };

    const mousePressed = (p5, event) => {
        if (isMember) return;
        navigatorMousePressed({ p5, setScaleData, event });
    };

    const mouseReleased = (p5, event) => {
        if (isMember) return;
        navigatorMouseReleased({ setNavigatorData, event });
    };

    const windowResized = (p5) => {
        const p = wrapperElm && wrapperElm.getBoundingClientRect();
        p5.resizeCanvas(p.width, p.height);
        // navRef.updateSizes(p5);
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
            mousePressed={mousePressed}
            mouseReleased={mouseReleased}
            // windowResized={windowResized}
        />
    );
}

Pfivesketch.note_names = [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "F#",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
];

Pfivesketch.fps = fps;

export default Pfivesketch;
