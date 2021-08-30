import { ChordContext } from "components/Context/ChordContext";
import { ScaleContext } from "components/Context/ScaleContext";
import React, { useContext, useEffect, useRef } from "react";
import * as Tone from "tone";
import ChordChooser from "./ChordChooser";

const midiToHz = (midiNote) => {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
};

function Chords() {
  const { chordData, setChordData } = useContext(ChordContext);
  const { scaleData } = useContext(ScaleContext);
  const { scale, scaleIndex } = scaleData;

  const chordChooserRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    chordChooserRef.current = new ChordChooser(
      chordData,
      setChordData,
      scaleData.scale
    );
    synthRef.current = new Tone.PolySynth({ volume: -20 }).toDestination();
  }, []);

  useEffect(() => {
    chordChooserRef.current.setChordDataContext(chordData, setChordData);
  }, [chordData, setChordData]);

  useEffect(() => {
    chordChooserRef.current.tick(scale);
  }, [scale, scaleIndex]);

  useEffect(() => {
    const { playing, chord, previousChord } = chordData;

    const isNewChord =
      !previousChord ||
      previousChord.root !== chord.root ||
      previousChord.chord_type !== chord.chord_type;

    const notes = chord === null ? [] : chord.original_voicing.map(midiToHz);
    if (playing && isNewChord) {
      synthRef.current.triggerAttack(notes);
    }

    return () => {
      synthRef.current.triggerRelease(notes);
    };
  }, [chordData]);

  return <></>;
}

export default Chords;
