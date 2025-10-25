import { useDispatch } from "react-redux";
import React, { useCallback } from "react";
import OutputTypes from "./OutputTypes";

function MidiOutputSettings({
    index,
    octave,
    outputPortId,
    type,
    channel,
    midiOutputMap,
}) {
    const dispatch = useDispatch();

    const _modifyMidiData = useCallback(
        (payload) => dispatch({ type: "MODIFY_MIDI_OUTPUT", payload }),
        [dispatch]
    );
    const _removeMidiOutput = useCallback(
        (payload) => dispatch({ type: "REMOVE_MIDI_OUTPUT", payload }),
        [dispatch]
    );

    return (
        <>
            {index ? <hr></hr> : <></>}
            <li id="midi_output">
                <label>
                    Type
                    <select
                        value={type}
                        onChange={(e) => {
                            _modifyMidiData({
                                index,
                                data: {
                                    type: e.target.value,
                                },
                            });
                        }}
                    >
                        {Object.values(OutputTypes).map((type, i) => {
                            return (
                                <option key={i} value={type.index}>
                                    {type.name}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <label>
                    Port
                    <select
                        value={outputPortId}
                        onChange={(e) => {
                            _modifyMidiData({
                                index,
                                data: {
                                    outputPortId: e.target.value,
                                },
                            });
                        }}
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
                <label>
                    Channel
                    <select
                        value={channel}
                        onChange={(e) => {
                            _modifyMidiData({
                                index,
                                data: {
                                    channel: e.target.value,
                                },
                            });
                        }}
                    >
                        {[...Array(16).keys()].map((channel) => {
                            return (
                                <option key={channel} value={channel}>
                                    {channel}
                                </option>
                            );
                        })}
                    </select>
                </label>
                <div id="octave_controls">
                    <p>Octave</p>
                    <div>
                        <button
                            onClick={() => {
                                octave > 0 &&
                                    _modifyMidiData({
                                        index,
                                        octave: octave - 12,
                                    });
                            }}
                        >
                            -
                        </button>
                        <button
                            onClick={() => {
                                octave < 108 &&
                                    _modifyMidiData({
                                        index,
                                        octave: octave + 12,
                                    });
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => {
                        _removeMidiOutput(index);
                    }}
                >
                    Remove
                </button>
            </li>
        </>
    );
}

export default MidiOutputSettings;
