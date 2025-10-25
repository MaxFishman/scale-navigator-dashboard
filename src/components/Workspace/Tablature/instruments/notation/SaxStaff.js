import React, { useEffect } from "react";
import ScaleData from "common/ScaleData";
import Vex from "vexflow";

function transposeScale(object, value, transposition) {
    let old_scale =
        ScaleData[Object.keys(object).find((key) => object[key] === value)];

    let modulus = 12;

    if (old_scale.scale_class == "octatonic") {
        modulus = 3;
    } else if (old_scale.scale_class == "hexatonic") {
        modulus = 4;
    } else if (old_scale.scale_class == "whole_tone") {
        modulus = 2;
    } else {
        modulus = 12;
    }

    for (const [key, value] of Object.entries(ScaleData)) {
        console.log({ value });
        if (
            old_scale.scale_class == ScaleData[key].scale_class &&
            (old_scale.root + transposition) % modulus ==
                ScaleData[key].root % modulus
        ) {
            console.log(old_scale, key);
            return key;
        }
    }
}

export default function Sax({ keyData }) {
    useEffect(() => {
        keyData = ScaleData[transposeScale(ScaleData, keyData, 9)];

        const VF = Vex.Flow;

        const renderer = new VF.Renderer(
            document.getElementById("saxstaff"),
            VF.Renderer.Backends.SVG
        );

        var stave_width;

        if (window.innerWidth <= 600) {
            stave_width = 350;
        } else if (window.innerWidth <= 960 && window.innerWidth > 600) {
            stave_width = 400;
        } else if (window.innerWidth <= 1280 && window.innerWidth > 960) {
            stave_width = 500;
        } else if (window.innerWidth > 1280) {
            stave_width = 600;
        }

        renderer.resize(stave_width, 100);

        var context = renderer.getContext();
        context.setFont("Arial", 10, "");

        var stave = new VF.Stave(0, 0, stave_width);
        stave.addClef("treble");
        stave.setContext(context);

        var notes = [];
        const convert_inflection = {
            s: "#",
            ss: "##",
            f: "b",
            ff: "bb",
            "": "n",
        };
        const convert_octavation = { "''": "/6", "'": "/5", "": "/4" };

        keyData.spelling.forEach(function (element) {
            var re_lilypond_note = /^([a-g])(s|ss|f|ff|)('|''|)$/;
            //match returns an array pf what it matched: whats the note, acidental and octave??
            //pass gi2567756bg3h45g : match_obj will be NULL
            var match_obj = element.match(re_lilypond_note);

            if (match_obj === null) {
                return [];
            }

            var base_note_name = match_obj[1];
            var inflection = match_obj[2];
            var octavation = match_obj[3];

            if (inflection == "") {
                notes.push(
                    new VF.StaveNote({
                        clef: "treble",
                        keys: [base_note_name + convert_octavation[octavation]],
                        duration: "q",
                        stem_direction: Vex.Flow.StaveNote.STEM_UP,
                    })
                );
            } else {
                notes.push(
                    new VF.StaveNote({
                        clef: "treble",
                        keys: [base_note_name + convert_octavation[octavation]],
                        duration: "q",
                        stem_direction: Vex.Flow.StaveNote.STEM_UP,
                    }).addAccidental(
                        0,
                        new VF.Accidental(convert_inflection[inflection])
                    )
                );
            }
        });
        //console.log("notes: ",notes);

        const voice = new VF.Voice({
            num_beats: keyData.pitch_classes.length,
            beat_value: 4,
        });
        voice.addTickables(notes);
        new VF.Formatter().joinVoices([voice]).format([voice], stave_width);

        // const group = context.openGroup();
        stave.draw();
        voice.draw(context, stave);
        // context.closeGroup();

        // And when you want to delete it, do this:
        // context.svg.removeChild(group);

        return () => {
            const staff = document.getElementById("saxstaff");
            while (staff && staff.hasChildNodes()) {
                staff.removeChild(staff.lastChild);
            }
        };
    }, [keyData]);

    return (
        <div id="saxstaff" className="saxstaff">
            {" "}
        </div>
    );
}
