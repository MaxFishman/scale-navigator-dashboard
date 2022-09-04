import React from "react";
import "./TriadCircle.scss";
import ChordData from "common/ChordData";
import classNames from "classnames";

const triad_spelling = {
    C: "C",
    Em: "Em",
    G: "G",
    Bm: "Bm",
    D: "D",
    "F#m": "G♭m",
    A: "A",
    "C#m": "D♭m",
    E: "E",
    "G#m": "A♭m",
    B: "B",
    "D#m": "E♭m",
    "F#": "G♭",
    "B♭m": "A#m",
    "D♭": "C#",
    Fm: "Fm",
    "A♭": "G#",
    Cm: "Cm",
    "E♭": "D#",
    Gm: "Gm",
    "B♭": "A#",
    Dm: "Dm",
    F: "F",
    Am: "Am",
};

export default function TriadCircle({ keyData }) {
    console.log("keydata: ", keyData);
    const radius = 850;
    const padding = 200;
    const polarToCart = (deg) => {
        const radians = deg * (Math.PI / 180);

        return {
            x: radius + padding / 2 + radius * Math.cos(radians),
            y: radius + padding / 2 + radius * Math.sin(radians),
        };
    };

    return (
        <svg
            viewBox={`0 0 ${radius * 2 + padding} ${radius * 2 + padding}`}
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            baseProfile="full"
            className="triadcircle"
        >
            <circle
                className="triadcircle__circle"
                cx={radius + padding / 2}
                cy={radius + padding / 2}
                r={radius}
            />
            {ChordData.map((chord, i) => {
                if (!keyData.chords.includes(chord)) {
                    chord = triad_spelling[chord];
                }
                const { x, y } = polarToCart(270 + i * (360 / 24));
                return (
                    <>
                        <circle
                            class={classNames("triadcircle__chord", {
                                "triadcircle__chord--off":
                                    !keyData.chords.includes(chord),
                            })}
                            cx={x}
                            cy={y}
                            r="100.0"
                        />
                        <text
                            class={classNames("triadcircle__chordtext", {
                                "triadcircle__chordtext--off":
                                    !keyData.chords.includes(chord),
                            })}
                            dy="0.3em"
                            x={x}
                            y={y}
                        >
                            {chord}
                        </text>
                    </>
                );
            })}
        </svg>
    );
}
