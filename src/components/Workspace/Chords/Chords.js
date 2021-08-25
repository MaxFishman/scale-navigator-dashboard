import "./ChordStyle.css";
import React from "react";
import * as Tone from "tone";
import Vex from "vexflow";

const midiToHz = (midiNote) => {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
};

class Chords extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.synths = [];

    this.state = {
      playing: false,
      rootMovement: this.props.navigator.chord_chooser.allowed_root_intervals,
      voiceLeadingSmoothness:
        this.props.navigator.chord_chooser.voice_leading_smoothness,
    };

    this.togglePlaying = this.togglePlaying.bind(this);
    this.handleVoiceLeadingSmoothnessChange =
      this.handleVoiceLeadingSmoothnessChange.bind(this);
  }

  handleRootMovementChange(i) {
    return () => {
      this.setState((previousState) => {
        const rootMovement = previousState.rootMovement.slice();
        rootMovement[i] = !rootMovement[i];
        this.props.navigator.chord_chooser.allowed_root_intervals[i] =
          rootMovement[i];
        return { rootMovement: rootMovement };
      });
    };
  }

  handleVoiceLeadingSmoothnessChange(event) {
    console.log(event.target.value);
    this.props.navigator.chord_chooser.voice_leading_smoothness =
      event.target.value;
    this.setState({
      voiceLeadingSmoothness: event.target.value,
    });
  }

  togglePlaying() {
    this.setPlaying(!this.state.playing);
    this.setState((previousState) => ({
      playing: !previousState.playing,
    }));
  }

  setPlaying(playing) {
    if (playing) {
      this.play();
    } else {
      this.stop();
    }
  }

  stop() {
    for (let synth of this.synths) {
      synth.triggerRelease();
    }
    this.synths = [];
  }

  play() {
    this.stop();

    const chord = this.props.navigator.chord_chooser.current_chord;
    const notes = chord === null ? [] : chord.original_voicing;
    for (let note of notes) {
      const synth = new Tone.Synth({ volume: -20 }).toDestination();
      synth.triggerAttack(midiToHz(note), "8n");
      this.synths.push(synth);
    }
  }

  componentDidMount() {
    this.updateNotation();
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateNotation();
    if (prevProps.scale !== this.props.scale) {
      if (this.state.playing) {
        this.play();
      }
    }
  }

  updateNotation() {
    const container = document.getElementById("chords-notation-ctr");
    while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
    }

    const chordObject = this.props.navigator.chord_chooser.current_chord;
    if (chordObject === null) {
      return;
    }
    const chord = chordObject.original_voicing;

    const VF = Vex.Flow;

    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(100, 300);
    const context = renderer.getContext();

    const clefs = {
      left: "bass",
      right: "treble"
    };

    const rightStave = new VF.Stave(0, 0, 100);
    rightStave.addClef(clefs.right);
    rightStave.setContext(context);

    const leftStave = new VF.Stave(0, 100, 100);
    leftStave.addClef(clefs.left);
    leftStave.setContext(context);

    const staves = { left: leftStave, right: rightStave };

    const brace = new VF.StaveConnector(rightStave, leftStave).setType(3);

    const accidentals = { left: [], right: [] };
    const keys = { left: [], right: [] };
    chord.forEach((midiNote) => {
      const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      const noteName = noteNames[midiNote % 12];
      const hand = midiNote >= 60 ? "right" : "left";
      let vexflowString = noteName + "/" + (Math.floor(midiNote / 12) - 1);
      if (noteName.endsWith("#")) {
        accidentals[hand].push("#");
      } else {
        accidentals[hand].push(null);
      }
      keys[hand].push(vexflowString);
    });

    for (let hand of ["left", "right"]) {
      if (keys[hand].length === 0) {
        continue;
      }
      const chord = new VF.StaveNote({
        clef: clefs[hand], keys: keys[hand], duration: "w"
      });
      accidentals[hand].forEach((accidentalString, i) => {
        if (accidentalString === null) {
          return;
        }
        chord.addAccidental(i, new VF.Accidental(accidentalString));
      });

      const voice = new VF.Voice({
        num_beats: 4,
        beat_value: 4,
      });
      voice.addTickables([chord]);
      new VF.Formatter().joinVoices([voice]).format([voice], 100);

      staves[hand].draw();
      voice.draw(context, staves[hand]);
    }
    brace.setContext(context).draw();
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
            checked={this.state.rootMovement[i]}
            onChange={this.handleRootMovementChange(i)}
          />
          <label htmlFor={i}>{name}</label>
        </li>
      );
    });

    return (
      <div id="Chords">
        <p>
          <button onClick={this.togglePlaying}>
            {this.state.playing ? "STOP" : "PLAY"}
          </button>
        </p>
        <p>Current scale: {this.props.scale}</p>
        <p>
          Current chord:{" "}
          {this.props.chord === null
            ? "none"
            : this.props.chord === "error"
            ? "Error -- couldn't find a chord fitting these constraints. Try checking more boxes."
            : this.props.chord}
        </p>
        <p>Allowed root movements:</p>
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
        <div id="chords-notation-ctr"></div>
      </div>
    );
  }
}

export default Chords;
