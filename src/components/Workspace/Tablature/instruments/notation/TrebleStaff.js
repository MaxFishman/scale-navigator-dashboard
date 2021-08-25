import React, { useEffect } from "react";
import PitchClassData from "common/PitchClassData";
import Vex from "vexflow";

export default function Treble({ keyData }) {
  useEffect(() => {
    const VF = Vex.Flow;

    const renderer = new VF.Renderer(
      document.getElementById("treblestaff"),
      VF.Renderer.Backends.SVG
    );
    renderer.resize(600, 100);

    var context = renderer.getContext();
    context.setFont("Arial", 10, "");

    var stave = new VF.Stave(0, 0, 600);
    stave.addClef("treble");
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
        notes.push(new VF.StaveNote({clef: "treble", keys: [base_note_name + convert_octavation[octavation]], duration: "q" }))
      }
      else {
        notes.push(new VF.StaveNote({clef: "treble", keys: [base_note_name + convert_octavation[octavation]], duration: "q" }).
        addAccidental(0, new VF.Accidental(convert_inflection[inflection])));
      }  
    });
    console.log("notes: ",notes);


    const voice = new VF.Voice({
      num_beats: keyData.pitch_classes.length,
      beat_value: 4,
    });
    voice.addTickables(notes);
    new VF.Formatter().joinVoices([voice]).format([voice], 600);

    // const group = context.openGroup();
    stave.draw();
    voice.draw(context, stave);
    // context.closeGroup();

    // And when you want to delete it, do this:
    // context.svg.removeChild(group);

    return () => {
      const staff = document.getElementById("treblestaff");
      while (staff && staff.hasChildNodes()) {
        staff.removeChild(staff.lastChild);
      }
    };
  }, [keyData]);

  return <div id="treblestaff" class="treblestaff"></div>;
}
