import React from "react";
import "./Strings.scss";
import { FRETS, FRET_POS, STRINGS, STRING_POS } from "./BoardData";
import Notes from "./Notes";

const pitchClassMapping = [
  { // 0
    locations: [
      { x: FRET_POS[8], y: STRING_POS[1] },
      { x: FRET_POS[3], y: STRING_POS[2] },
      { x: FRET_POS[10], y: STRING_POS[3] },
      { x: FRET_POS[5], y: STRING_POS[4] },
    ],
  },
  { // 1
    locations: [
      { x: FRET_POS[9], y: STRING_POS[1] },
      { x: FRET_POS[4], y: STRING_POS[2] },
      { x: FRET_POS[11], y: STRING_POS[3] },
      { x: FRET_POS[6], y: STRING_POS[4] },
    ],
  },
  { // 2
    locations: [
      { x: FRET_POS[10], y: STRING_POS[1] },
      { x: FRET_POS[5], y: STRING_POS[2] },
      { x: FRET_POS[12], y: STRING_POS[3] },
      { x: FRET_POS[0], y: STRING_POS[3] },
      { x: FRET_POS[7], y: STRING_POS[4] },
    ],
  },
  { // 3
    locations: [
      { x: FRET_POS[11], y: STRING_POS[1] },
      { x: FRET_POS[6], y: STRING_POS[2] },
      { x: FRET_POS[1], y: STRING_POS[3] },
      { x: FRET_POS[8], y: STRING_POS[4] },
    ],
  },
  { // 4
    locations: [
      { x: FRET_POS[12], y: STRING_POS[1] },
      { x: FRET_POS[0], y: STRING_POS[1] },
      { x: FRET_POS[7], y: STRING_POS[2] },
      { x: FRET_POS[2], y: STRING_POS[3] },
      { x: FRET_POS[9], y: STRING_POS[4] },
    ],
  },
  { // 5
    locations: [
      { x: FRET_POS[1], y: STRING_POS[1] },
      { x: FRET_POS[8], y: STRING_POS[2] },
      { x: FRET_POS[3], y: STRING_POS[3] },
      { x: FRET_POS[10], y: STRING_POS[4] },
    ],
  },
  { // 6
    locations: [
      { x: FRET_POS[2], y: STRING_POS[1] },
      { x: FRET_POS[9], y: STRING_POS[2] },
      { x: FRET_POS[4], y: STRING_POS[3] },
      { x: FRET_POS[11], y: STRING_POS[4] },
    ],
  },
  { // 7
    locations: [
      { x: FRET_POS[3], y: STRING_POS[1] },
      { x: FRET_POS[10], y: STRING_POS[2] },
      { x: FRET_POS[5], y: STRING_POS[3] },
      { x: FRET_POS[12], y: STRING_POS[4] },
      { x: FRET_POS[0], y: STRING_POS[4] },
    ],
  },
  { // 8
    locations: [
      { x: FRET_POS[4], y: STRING_POS[1] },
      { x: FRET_POS[11], y: STRING_POS[2] },
      { x: FRET_POS[6], y: STRING_POS[3] },
      { x: FRET_POS[1], y: STRING_POS[4] },
    ],
  },
  { // 9
    locations: [
      { x: FRET_POS[5], y: STRING_POS[1] },
      { x: FRET_POS[12], y: STRING_POS[2] },
      { x: FRET_POS[0], y: STRING_POS[2] },
      { x: FRET_POS[7], y: STRING_POS[3] },
      { x: FRET_POS[2], y: STRING_POS[4] },
    ],
  },
  { // 10
    locations: [
      { x: FRET_POS[6], y: STRING_POS[1] },
      { x: FRET_POS[1], y: STRING_POS[2] },
      { x: FRET_POS[8], y: STRING_POS[3] },
      { x: FRET_POS[3], y: STRING_POS[4] },
    ],
  },
  { // 11
    locations: [
      { x: FRET_POS[7], y: STRING_POS[1] },
      { x: FRET_POS[2], y: STRING_POS[2] },
      { x: FRET_POS[9], y: STRING_POS[3] },
      { x: FRET_POS[4], y: STRING_POS[4] },
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
export default class Main extends React.Component {
  render() {
    return (
      <div id="mandolin_container" style={{ position: "relative" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          baseProfile="full"
          width="100%"
          viewBox="0 0 980 232"
        >
          {FRETS(4).map((fret, i) => {
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
          <Notes
            markers={markers}
            noteMappings={pitchClassMapping}
            keyData={this.props.keyData}
          />
        </svg>
      </div>
    );
  }
}
