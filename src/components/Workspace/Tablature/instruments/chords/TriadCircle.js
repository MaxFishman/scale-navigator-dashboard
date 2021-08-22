import React from "react";
import "./TriadCircle.scss";
import TabContainer from "../../TabContainer";
import ChordData from "common/ChordData";
import classNames from "classnames";

export default function TriadCircle({ keyData, onClose }) {
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
    <TabContainer onClose={onClose}>
      <svg
        viewBox={`0 0 ${radius * 2 + padding} ${radius * 2 + padding}`}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        baseProfile="full"
        class="triadcircle"
      >
        <circle
          class="triadcircle__circle"
          cx={radius + padding / 2}
          cy={radius + padding / 2}
          r={radius}
        />
        {ChordData.map((chord, i) => {
          const { x, y } = polarToCart(270 + i * (360 / ChordData.length));
          return (
            <>
              <circle
                class={classNames("triadcircle__chord", {
                  "triadcircle__chord--off": !keyData.chords.includes(chord),
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
    </TabContainer>
  );
}
