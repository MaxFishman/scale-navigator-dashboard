import './ChordStyle.css';
import React from 'react';
import * as scalesJson from './pressing_scale_dict.json';
import * as chordsJson from './chords_no_supersets.json';

const SCALES = scalesJson.default;
const CHORDS = chordsJson.default;

const edo = 12;

const isSubset = (array1, array2) => {
  for (let x of array1) {
    if (array2.indexOf(x) === -1) {
      return false;
    };
  }
  return true;
};

const getChordsInScale = (scale) => {
  const result = [];
  const pitchClasses = SCALES[scale].pitch_classes;
  for (let chordName of Object.keys(CHORDS)) {
    const chord = CHORDS[chordName];
    const chordPitchClasses = chord.prime_form_kinda;
    if (isSubset(chordPitchClasses, pitchClasses)) {
      result.push(chordName);
    }
  }
  return result;
};

class Chords extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.props.navigator.onChangeMainScale(() => {
      this.update();
    });

    this.state = {
      scale: "c_diatonic",
      chords: "",
    };
    this.update();
  }

  update() {
    const scale = this.props.navigator.main_polygon ?
      this.props.navigator.main_polygon.scale
      : "none";
    const chords = scale === "none" ?
      ""
      : getChordsInScale(scale).join(" ");
    this.setState({
      scale: scale,
      chords: chords
    });
    // FIXME: forceUpdate is a code smell
    // I'm sorry, I am bad at React and could not figure out how to avoid this
    this.forceUpdate();
  }

  render() {
    return(
      <div id="Chords">
        <p>Current scale: { this.state.scale }</p>
        <p>Pitch classes: { this.state.chords }</p>
      </div>
    );
  }
};

export default Chords;
