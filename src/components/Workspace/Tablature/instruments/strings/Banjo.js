import React from "react";
import "./Strings.scss";
import { FRETS, FRET_POS, STRINGS, STRING_POS } from "./BoardData";
import Notes from "./Notes";

const pitchClassMapping = [
  {
    note: "C",
    sharp: "C",
    flat: "C",
    locations: [
      { x: FRET_POS[10], y: STRING_POS[1] },
      { x: FRET_POS[1], y: STRING_POS[2] },
      { x: FRET_POS[5], y: STRING_POS[3] },
      { x: FRET_POS[10], y: STRING_POS[4] },
      { x: FRET_POS[10], y: STRING_POS[5] },
    ],
  },
  {
    note: "C#",
    sharp: "C#",
    flat: "D♭",
    locations: [
      { x: FRET_POS[11], y: STRING_POS[1] },
      { x: FRET_POS[2], y: STRING_POS[2] },
      { x: FRET_POS[6], y: STRING_POS[3] },
      { x: FRET_POS[11], y: STRING_POS[4] },
      { x: FRET_POS[11], y: STRING_POS[5] },
    ],
  },
  {
    note: "D",
    sharp: "D",
    flat: "D",
    locations: [
      { x: FRET_POS[12], y: STRING_POS[1] },
      { x: FRET_POS[0], y: STRING_POS[1] },
      { x: FRET_POS[3], y: STRING_POS[2] },
      { x: FRET_POS[7], y: STRING_POS[3] },
      { x: FRET_POS[12], y: STRING_POS[4] },
      { x: FRET_POS[0], y: STRING_POS[4] },
      { x: FRET_POS[12], y: STRING_POS[5] },
    ],
  },
  {
    note: "E♭",
    sharp: "D#",
    flat: "E♭",
    locations: [
      { x: FRET_POS[1], y: STRING_POS[1] },
      { x: FRET_POS[4], y: STRING_POS[2] },
      { x: FRET_POS[8], y: STRING_POS[3] },
      { x: FRET_POS[1], y: STRING_POS[4] },
    ],
  },
  {
    note: "E",
    sharp: "E",
    flat: "E",
    locations: [
      { x: FRET_POS[2], y: STRING_POS[1] },
      { x: FRET_POS[5], y: STRING_POS[2] },
      { x: FRET_POS[9], y: STRING_POS[3] },
      { x: FRET_POS[2], y: STRING_POS[4] },
    ],
  },
  {
    note: "F",
    sharp: "F",
    flat: "F",
    locations: [
      { x: FRET_POS[3], y: STRING_POS[1] },
      { x: FRET_POS[6], y: STRING_POS[2] },
      { x: FRET_POS[10], y: STRING_POS[3] },
      { x: FRET_POS[3], y: STRING_POS[4] },
    ],
  },
  {
    note: "F#",
    sharp: "F#",
    flat: "G♭",
    locations: [
      { x: FRET_POS[4], y: STRING_POS[1] },
      { x: FRET_POS[7], y: STRING_POS[2] },
      { x: FRET_POS[11], y: STRING_POS[3] },
      { x: FRET_POS[4], y: STRING_POS[4] },
    ],
  },
  {
    note: "G",
    sharp: "G",
    flat: "G",
    locations: [
      { x: FRET_POS[5], y: STRING_POS[1] },
      { x: FRET_POS[8], y: STRING_POS[2] },
      { x: FRET_POS[12], y: STRING_POS[3] },
      { x: FRET_POS[0], y: STRING_POS[3] },
      { x: FRET_POS[5], y: STRING_POS[4] },
      { x: FRET_POS[5], y: STRING_POS[5] },
    ],
  },
  {
    note: "A♭",
    sharp: "G#",
    flat: "A♭",
    locations: [
      { x: FRET_POS[6], y: STRING_POS[1] },
      { x: FRET_POS[9], y: STRING_POS[2] },
      { x: FRET_POS[1], y: STRING_POS[3] },
      { x: FRET_POS[6], y: STRING_POS[4] },
      { x: FRET_POS[6], y: STRING_POS[5] },
    ],
  },
  {
    note: "A",
    sharp: "A",
    flat: "A",
    locations: [
      { x: FRET_POS[7], y: STRING_POS[1] },
      { x: FRET_POS[10], y: STRING_POS[2] },
      { x: FRET_POS[2], y: STRING_POS[3] },
      { x: FRET_POS[7], y: STRING_POS[4] },
      { x: FRET_POS[7], y: STRING_POS[5] },
    ],
  },
  {
    note: "B♭",
    sharp: "A#",
    flat: "B♭",
    locations: [
      { x: FRET_POS[8], y: STRING_POS[1] },
      { x: FRET_POS[11], y: STRING_POS[2] },
      { x: FRET_POS[3], y: STRING_POS[3] },
      { x: FRET_POS[8], y: STRING_POS[4] },
      { x: FRET_POS[8], y: STRING_POS[5] },
    ],
  },
  {
    note: "B",
    sharp: "B",
    flat: "B",
    locations: [
      { x: FRET_POS[9], y: STRING_POS[1] },
      { x: FRET_POS[12], y: STRING_POS[2] },
      { x: FRET_POS[0], y: STRING_POS[2] },
      { x: FRET_POS[4], y: STRING_POS[3] },
      { x: FRET_POS[9], y: STRING_POS[4] },
      { x: FRET_POS[9], y: STRING_POS[5] },
    ],
  },
];

