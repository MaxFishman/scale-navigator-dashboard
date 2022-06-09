import React, { useEffect } from "react";
import PitchClassData from "common/PitchClassData";
import Vex from "vexflow";

export default function Alto({ keyData }) {
  useEffect(() => {
    const VF = Vex.Flow;

    const renderer = new VF.Renderer(
      document.getElementById("altostaff"),
      VF.Renderer.Backends.SVG
    );

    var stave_width;

    console.log("staffwide ", window.innerWidth);

    if (window.innerWidth <= 600){
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
    stave.addClef("alto");
    stave.setContext(context);

    var notes = [];
    const convert_inflection = {"s": "#", "ss": "##", "f": "b", "ff": "bb", "": "n"}
    const convert_octavation = {"''": "/6", "'": "/5", "": "/4" };

    keyData.spelling.forEach(function(element) {
      var re_lilypond_note = /^([a-g])(s|ss|f|ff|)('|''|)$/
      //match returns an array pf what it matched: whats the note, acidental and octave??
      //pass gi2567756bg3h45g : match_obj will be NULL
      var match_obj = element.match(re_lilypond_note);

      if (match_obj === null) {
        return [];

      }

      var base_note_name = match_obj[1];
      var inflection = match_obj[2];
      var octavation = match_obj[3];

      if (inflection == ""){
        notes.push(new VF.StaveNote({clef: "alto", keys: [base_note_name + convert_octavation[octavation]], duration: "q" }))
      }
      else {
        notes.push(new VF.StaveNote({clef: "alto", keys: [base_note_name + convert_octavation[octavation]], duration: "q" }).
        addAccidental(0, new VF.Accidental(convert_inflection[inflection])));
      }  
    });
    console.log("notes: ",notes);


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
      const staff = document.getElementById("altostaff");
      while (staff && staff.hasChildNodes()) {
        staff.removeChild(staff.lastChild);
      }
    };
  }, [keyData]);

  return <div id="altostaff" class="altostaff"></div>;
}
