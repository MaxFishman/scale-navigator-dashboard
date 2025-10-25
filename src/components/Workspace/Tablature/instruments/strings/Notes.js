import React from "react";
import classNames from "classnames";
import { FRET_POS } from "./BoardData";
import PitchClassData from "common/PitchClassData";

function Note({ children, className, note, x, y }) {
    return (
        <>
            <circle cx={x} cy={y} r="20" className={className} />
            <text dy="0.3em" x={x} y={y} className={note || ""}>
                {children}
            </text>
        </>
    );
}

export default function Notes({ markers, noteMappings, keyData, openFn }) {
    const defaultIsOpen = (x) => x === FRET_POS[0];
    const isOpen = openFn || defaultIsOpen;
    return (
        <>
            {markers.map((marker, i) => {
                return (
                    <Note
                        key={i}
                        x={marker.location.x}
                        y={marker.location.y}
                        className="strings__note strings__note--marker"
                    >
                        {marker.fret}
                    </Note>
                );
            })}
            {noteMappings.map((pc, i) => {
                const pitchClass = i;
                const pitchClassData = PitchClassData[pitchClass];
                return (
                    <>
                        {pc.locations.map((l, i) => {
                            return (
                                <Note
                                    key={i}
                                    note={pitchClassData.note}
                                    x={l.x}
                                    y={l.y}
                                    className={classNames(
                                        pitchClassData.note,
                                        "strings__note",
                                        {
                                            "strings__note--open": isOpen(
                                                l.x,
                                                l.y
                                            ),
                                            "strings__note--fingered": !isOpen(
                                                l.x,
                                                l.y
                                            ),
                                            "strings__note--off":
                                                !keyData.pitch_classes.includes(
                                                    pitchClass
                                                ),
                                        }
                                    )}
                                >
                                    {pitchClassData.note}
                                </Note>
                            );
                        })}
                    </>
                );
            })}
        </>
    );
}
