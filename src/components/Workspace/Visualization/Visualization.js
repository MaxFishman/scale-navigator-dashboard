import React, { useContext, useEffect, useRef } from "react";
import Sketch from "react-p5";

const Visualization = () => {
    const fps = 30;
    var ran_setup = false;
    var canvasParentRef = document.getElementById("canv_container_visu");
    var cnv;

    const setup = (p5) => {
        if (canvasParentRef == null) canvasParentRef = document.getElementById("canv_container_visu");
        if (canvasParentRef) {
            const p = canvasParentRef.getBoundingClientRect();

            console.log(canvasParentRef)
            cnv = p5.createCanvas(p.width * 0.9, p.height * 0.9).parent(canvasParentRef);
            p5.frameRate(fps);
            windowResized(p5);

            ran_setup = true;
        }
    };

    const draw = (p5) => {
        if (!ran_setup) setup(p5);
        else {
            cnv.parent(canvasParentRef)
            p5.background(255)
            console.log("visu draw")
        }
    };

    const mousePressed = (p5, event) => {};

    const mouseReleased = (p5, event) => {};

    const windowResized = (p5) => {
        if (canvasParentRef) {
            const p = canvasParentRef.getBoundingClientRect();
            p5.resizeCanvas(p.width * 0.9, p.height * 0.9);
        }
    };

    const preload = (p5) => {}


    return ( <
        Sketch preload = { preload }
        setup = { setup }
        draw = { draw }
        mousePressed = { mousePressed }
        mouseReleased = { mouseReleased }
        windowResized = { windowResized }
        />
    );
};

export default Visualization;