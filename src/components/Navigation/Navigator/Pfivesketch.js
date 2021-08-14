import React from 'react'
import Sketch from 'react-p5'

//pass in p5 in the draw func, and only where its needed. 

import TablatureManager from '../../Workspace/Tablature/Tablature';
import Navigator from './Navigator';

const fps = 30

function Pfivesketch() {
    var nav = new Navigator.Navigator();
    var tab = undefined;

    const setup = (p5, canvasParentRef) => {
        var canv = p5.createCanvas(500, 500).parent(canvasParentRef)
        canv.elt.style.width = "100%"
        canv.elt.style.height = "100%"

        p5.frameRate(fps)

        nav.init(p5);

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
        nav.draw(p5)
    }

    const mousePressed = (p5) => {
        nav.mousePressed(p5);
    }

    const mouseReleased = (p5) => {
        nav.mouseReleased(p5);
    }

    return <Sketch setup = { setup }
    draw = { draw }
    mousePressed = { mousePressed }
    mouseReleased = { mouseReleased }
    navigator = { nav }
    />
}

Pfivesketch.note_names = ["C", "D♭", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];
Pfivesketch.fps = fps;

export default Pfivesketch