const markers = [
  {
    fret: 3,
    location: { x: 255, y: 135 },
  },
  {
    fret: 5,
    location: { x: 395, y: 135 },
  },
  {
    fret: 7,
    location: { x: 535, y: 135 },
  },
  {
    fret: 10,
    location: { x: 745, y: 135 },
  },
  {
    fret: 12,
    location: { x: 885, y: 85 },
  },
  {
    fret: 12,
    location: { x: 885, y: 185 },
  },
];

const extraNut = {
  start: { x: 430, y: 210 },
  end: { x: 430, y: STRING_POS[5] + 1.5 },
};
const extraString = { start: { x: 430, y: 260 }, end: { x: 921.5, y: 260 } };

export default class Main extends React.Component {
  render() {
    return (
      <div id="mandolin_container" style={{ position: "relative" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          baseProfile="full"
          width="100%"
          viewBox="0 0 980 285"
        >
          {FRETS(4)
            .slice(0, 6)
            .map((fret, i) => {
              return (
                <line
                  className={`strings__fret${
                    i === 0 ? " strings__fret--nut" : ""
                  }`}
                  x1={fret.start.x}
                  y1={fret.start.y}
                  x2={fret.end.x}
                  y2={fret.end.y}
                />
              );
            })}
          {FRETS(5)
            .slice(6)
            .map((fret, i) => {
              return (
                <line
                  className={`strings__fret`}
                  x1={fret.start.x}
                  y1={fret.start.y}
                  x2={fret.end.x}
                  y2={fret.end.y}
                />
              );
            })}
          {STRINGS.slice(0, 4).map((string, i) => {
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
          <line
            className={`strings__fret strings__fret--nut`}
            x1={extraNut.start.x}
            y1={extraNut.start.y}
            x2={extraNut.end.x}
            y2={extraNut.end.y}
          />
          <line
            className={`strings__string strings__string--1`}
            x1={extraString.start.x}
            y1={extraString.start.y}
            x2={extraString.end.x}
            y2={extraString.end.y}
          />
          <Notes
            markers={markers}
            noteMappings={pitchClassMapping}
            keyData={this.props.keyData}
            openFn={(x, y) =>
              x === FRET_POS[0] || (x === FRET_POS[5] && y === STRING_POS[5])
            }
          />
        </svg>
      </div>
    );
  }
}
