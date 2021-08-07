import React from 'react'
import Sketch from 'react-p5'

//pass in p5 in the draw func, and only where its needed. 

import TablatureManager from './Tablature';
import Navigator from './Navigator';
// import Polygon from './Polygon'
// import Helper from './Helper'

function Pfivesketch() {

    var fps = 30;
    var note_names = ["C", "D♭", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];

    var nav = undefined;
    var tab = undefined;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 400).parent(canvasParentRef)
        p5.frameRate(fps)

        nav = new Navigator();
        tab = new TablatureManager();
    }

    const draw = p5 => {
        p5.background(255, 130, 20)
        p5.ellipse(100, 100, 100)
        p5.ellipse(300, 100, 100)
    }

    return <Sketch setup = { setup }
    draw = { draw }
    />
}

export default Pfivesketch