import React from "react";
import PitchClassData from "common/PitchClassData";
import "./Flute.scss";
import classNames from "classnames";
import TabContainer from "../../TabContainer";

const trills = [
  { pitchClasses: [0, 1], fingers: ["eflat"], trills: ["b"] },
  { pitchClasses: [0, 2], fingers: ["b", "eflat"], trills: ["trill-1"] },
  { pitchClasses: [1, 2], fingers: ["eflat"], trills: ["trill-1"] },
  { pitchClasses: [1, 3], fingers: ["eflat"], trills: ["trill-2"] },
  {
    pitchClasses: [2, 4],
    fingers: ["b", "a", "g", "f", "e", "c"],
    trills: ["d"],
  },
  {
    pitchClasses: [3, 5],
    fingers: ["b", "a", "g", "f", "d", "c", "eflat"],
    trills: ["e"],
  },
  {
    pitchClasses: [4, 6],
    fingers: ["b", "a", "g", "e", "c", "eflat"],
    trills: ["f"],
  },
  {
    pitchClasses: [5, 6],
    fingers: ["b", "a", "g", "d", "c", "eflat"],
    trills: ["f"],
  },
  {
    pitchClasses: [6, 8],
    fingers: ["b", "a", "g", "d", "c", "eflat"],
    trills: ["gsharp"],
  },
  {
    pitchClasses: [8, 9],
    fingers: ["b", "a", "c", "gsharp", "eflat"],
    trills: ["g"],
  },
  {
    pitchClasses: [8, 10],
    fingers: ["b", "g", "bflat", "gsharp", "eflat"],
    trills: ["a"],
  },
  { pitchClasses: [9, 10], fingers: ["b", "f", "c", "eflat"], trills: ["a"] },
  { pitchClasses: [10, 0], fingers: ["b", "f", "eflat"], trills: ["c"] },
  { pitchClasses: [10, 11], fingers: ["b", "c", "eflat"], trills: ["f"] },
  { pitchClasses: [11, 1], fingers: ["eflat"], trills: ["b", "c"] },
];

const BlankTrill = () => {
  return <div className="trill"></div>;
};

const Trill = ({ trill }) => (
  <div className="trill">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      baseProfile="full"
      viewBox="0 0 218 66"
    >
      <title>
        {trill.pitchClasses.map((pc) => PitchClassData[pc].slug).join("-")}
      </title>
      <circle
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("b"),
          "trill__note--trilled": trill.trills.includes("b"),
        })}
        id="b"
        cx="10"
        cy="30"
        r="8"
        stroke="black"
      ></circle>
      <circle
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("a"),
          "trill__note--trilled": trill.trills.includes("a"),
        })}
        id="a"
        cx="50"
        cy="30"
        r="10"
        stroke="black"
      />
      <circle
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("g"),
          "trill__note--trilled": trill.trills.includes("g"),
        })}
        id="g"
        cx="80"
        cy="30"
        r="10"
        stroke="black"
      />
      <circle
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("f"),
          "trill__note--trilled": trill.trills.includes("f"),
        })}
        id="f"
        cx="130"
        cy="30"
        r="10"
        stroke="black"
      />
      <circle
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("e"),
          "trill__note--trilled": trill.trills.includes("e"),
        })}
        id="e"
        cx="160"
        cy="30"
        r="10"
        stroke="black"
      />
      <circle
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("d"),
          "trill__note--trilled": trill.trills.includes("d"),
        })}
        id="d"
        cx="190"
        cy="30"
        r="10"
        stroke="black"
      />

      <path
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("bflat"),
          "trill__note--trilled": trill.trills.includes("bflat"),
        })}
        id="bflat"
        d="M 5 45 L 45 45 C 47 46, 47 47, 45 48 L 18 48 C 17 69, 4 69, 5 45"
        stroke="black"
      />
      <path
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("c"),
          "trill__note--trilled": trill.trills.includes("c"),
        })}
        id="c"
        d="M 20 50 L 44 50 C 45 68, 17 68, 20 50"
        stroke="black"
      />

      <path
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("gsharp"),
          "trill__note--trilled": trill.trills.includes("gsharp"),
        })}
        id="gsharp"
        d="M 80 10 C 95 14, 98 26, 100 30 L 92 10 C 90 5, 88 3, 88 3 C 82 0, 76 5, 80 10"
        stroke="black"
      />

      <path
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("bflat-lever"),
          "trill__note--trilled": trill.trills.includes("bflat-lever"),
        })}
        id="bflat-lever"
        d="M 105 45 L 115 45 C 115 35, 122 35, 122 45 L 122 48 L 105 48 C 100 48, 100 45, 105 45"
        stroke="black"
      />

      <path
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("trill-1"),
          "trill__note--trilled": trill.trills.includes("trill-1"),
        })}
        id="trill-1"
        d="M 142 48 L 148 48 C 152 35, 138 35, 142 48"
        stroke="black"
      />

      <path
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("trill-2"),
          "trill__note--trilled": trill.trills.includes("trill-2"),
        })}
        id="trill-2"
        d="M 172 48 L 178 48 C 182 35, 168 35, 172 48"
        stroke="black"
      />

      <path
        className={classNames("trill__note", {
          "trill__note--fingered": trill.fingers.includes("eflat"),
          "trill__note--trilled": trill.trills.includes("eflat"),
        })}
        id="eflat"
        d="M 205 30 C 208 36, 192 45, 205 48 C 222 45, 212 36, 210 30 C 209 26, 206 26, 205 30"
        stroke="black"
      />
    </svg>
  </div>
);

export default function Flute({ keyData, onClose }) {
  const isSubsetOf = (superSet, test) => {
    return test.every((i) => superSet.includes(i));
  };

  return (
    <TabContainer onClose={onClose}>
      <div className="flutecontainer">
        {trills.map((trill) => {
          return isSubsetOf(keyData.pitch_classes, trill.pitchClasses) ? (
            <Trill trill={trill}></Trill>
          ) : (
            <BlankTrill></BlankTrill>
          );
        })}
      </div>
    </TabContainer>
  );
}
