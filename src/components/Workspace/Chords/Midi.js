import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useCallback } from "react";
import MidiOutputSettings from "./MidiOutputSettings";
import OutputTypes from "./OutputTypes";

function Midi() {
    const dispatch = useDispatch();
    const { midiData, midiOutputs } = useSelector((state) => state.root);

    const _addMidiOutput = useCallback(
        (payload) => dispatch({ type: "ADD_MIDI_OUTPUT", payload }),
        [dispatch]
    );
    const _setMidiData = useCallback(
        (payload) => dispatch({ type: "SET_MIDI_DATA", payload }),
        [dispatch]
    );

    useEffect(() => {
        const isChrome = window.navigator.userAgent.match("Chrome");

        const isMobile =
            /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
        _setMidiData({
            featureEnabled: isChrome && !isMobile,
        });
    }, [_setMidiData]);

    const onMidiConnectSuccess = (midiInfo) => {
        const outputMap = {};
        for (let output of midiInfo.outputs.values()) {
            outputMap[output.id] = output;
        }

        midiInfo.onstatechange = () => {
            // Use new object for useEffect comparison
            const newMap = {};
            for (let output of midiInfo.outputs.values()) {
                newMap[output.id] = output;
            }

            _setMidiData({
                midiOutputMap: newMap,
            });
        };

        _setMidiData({
            midiOutputMap: outputMap,
            midiEnabled: true,
            midiInfo,
        });
    };

    if (midiData.featureEnabled) {
        return (
            <div id="midi_controls">
                {!midiData.midiEnabled && !midiData.midiError && (
                    <button
                        id="midi_enable"
                        onClick={() => {
                            navigator
                                .requestMIDIAccess()
                                .then(onMidiConnectSuccess, (errorCode) =>
                                    _setMidiData({
                                        midiError: errorCode,
                                    })
                                );
                        }}
                    >
                        Enable Midi Output
                    </button>
                )}
                {midiData.midiEnabled && (
                    <>
                        <h3>Midi Outputs:</h3>
                        <ul id="midi_outputs">
                            {midiOutputs.map((output, i) => {
                                return (
                                    <MidiOutputSettings
                                        key={i}
                                        index={i}
                                        type={output.type}
                                        channel={output.channel}
                                        outputPortId={output.outputPortId}
                                        octave={output.octave}
                                        midiOutputMap={midiData.midiOutputMap}
                                    ></MidiOutputSettings>
                                );
                            })}
                        </ul>
                        <button
                            id="midi_add_output"
                            onClick={() =>
                                _addMidiOutput({
                                    octave: 0,
                                    channel: 0,
                                    type: OutputTypes.current_scale_pitch_class
                                        .index,
                                    outputPortId: "",
                                })
                            }
                        >
                            Add Output
                        </button>
                    </>
                )}
                {midiData.midiError && (
                    <p>Midi Connection Error: {midiData.midiError}</p>
                )}
            </div>
        );
    }

    return <></>;
}

export default Midi;
