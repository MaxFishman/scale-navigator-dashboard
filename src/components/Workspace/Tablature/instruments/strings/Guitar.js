import React from "react";
import "./Strings.scss";
import { FRETS, FRET_POS, STRINGS, STRING_POS } from "./BoardData";
import Note from "./Note";
import classNames from "classnames";
import { ScaleContext } from "../../../../Context/ScaleContext";

const pitchClassMapping = [
  {
    note: "C",
    sharp: "C",
    flat: "C",
    locations: [
      { x: FRET_POS[8], y: STRING_POS[1] },
      { x: FRET_POS[1], y: STRING_POS[2] },
      { x: FRET_POS[5], y: STRING_POS[3] },
      { x: FRET_POS[10], y: STRING_POS[4] },
      { x: FRET_POS[3], y: STRING_POS[5] },
      { x: FRET_POS[8], y: STRING_POS[6] },
    ],
  },
  {
    note: "C#",
    sharp: "C#",
    flat: "D♭",
    locations: [
      { x: FRET_POS[9], y: STRING_POS[1] },
      { x: FRET_POS[2], y: STRING_POS[2] },
      { x: FRET_POS[6], y: STRING_POS[3] },
      { x: FRET_POS[11], y: STRING_POS[4] },
      { x: FRET_POS[4], y: STRING_POS[5] },
      { x: FRET_POS[9], y: STRING_POS[6] },
    ],
  },
  {
    note: "D",
    sharp: "D",
    flat: "D",
    locations: [
      { x: FRET_POS[10], y: STRING_POS[1] },
      { x: FRET_POS[3], y: STRING_POS[2] },
      { x: FRET_POS[7], y: STRING_POS[3] },
      { x: FRET_POS[12], y: STRING_POS[4] },
      { x: FRET_POS[0], y: STRING_POS[4] },
      { x: FRET_POS[5], y: STRING_POS[5] },
      { x: FRET_POS[10], y: STRING_POS[6] },
    ],
  },
  {
    note: "E♭",
    sharp: "D#",
    flat: "E♭",
    locations: [
      { x: FRET_POS[11], y: STRING_POS[1] },
      { x: FRET_POS[4], y: STRING_POS[2] },
      { x: FRET_POS[8], y: STRING_POS[3] },
      { x: FRET_POS[1], y: STRING_POS[4] },
      { x: FRET_POS[6], y: STRING_POS[5] },
      { x: FRET_POS[11], y: STRING_POS[6] },
    ],
  },
  {
    note: "E",
    sharp: "E",
    flat: "E",
    locations: [
      { x: FRET_POS[12], y: STRING_POS[1] },
      { x: FRET_POS[0], y: STRING_POS[1] },
      { x: FRET_POS[5], y: STRING_POS[2] },
      { x: FRET_POS[9], y: STRING_POS[3] },
      { x: FRET_POS[2], y: STRING_POS[4] },
      { x: FRET_POS[7], y: STRING_POS[5] },
      { x: FRET_POS[12], y: STRING_POS[6] },
      { x: FRET_POS[0], y: STRING_POS[6] },
    ],
  },
  {
    note: "F",
    sharp: "F",
    flat: "F",
    locations: [
      { x: FRET_POS[1], y: STRING_POS[1] },
      { x: FRET_POS[6], y: STRING_POS[2] },
      { x: FRET_POS[10], y: STRING_POS[3] },
      { x: FRET_POS[3], y: STRING_POS[4] },
      { x: FRET_POS[8], y: STRING_POS[5] },
      { x: FRET_POS[1], y: STRING_POS[6] },
    ],
  },
  {
    note: "F#",
    sharp: "F#",
    flat: "G♭",
    locations: [
      { x: FRET_POS[2], y: STRING_POS[1] },
      { x: FRET_POS[7], y: STRING_POS[2] },
      { x: FRET_POS[11], y: STRING_POS[3] },
      { x: FRET_POS[4], y: STRING_POS[4] },
      { x: FRET_POS[9], y: STRING_POS[5] },
      { x: FRET_POS[2], y: STRING_POS[6] },
    ],
  },
  {
    note: "G",
    sharp: "G",
    flat: "G",
    locations: [
      { x: FRET_POS[3], y: STRING_POS[1] },
      { x: FRET_POS[8], y: STRING_POS[2] },
      { x: FRET_POS[12], y: STRING_POS[3] },
      { x: FRET_POS[0], y: STRING_POS[3] },
      { x: FRET_POS[5], y: STRING_POS[4] },
      { x: FRET_POS[10], y: STRING_POS[5] },
      { x: FRET_POS[3], y: STRING_POS[6] },
    ],
  },
  {
    note: "A♭",
    sharp: "G#",
    flat: "A♭",
    locations: [
      { x: FRET_POS[4], y: STRING_POS[1] },
      { x: FRET_POS[9], y: STRING_POS[2] },
      { x: FRET_POS[1], y: STRING_POS[3] },
      { x: FRET_POS[6], y: STRING_POS[4] },
      { x: FRET_POS[11], y: STRING_POS[5] },
      { x: FRET_POS[4], y: STRING_POS[6] },
    ],
  },
  {
    note: "A",
    sharp: "A",
    flat: "A",
    locations: [
      { x: FRET_POS[5], y: STRING_POS[1] },
      { x: FRET_POS[10], y: STRING_POS[2] },
      { x: FRET_POS[2], y: STRING_POS[3] },
      { x: FRET_POS[7], y: STRING_POS[4] },
      { x: FRET_POS[12], y: STRING_POS[5] },
      { x: FRET_POS[0], y: STRING_POS[5] },
      { x: FRET_POS[5], y: STRING_POS[6] },
    ],
  },
  {
    note: "B♭",
    sharp: "A#",
    flat: "B♭",
    locations: [
      { x: FRET_POS[6], y: STRING_POS[1] },
      { x: FRET_POS[11], y: STRING_POS[2] },
      { x: FRET_POS[3], y: STRING_POS[3] },
      { x: FRET_POS[8], y: STRING_POS[4] },
      { x: FRET_POS[1], y: STRING_POS[5] },
      { x: FRET_POS[6], y: STRING_POS[6] },
    ],
  },
  {
    note: "B",
    sharp: "B",
    flat: "B",
    locations: [
      { x: FRET_POS[7], y: STRING_POS[1] },
      { x: FRET_POS[12], y: STRING_POS[2] },
      { x: FRET_POS[0], y: STRING_POS[2] },
      { x: FRET_POS[4], y: STRING_POS[3] },
      { x: FRET_POS[9], y: STRING_POS[4] },
      { x: FRET_POS[2], y: STRING_POS[5] },
      { x: FRET_POS[7], y: STRING_POS[6] },
    ],
  },
];

