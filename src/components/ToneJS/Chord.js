import React, { useEffect } from "react";
import * as Tone from "tone";

const midiToHz = (midiNote) => {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
};

function Chords({ scaleData, chordData, navigator }) {
  useEffect(() => {
    const { playing } = chordData;
    const synths = [];

    if (playing) {
      const chord = navigator.chord_chooser.current_chord;
      const notes = chord === null ? [] : chord.original_voicing;
      for (let note of notes) {
        const synth = new Tone.Synth({ volume: -20 }).toDestination();
        synth.triggerAttack(midiToHz(note), "8n");
        synths.push(synth);
      }
    }

    return () => {
      for (let synth of synths) {
        synth.triggerRelease();
      }
    };
  }, [scaleData, chordData, navigator]);

  return <></>;
}

export default Chords;
