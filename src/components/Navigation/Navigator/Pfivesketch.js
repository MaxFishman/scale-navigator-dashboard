import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Sketch from "react-p5";
import {
    init,
    navigatorDraw,
    navigatorMousePressed,
    navigatorMouseReleased,
} from "./Navigator";

const fps = 30;


function Pfivesketch({ isMember = false, wrapperRef }) {
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

    const setup = (p5) => {
        const p = wrapperRef.current.getBoundingClientRect();

        p5.createCanvas(
            p.width,
            Math.max(p.height, document.body.getBoundingClientRect().height / 2)
        ).parent(wrapperRef.current);


        p5.frameRate(fps);
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

    return (
        <Sketch
            setup={setup}
            draw={draw}
            mousePressed={mousePressed}
            mouseReleased={mouseReleased}
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
