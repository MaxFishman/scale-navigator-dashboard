import React from "react";

const Checkboxes = () => (
    <div
        id="vis_checkboxes"
        style={{ position: "absolute", zIndex: 1, left: 0, top: 0 }}
    >
        Diatonic
        <input type="checkbox" id="visu_inp_l_0" checked></input>
        <br></br>
        Acoustic
        <input type="checkbox" id="visu_inp_l_1" checked></input>
        <br></br>
        Harmonic Major
        <input type="checkbox" id="visu_inp_l_2" checked></input>
        <br></br>
        Harmonic Minor
        <input type="checkbox" id="visu_inp_l_3" checked></input>
        <br></br>
        Hexatonic
        <input type="checkbox" id="visu_inp_l_4" checked></input>
        <br></br>
        Octatonic
        <input type="checkbox" id="visu_inp_l_5" checked></input>
        <br></br>
        Whole Tone
        <input type="checkbox" id="visu_inp_l_6" checked></input>
        <br></br>
    </div>
);

export default Checkboxes;
