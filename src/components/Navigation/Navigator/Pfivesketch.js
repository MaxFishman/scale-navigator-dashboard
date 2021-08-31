import React, { useRef } from "react";
import Sketch from "react-p5";
import './../../../resources/Mulish/Mulish-Regular.ttf';

//pass in p5 in the draw func, and only where its needed.

const fps = 30;
var font;

function Pfivesketch({ nav }) {
    const preload = (p5) => {}

    const setup = (p5, canvasParentRef) => {
        var p = document.getElementById("canv_container").getBoundingClientRect();
        p5.createCanvas(p.width, Math.max(p.height, document.body.getBoundingClientRect().height / 2)).parent(canvasParentRef);
        p5.frameRate(fps);

        nav.init(p5);

        windowResized(p5);
    };

    const draw = (p5) => {
        p5.clear();
        nav.draw(p5);

        if (
            document.getElementById("autopilot_checkbox").checked !==
            nav.autopilot_data.active
        ) {
            nav.toggle_autopilot();
        }
    };

    const mousePressed = (p5) => {
        nav.mousePressed(p5);
    };

    const mouseReleased = (p5) => {
        nav.mouseReleased(p5);
    };

    const windowResized = (p5) => {
        var p = document.getElementById("canv_container").getBoundingClientRect();
        p5.resizeCanvas(p.width, Math.max(p.height, document.body.getBoundingClientRect().height / 2));
    };

    return (<
        Sketch setup = { setup }
        preload = { preload }
        draw = { draw }
        mousePressed = { mousePressed }
        mouseReleased = { mouseReleased }
        windowResized = { windowResized }
        navigator = { nav }
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