const markers = [
  {
    fret: 3,
    location: { x: 255, y: 185 },
  },
  {
    fret: 5,
    location: { x: 395, y: 185 },
  },
  {
    fret: 7,
    location: { x: 535, y: 185 },
  },
  {
    fret: 9,
    location: { x: 675, y: 185 },
  },
  {
    fret: 12,
    location: { x: 885, y: 135 },
  },
  {
    fret: 12,
    location: { x: 885, y: 235 },
  },
];

export default function Guitar({ keyData }) {
  return (
    <div id="guitar_container" style={{ position: "relative" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        baseProfile="full"
        width="100%"
        viewBox="0 0 980 332"
      >
        {FRETS.map((fret, i) => {
          return (
            <line
              className={`strings__fret${i === 0 ? " strings__fret--nut" : ""}`}
              x1={fret.start.x}
              y1={fret.start.y}
              x2={fret.end.x}
              y2={fret.end.y}
            />
          );
        })}
        {STRINGS.slice(0, 6).map((string, i) => {
          return (
            <line
              className={`strings__string strings__string--${i + 1}`}
              x1={string.start.x}
              y1={string.start.y}
              x2={string.end.x}
              y2={string.end.y}
            />
          );
        })}
        {markers.map((marker) => {
          return (
            <Note
              x={marker.location.x}
              y={marker.location.y}
              className="strings__note strings__note--marker"
            >
              {marker.fret}
            </Note>
          );
        })}
        {pitchClassMapping
          .map((pc, i) => {
            return (
              <>
                {pc.locations.map((l) => {
                  return (
                    <Note
                      note={pc.note}
                      x={l.x}
                      y={l.y}
                      className={classNames(pc.note, "strings__note", {
                        "strings__note--open": l.x === FRET_POS[0],
                        "strings__note--fingered": l.x !== FRET_POS[0],
                        "strings__note--off": !keyData.pitch_classes.includes(i),
                      })}
                    >
                      {pc.note}
                    </Note>
                  );
                })}
              </>
            );
          })}
      </svg>
    </div>
  );
}
