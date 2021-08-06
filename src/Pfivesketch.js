import React from 'react'
import Sketch from 'react-p5'

function Pfivesketch() {

  const fps = 30;
  const note_names = ["C", "D♭", "D", "E♭", "E", "F", "F#", "G", "A♭", "A", "B♭", "B"];

  var nav, tab;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 400).parent(canvasParentRef)
  }
  
  const draw = p5 => {
    p5.background(255, 130, 20)
    p5.ellipse(100, 100, 100)
    p5.ellipse(300, 100, 100)
  }
  
  return <Sketch setup={setup} draw={draw} />
}

export default Pfivesketch