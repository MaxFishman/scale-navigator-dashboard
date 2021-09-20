import React, { useLayoutEffect } from "react";
import { useLocation } from 'react-router-dom';
import Sketch from "react-p5";
import './../../../resources/Mulish/Mulish-Regular.ttf';

const fps = 30;

function Pfivesketch({ navRef, canvasWrapperRef }) {
    const location = useLocation();
    const wrapperElm = canvasWrapperRef.current;

    useLayoutEffect(() => {
        const p = wrapperElm && wrapperElm.getBoundingClientRect();
        window.scaleP5 && window.scaleP5.resizeCanvas(p.width, p.height);

    }, [location.pathname])

    const setup = (p5, canvasParentRef) => {
        const p = wrapperElm && wrapperElm.getBoundingClientRect();

        p5.createCanvas(p.width, Math.max(p.height, document.body.getBoundingClientRect().height / 2)).parent(canvasParentRef);
        p5.frameRate(fps);
        navRef.init(p5);
        windowResized(p5);
    };

    const draw = (p5) => {
        p5.clear();
        navRef.draw(p5);

        if (
            document.getElementById("autopilot_checkbox").checked !==
            navRef.autopilot_data.active
        ) {
            navRef.toggle_autopilot();
        }
    };

    const mousePressed = (p5, event) => {
        navRef.mousePressed(p5, event);
    };

    const mouseReleased = (p5, event) => {
        navRef.mouseReleased(p5, event);
    };

    const windowResized = (p5) => {
        const p = wrapperElm && wrapperElm.getBoundingClientRect();
        p5.resizeCanvas(p.width, p.height);
        navRef.updateSizes(p5);
    };

    const preload = (p5) => {
        window.scaleP5 = p5
    }

    return ( <
        Sketch preload = { preload }
        setup = { setup }
        draw = { draw }
        mousePressed = { mousePressed }
        mouseReleased = { mouseReleased }
        windowResized = { windowResized }
        navigator = { navRef }
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