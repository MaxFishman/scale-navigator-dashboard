import React from 'react'
import Sketch from 'react-p5'

//pass in p5 in the draw func, and only where its needed. 

import TablatureManager from './Tablature';
import Navigator from './Navigator';

function Pfivesketch() {
    var fps = 30;
    var nav = undefined;
    var tab = new TablatureManager();

    const setup = (p5, canvasParentRef) => {
        nav = new Navigator.Navigator(p5);
        p5.createCanvas(500, 400).parent(canvasParentRef)
        p5.frameRate(fps)
    }

    const draw = (p5) => {
        console.log("XD", nav, tab)
        p5.background(255);
        nav.draw()
    }

    return <Sketch setup = { setup }
    draw = { draw }
    />
}

Pfivesketch.note_names = ["C", "D♭", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];

export default Pfivesketch