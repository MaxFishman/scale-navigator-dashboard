import React, { useCallback, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import Sketch from "react-p5";
import {
    init,
    navigatorDraw,
    navigatorMousePressed,
    navigatorMouseReleased,
} from "./Navigator";
import useWindowSize from "hooks/device";
const fps = 30;

function Pfivesketch({ isMember = false, wrapperRef, isMobileAndNotHomePage }) {
    const dispatch = useDispatch();
    const size = useWindowSize();
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

    useLayoutEffect(() => {
        if (!window.scaleP5) return;

        const p = wrapperRef.current.getBoundingClientRect();
        const height = getCanvasHeight({ isMobileAndNotHomePage });

        window.scaleP5.resizeCanvas(p.width, height);
    }, [isMobileAndNotHomePage]);

    const getCanvasHeight = ({ isMobileAndNotHomePage }) => {
        let height = 500;

        if (isMobileAndNotHomePage) {
            // Fixed height for Mobile view only, and only for pages other than homepage.
            // couldnt set a dynamic height in here.
            height = size.height * 0.3;
        } else if (size.width < 576) {
            height = size.height * 0.6;
        } else {
            height = size.height * 0.8;
        }
        return height;
    };

    const preload = (p5) => {
        window.scaleP5 = p5;
    };

    const setup = (p5) => {
        const canvasHeight = getCanvasHeight({
            isMobileAndNotHomePage,
        });
        const p = wrapperRef.current.getBoundingClientRect();

        p5.frameRate(fps);
        p5.createCanvas(p.width, canvasHeight).parent(wrapperRef.current);
        init({ p5, setNavigatorData, setScaleData });
    };

    const draw = (p5) => {
        p5.clear();
        navigatorDraw({ p5 });
    };

    const mousePressed = (p5, event) => {
        if (isMember) return;
        navigatorMousePressed({ p5, setScaleData, event });
    };

    const mouseReleased = (p5, event) => {
        if (isMember) return;
        navigatorMouseReleased({ setScaleData, setNavigatorData, event });
    };

    const windowResized = (p5) => {
        resizeCanvas(p5);
    };

    const resizeCanvas = (p5) => {
        const wrapperDimensions = wrapperRef.current.getBoundingClientRect();
        const height = getCanvasHeight({ isMobileAndNotHomePage });

        p5.resizeCanvas(wrapperDimensions.width, height);
    };

    return (
        <Sketch
            preload={preload}
            setup={setup}
            draw={draw}
            mousePressed={mousePressed}
            mouseReleased={mouseReleased}
            windowResized={windowResized}
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
