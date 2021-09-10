import "./Chords.scss";
import React from "react";
import Vex from "vexflow";
import ScaleData from "common/ScaleData";

const DEFAULT_SPELLINGS = [
  "c",
  "cs",
  "d",
  "ef",
  "e",
  "f",
  "fs",
  "g",
  "af",
  "a",
  "bf",
  "b",
];

const mod = (a, b) => {
  return ((a % b) + b) % b;
};

const isSubset = (a, b) => {
  for (let x of a) {
    if (b.indexOf(x) === -1) {
      return false;
    }
  }
  return true;
};

const lilypondToVexflow = (note) => {
  if (note.length === 1) {
    return note;
  }
  return note[0] + { s: "#", f: "b" }[note[1]];
};

const NOTE_NAME_TO_PITCH_CLASS = {
  c: 0,
  d: 2,
  e: 4,
  f: 5,
  g: 7,
  a: 9,
  b: 11,
};

const lilypondToPitchClass = (note) => {
  const baseNoteName = note[0];
  let result = NOTE_NAME_TO_PITCH_CLASS[baseNoteName];
  return result + lilypondToInflection(note);
};

const lilypondToInflection = (note) => {
  if (note.length === 1) {
    return 0;
  }
  return { s: 1, f: -1 }[note[1]];
};

