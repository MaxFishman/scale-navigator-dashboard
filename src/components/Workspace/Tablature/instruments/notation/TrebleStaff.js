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

    const notes = keyData.pitch_classes.map((pc) => {
      console.log(PitchClassData[pc].vexflow);
      const vfNote = PitchClassData[pc].vexflow;
      let note = new VF.StaveNote({
        clef: "treble",
        keys: [vfNote + "/4"],
        duration: "q",
      });
      if (vfNote.length > 1) {
        note = note.addAccidental(0, new VF.Accidental(vfNote[1]));
      }
      return note;
    });

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
      while (staff.hasChildNodes()) {
        staff.removeChild(staff.lastChild);
      }
    };
  }, [keyData]);

  return <div id="treblestaff" class="treblestaff"></div>;
}
