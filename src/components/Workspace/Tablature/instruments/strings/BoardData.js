const STRING_POS = [0, 60, 110, 160, 210, 260, 310];

const FRET_POS = [
  45, 115, 185, 255, 325, 395, 465, 535, 605, 675, 745, 815, 885,
];
const STRINGS = [
  { start: { x: 78.5, y: 60 }, end: { x: 921.5, y: 60 } },
  { start: { x: 78.5, y: 110 }, end: { x: 921.5, y: 110 } },
  { start: { x: 78.5, y: 160 }, end: { x: 921.5, y: 160 } },
  { start: { x: 78.5, y: 210 }, end: { x: 921.5, y: 210 } },
  { start: { x: 78.5, y: 260 }, end: { x: 921.5, y: 260 } },
  { start: { x: 78.5, y: 310 }, end: { x: 921.5, y: 310 } },
];

const FRETS = (endString) => [
  { start: { x: 80, y: 59.25 }, end: { x: 80, y: STRING_POS[endString] + 1.5 } },
  { start: { x: 150, y: 60 }, end: { x: 150, y: STRING_POS[endString] } },
  { start: { x: 220, y: 60 }, end: { x: 220, y: STRING_POS[endString] } },
  { start: { x: 290, y: 60 }, end: { x: 290, y: STRING_POS[endString] } },
  { start: { x: 360, y: 60 }, end: { x: 360, y: STRING_POS[endString] } },
  { start: { x: 430, y: 60 }, end: { x: 430, y: STRING_POS[endString] } },
  { start: { x: 500, y: 60 }, end: { x: 500, y: STRING_POS[endString] } },
  { start: { x: 570, y: 60 }, end: { x: 570, y: STRING_POS[endString] } },
  { start: { x: 640, y: 60 }, end: { x: 640, y: STRING_POS[endString] } },
  { start: { x: 710, y: 60 }, end: { x: 710, y: STRING_POS[endString] } },
  { start: { x: 780, y: 60 }, end: { x: 780, y: STRING_POS[endString] } },
  { start: { x: 850, y: 60 }, end: { x: 850, y: STRING_POS[endString] } },
  { start: { x: 920, y: 60 }, end: { x: 920, y: STRING_POS[endString] } },
];

export { STRINGS, FRETS, STRING_POS, FRET_POS };
