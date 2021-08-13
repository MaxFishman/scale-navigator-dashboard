import './ChordStyle.css';
import React from 'react';
import * as scalesJson from './pressing_scale_dict.json';
import * as chordsJson from './chords_no_supersets.json';
import * as chordTypesJson from './chord_types.json';

const SCALES = scalesJson.default;
const CHORDS = chordsJson.default;
const CHORD_TYPES = chordTypesJson.default;

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

const choose = (array) => {
  return array[Math.floor(array.length * Math.random())];
};

function mod(a, b){
    return ((a % b) + b) % b;
}

class ChordChooser {
  constructor() {
    this.jazz_filtering_enabled = true;
    this.allowed_root_intervals = [true, true, true, true, true, true, true];
    this.voice_leading_threshold = 9;
    this.voice_leading_smoothness = 100;
    this.slice_size = 1;
    this.last_chord_name = 'b_13#9-110';
  }

  is_valid_jazz_chord_progression(current_chord, next_chord) {
      if (!this.jazz_filtering_enabled){
          return true;
      }

      var root_interval = Math.abs(mod((CHORDS[next_chord]["root"]-CHORDS[current_chord]["root"]+6), 12)-6);

      if (!this.allowed_root_intervals[root_interval]) {
          return false;
      }

      var current_position = CHORD_TYPES[CHORDS[current_chord].chord_type].position;
      var next_position = CHORD_TYPES[CHORDS[next_chord].chord_type].position;

      if (root_interval <= 2) {
          // root movements by whole-steps, half-steps or unison
          return current_position === next_position;
      }
      if (root_interval === 3 || root_interval === 4) {
          // root movements by minor thirds/ sixths, major thirds / sixths
          return true;
      }
      if (root_interval === 5) {
          // root movements by fourths or fifths
          return current_position !== next_position;
      }
      if (root_interval === 6) {
          // root movement by tritones, not allowed!!
          return true;
      }
  }

  score_smooth_voice_leading(current_chord, next_chord) {
      var current_pitches = CHORDS[current_chord].root_transposed_to_zero;
      var next_pitches = CHORDS[next_chord].root_transposed_to_zero;

      var fitness_score = 0;
      current_pitches.forEach(function(pitch, index) {
          for(let interval = -2; interval <= 2; interval++){
              if (next_pitches.indexOf(pitch + interval) !== -1) {
                  if (interval === 0) {
                      fitness_score += 2;
                  } else {
                      fitness_score += 1;
                  }
                  if (Math.max.apply(null, current_pitches) === pitch) {
                      fitness_score += 2;
                  }
                  return;
              }
          }
      })
      return fitness_score;
  }

  pickChord(scaleName) {
      var chord_candidates = getChordsInScale(scaleName);
      var before_chord_candidates_count = chord_candidates.length;
      chord_candidates = chord_candidates.filter((candidate) => {
          return this.is_valid_jazz_chord_progression(this.last_chord_name, candidate);
      });

      chord_candidates = chord_candidates.sort((a, b) => {
          var score_a = this.score_smooth_voice_leading(this.last_chord_name, a);
          var score_b = this.score_smooth_voice_leading(this.last_chord_name, b);

          if (score_a === score_b) {
              return 0;
          } else if (score_a < score_b) {
              return -1;
          } else if (score_a > score_b) {
              return 1;
          }

      });

      var after_chord_candidates = chord_candidates.length;
      let slice_size = Math.floor(chord_candidates.length - chord_candidates.length*(this.voice_leading_smoothness/100));
      if (slice_size === 0){
          slice_size = 1;
      }
      var current_chord_name;
      if (slice_size >= chord_candidates.length) {
          current_chord_name = choose(chord_candidates);
      } else {
          current_chord_name = choose(chord_candidates.slice(slice_size));
      }
      var current_chord = CHORDS[current_chord_name];
      return current_chord;
  }
}

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
