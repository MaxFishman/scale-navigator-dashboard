import React from "react";
const handleChange = () => {};
const Checkboxes = () => (
    <div
        id="vis_checkboxes"
        style={{ position: "absolute", zIndex: 1, left: 0, top: 0 }}
    >
        Diatonic
        <input
            type="checkbox"
            id="visu_inp_l_0"
            checked={true}
            onChange={handleChange}
        />
        <br></br>
        Acoustic
        <input
            type="checkbox"
            id="visu_inp_l_1"
            checked={true}
            onChange={handleChange}
        />
        <br></br>
        Harmonic Major
        <input
            type="checkbox"
            id="visu_inp_l_2"
            checked={true}
            onChange={handleChange}
        />
        <br></br>
        Harmonic Minor
        <input
            type="checkbox"
            id="visu_inp_l_3"
            checked={true}
            onChange={handleChange}
        />
        <br></br>
        Hexatonic
        <input
            type="checkbox"
            id="visu_inp_l_4"
            checked={true}
            onChange={handleChange}
        />
        <br></br>
        Octatonic
        <input
            type="checkbox"
            id="visu_inp_l_5"
            checked={true}
            onChange={handleChange}
        />
        <br></br>
        Whole Tone
        <input
            type="checkbox"
            id="visu_inp_l_6"
            checked={true}
            onChange={handleChange}
        />
        <br></br>
    </div>
);

export default Checkboxes;
