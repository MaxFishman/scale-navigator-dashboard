import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useRef } from "react";
import * as Tone from "tone";
import ChordChooser from "./ChordChooser";

const midiToHz = (midiNote) => {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
};

function Chords() {
    const dispatch = useDispatch();
    const { chordData, scaleData } = useSelector((state) => state.root);

    const { scale, scaleIndex } = scaleData;

    const _setChordData = useCallback(
        (payload) => dispatch({ type: "SET_CHORD_DATA", payload }),
        [dispatch]
    );

    const chordChooserRef = useRef(null);
    const synthRef = useRef(null);

    if (chordChooserRef.current == null) {
        chordChooserRef.current = new ChordChooser(
            chordData,
            _setChordData,
            scale
        );
    }

    if (synthRef.current == null) {
        synthRef.current = new Tone.PolySynth({ volume: -20 }).toDestination();
    }

    useEffect(() => {
        chordChooserRef.current.setChordDataContext(chordData, _setChordData);
    }, [chordData, _setChordData]);

    useEffect(() => {
        chordChooserRef.current.tick(scale);
    }, [scale, scaleIndex]);

    useEffect(() => {
        const { playing, chord, previousChord } = chordData;

        const isNewChord =
            !previousChord ||
            previousChord.root !== chord.root ||
            previousChord.chord_type !== chord.chord_type;

        const notes =
            chord === null ? [] : chord.original_voicing.map(midiToHz);

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
