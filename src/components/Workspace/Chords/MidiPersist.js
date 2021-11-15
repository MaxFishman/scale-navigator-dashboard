import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import ScaleData from "common/ScaleData";
import OutputTypes from "./OutputTypes";

/**
 * This function actually sends the midi.
 *
 * It's a separate component so it can be persisteted in the top level of the App
 */
function MidiPersist() {
    const { midiData, midiOutputs, scaleData } = useSelector(
        (state) => state.root
    );
    const { scale } = scaleData;

    useEffect(() => {
        const scaleData = ScaleData[scale];

        midiOutputs.forEach((output) => {
            if (output.outputPortId) {
                const midiOutputPort =
                    midiData.midiOutputMap[output.outputPortId];
                switch (output.type) {
                    case OutputTypes.current_chord_root.index:
                        // TODO send chord root MIDI
                        break;
                    case OutputTypes.current_scale_pitch_class.index:
                    default:
                        // TODO send pitch class MIDI
                        break;
                }
                midiOutputPort.send([146, scaleData.video_index - 1, 127]);
                midiOutputPort.send([
                    147,
                    scaleData.pitch_classes[0] + output.octave,
                    127,
                ]);
                midiOutputPort.send([148, scaleData.root + output.octave, 127]);
                midiOutputPort.send([150, 127, 127]);
                // sleep(20);
                for (let i = 0; i < scaleData.pitch_classes.length; i++) {
                    midiOutputPort.send([
                        149,
                        scaleData.pitch_classes[i] + output.octave,
                        127,
                    ]);
                }
                // sleep(20);
                midiOutputPort.send([150, 0, 127]);
            }
        });
        return () => {
            midiOutputs.forEach((output) => {
                if (output.outputPortId) {
                    const midiOutputPort =
                        midiData.midiOutputMap[output.outputPortId];
                    switch (output.type) {
                        case OutputTypes.current_chord_root.index:
                            // TODO turn off chord root MIDI
                            break;
                        case OutputTypes.current_scale_pitch_class.index:
                        default:
                            // TODO turn off pitch class MIDI
                            break;
                    }
                    midiOutputPort.send([146, scaleData.video_index - 1, 0]);
                    midiOutputPort.send([
                        147,
                        scaleData.pitch_classes[0] + output.octave,
                        0,
                    ]);
                    midiOutputPort.send([
                        148,
                        scaleData.root + output.octave,
                        0,
                    ]);
                    for (let i = 0; i < scaleData.pitch_classes.length; i++) {
                        midiOutputPort.send([
                            149,
                            scaleData.pitch_classes[i] + output.octave,
                            0,
                        ]);
                    }
                    midiOutputPort.send([150, 127, 0]);
                    midiOutputPort.send([150, 0, 0]);
                }
            });
        };
    }, [midiOutputs, midiData.midiOutputMap, scale]);

    return <></>;
}

export default MidiPersist;
