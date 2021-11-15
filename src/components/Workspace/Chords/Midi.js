import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import ScaleData from "common/ScaleData";

const scaleclass_enum = ["acoustic", "diatonic", "harmonic_major", "harmonic_minor", "octatonic", "hexatonic", "whole_tone"];

function Midi() {
    const [featureEnabled, setFeatureEnabled] = useState(false);
    const [midiEnabled, setMidiEnabled] = useState(false);
    const [midiError, setMidiError] = useState(false);
    const [midiOutputPort, setMidiOutputPort] = useState("");
    const [midiOutputMap, setMidiOutputMap] = useState({});
    const [octave, setOctave] = useState(0);

    const { scaleData } = useSelector((state) => state.root);
    const { scale } = scaleData;

    useEffect(() => {
        const isChrome =
            !!window.chrome &&
            (!!window.chrome.webstore || !!window.chrome.runtime);

        const isMobile =
            /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
        setFeatureEnabled(isChrome && !isMobile);
    }, []);

    const midiInfoRef = useRef(null);

    const onMidiConnectSuccess = (midiInfo) => {
        const outputMap = {};
        midiInfoRef.current = midiInfo;
        for (let output of midiInfo.outputs.values()) {
            outputMap[output.id] = output;
        }

        setMidiOutputMap(outputMap);
        setMidiEnabled(true);
    };

    // Watch for output map changes to update the state change callback.
    useEffect(() => {
        if (midiInfoRef.current) {
            midiInfoRef.current.onstatechange = (e) => {
                // Use new object for useEffect comparison
                const newMap = {};
                for (let output of midiInfoRef.current.outputs.values()) {
                    newMap[output.id] = output;
                }

                const port = e.port;
                newMap[port.id] = port;
                setMidiOutputMap(newMap);
            };
        }
    }, [midiOutputMap]);

    useEffect(() => {
        const scaleData = ScaleData[scale];
        if (midiOutputPort) {
            midiOutputPort.send([146, scaleclass_enum.indexOf(scaleData.scale_class), 127]);
            // midiOutputPort.send([
            //     147,
            //     scaleData.pitch_classes[0] + octave,
            //     127,
            // ]);
            midiOutputPort.send([148, scaleData.root + octave, 127]);
            // sleep(20);
            for (let i = 0; i < scaleData.pitch_classes.length; i++) {
                midiOutputPort.send([
                    149,
                    scaleData.pitch_classes[i] + octave,
                    127,
                ]);
            }
            // sleep(20);
        }
        return () => {
            if (midiOutputPort) {
                midiOutputPort.send([146, scaleclass_enum.indexOf(scaleData.scale_class), 0]);
                // midiOutputPort.send([
                //     147,
                //     scaleData.pitch_classes[0] + octave,
                //     0,
                // ]);
                midiOutputPort.send([148, scaleData.root + octave, 0]);
                for (let i = 0; i < scaleData.pitch_classes.length; i++) {
                    midiOutputPort.send([
                        149,
                        scaleData.pitch_classes[i] + octave,
                        0,
                    ]);
                }
            }
        };
    }, [midiOutputPort, scale, octave]);

    if (featureEnabled) {
        return (
            <div id="midi_controls">
                {!midiEnabled && !midiError && (
                    <button
                        id="midi_enable"
                        onClick={() => {
                            navigator
                                .requestMIDIAccess()
                                .then(onMidiConnectSuccess, (errorCode) =>
                                    setMidiError(errorCode)
                                );
                        }}
                    >
                        Enable Midi Output
                    </button>
                )}
                {midiEnabled && (
                    <>
                        <h3>Midi Output:</h3>
                        <label>
                            Output Port
                            <select
                                value={midiOutputPort}
                                onChange={(e) =>
                                    setMidiOutputPort(
                                        midiOutputMap[e.target.value]
                                    )
                                }
                            >
                                {Object.values(midiOutputMap).map((port) => {
                                    return (
                                        <option key={port.id} value={port.id}>
                                            {port.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </label>
                        <div id="octave_controls">
                            <p>Octave</p>
                            <button
                                onClick={() => {
                                    octave > 0 && setOctave(octave - 12);
                                }}
                            >
                                -12
                            </button>
                            <button
                                onClick={() => {
                                    octave < 108 && setOctave(octave + 12);
                                }}
                            >
                                +12
                            </button>
                        </div>
                    </>
                )}
                {midiError && <p>Midi Connection Error: {midiError}</p>}
            </div>
        );
    }

    return <></>;
}

export default Midi;

