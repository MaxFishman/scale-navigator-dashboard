import React from 'react'
import Sketch from 'react-p5'

//pass in p5 in the draw func, and only where its needed. 

// import Polygon from './Polygon'
// import Helper from './Helper'

function Pfivesketch() {

    this.fps = 30;
    this.note_names = ["C", "D♭", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];

    this.nav;
    this.tab;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 400).parent(canvasParentRef)
        p5.frameRate(this.fps)

        this.nav = new Navigator();
        this.tab = new Tab
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