class Chords extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.togglePlaying = this.togglePlaying.bind(this);
    this.handleVoiceLeadingSmoothnessChange =
      this.handleVoiceLeadingSmoothnessChange.bind(this);
  }

  handleRootMovementChange(i) {
    return () => {
      const updatedAllowedIntervals =
        this.props.chordData.allowedRootIntervals.slice();
      updatedAllowedIntervals[i] = !updatedAllowedIntervals[i];
      this.props.setChordData({
        allowedRootIntervals: updatedAllowedIntervals,
      });
    };
  }

  handleVoiceLeadingSmoothnessChange(event) {
    this.setState({
      voiceLeadingSmoothness: event.target.value,
    });
  }

  togglePlaying() {
    this.props.setChordData({ playing: !this.props.chordData.playing });
  }

  componentDidMount() {
    this.updateNotation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.chordData.chord !== prevProps.chordData.chord) {
      this.updateNotation();
    }
  }

  updateNotation() {
    const container = document.getElementById("chords-notation-ctr");
    while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
    }

    const chordObject = this.props.chordData.chord;
    if (!chordObject) {
      return;
    }
    const chord = chordObject.original_voicing;

    const VF = Vex.Flow;

    const width = 150;

    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(width, 300);
    const context = renderer.getContext();

    const clefs = {
      right: "treble",
      left: "bass",
      bass: "bass",
    };

    const staveOptions = { fill_style: "#000000" };

    const rightStave = new VF.Stave(0, 0, width, staveOptions);
    rightStave.addClef(clefs.right);
    rightStave.setContext(context);

    const leftStave = new VF.Stave(0, 100, width, staveOptions);
    leftStave.addClef(clefs.left);
    leftStave.setContext(context);

    const bassStave = new VF.Stave(0, 200, width, staveOptions);
    bassStave.addClef(clefs.left);
    bassStave.setContext(context);

    const staves = { left: leftStave, right: rightStave, bass: bassStave };

    const brace = new VF.StaveConnector(rightStave, leftStave).setType(3);

    const spelling = DEFAULT_SPELLINGS.concat(
      ScaleData[this.props.scaleData.scale].spelling
    );
    const pitchClassToNoteName = {};
    const pitchClassToInflection = {};
    for (let note of spelling) {
      const pitchClass = lilypondToPitchClass(note);
      pitchClassToNoteName[mod(pitchClass, 12)] = lilypondToVexflow(note);
      pitchClassToInflection[mod(pitchClass, 12)] = lilypondToInflection(note);
    }

    const accidentals = { left: [], right: [], bass: [] };
    const keys = { left: [], right: [], bass: [] };
    chord.forEach((midiNote) => {
      const noteName = pitchClassToNoteName[midiNote % 12];
      const inflection = pitchClassToInflection[midiNote % 12];
      const baseMidiNote = midiNote - inflection;
      const hand = baseMidiNote >= 60 ? "right" : "left";
      let vexflowString = noteName + "/" + (Math.floor(baseMidiNote / 12) - 1);
      if (!noteName) {
        console.log(chordObject);
        console.log(this.props.scaleData);
        console.log(this.props.chordData.chordName);
      }
      if (noteName.length === 2) {
        accidentals[hand].push(noteName[1]);
      } else {
        accidentals[hand].push(null);
      }
      keys[hand].push(vexflowString);
    });

    if (pitchClassToNoteName[chordObject.root] !== undefined) {
      keys.bass.push(pitchClassToNoteName[chordObject.root] + "/3");
      accidentals.bass.push(null);
    }

    for (let hand of ["left", "right", "bass"]) {
      staves[hand].draw();
      if (keys[hand].length !== 0) {
        const voice = new VF.Voice({
          num_beats: 4,
          beat_value: 4,
        });
        const chord = new VF.StaveNote({
          clef: clefs[hand],
          keys: keys[hand],
          duration: "w",
        });
        accidentals[hand].forEach((accidentalString, i) => {
          if (accidentalString === null) {
            return;
          }
          chord.addAccidental(i, new VF.Accidental(accidentalString));
        });
        voice.addTickables([chord]);
        new VF.Formatter().joinVoices([voice]).format([voice], width);
        voice.draw(context, staves[hand]);
      }
    }
    brace.setContext(context).draw();
  }

  getPivotModulations() {
    const chordObject = this.props.chordData.chord;
    if (chordObject === null) {
      return [];
    }
    const chordPitchClasses = chordObject.prime_form_kinda;
    const scales = [];
    for (let scaleName of Object.keys(ScaleData)) {
      const scale = ScaleData[scaleName];
      const scalePitchClasses = scale.pitch_classes;
      if (isSubset(chordPitchClasses, scalePitchClasses)) {
        scales.push(scaleName);
      }
    }
    return scales;
  }

  modulate(scale) {
    this.props.setScaleData({
      scale: scale,
    });
  }

  render() {
    const elements = [
      "Unison",
      "m2, M7",
      "M2, m7",
      "m3, M6",
      "M3, m6",
      "P4, P5",
      "Tritone",
    ].map((name, i) => {
      const id = "root-movement-" + i;
      return (
        <li key={i}>
          <input
            id={id}
            type="checkbox"
            checked={this.props.chordData.allowedRootIntervals[i]}
            onChange={this.handleRootMovementChange(i)}
          />
          <span htmlFor={i}>{name}</span>
        </li>
      );
    });

    const modulate = (scale) => () => this.modulate(scale);

    const pivotModulationButtons = this.getPivotModulations().map((scale) => {
      return (
        <button class="supersets" onClick={modulate(scale)}>
          {scale}
        </button>
      );
    });

    return (
      <div id="Chords">
        <button id="play" onClick={this.togglePlaying}>
          {this.props.chordData.playing ? "STOP" : "PLAY"}
        </button>

        <div id="chord_controls_container">
          <div id="this_scale">

              <h3>Current scale:</h3>
              <p>{this.props.scaleData.scale}</p>

              <h3>Pivot modulations:</h3>
              <p>{pivotModulationButtons}</p>

          </div>

          <div id="this_chord">
            <h3>Current chord: </h3>
            <p>
              {this.props.chordData.chordName === null
                ? "none"
                : this.props.chordData.chordName === "error"
                ? "Error -- couldn't find a chord fitting these constraints. Try checking more boxes."
                : this.props.chordData.chordName}
            </p>
            <div id="chords-notation-ctr"></div>
          </div>

          <div id="controls">
            <h3>Allowed root movements:</h3>
            <ul>{elements}</ul>
            <p>
              <label htmlFor="voice-leading-smoothness">
                Voice leading smoothness:
              </label>
              <input
                type="range"
                id="voice-leading-smoothness"
                min="0"
                max="100"
                value={this.voiceLeadingSmoothness}
                onChange={this.handleVoiceLeadingSmoothnessChange}
              />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Chords;
