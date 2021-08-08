import React from 'react'
import Sketch from 'react-p5'

//pass in p5 in the draw func, and only where its needed. 

import TablatureManager from './Tablature';
import Navigator from './Navigator';

const fps = 30

function Pfivesketch() {
    var nav = undefined;
    var tab = undefined;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 500).parent(canvasParentRef)
        p5.frameRate(fps)

        nav = new Navigator.Navigator(p5);
        nav.init();

        tab = new TablatureManager()

        document.addEventListener("scaleChanged", (e) => {
            try {
                tab.setScale(e.detail)
            } catch (error) {
                console.log("SETTING SCALE FAILED", e, error)
            }
        })
    }

    const draw = (p5) => {
        p5.background(255);
        nav.draw()
    }

    const mousePressed = () => {
        nav.mousePressed();
    }

    const mouseReleased = () => {
        nav.mouseReleased();
    }

    return <Sketch setup = { setup }
    draw = { draw }
    mousePressed = { mousePressed }
    mouseReleased = { mouseReleased }
    />
}

Pfivesketch.note_names = ["C", "D♭", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
Pfivesketch.fps = fps;

export default Pfivesketch