import './ChordStyle.css';
import React from 'react';
import ChordChooser from '../../Navigation/Navigator/ChordChooser';

class Chords extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.props.navigator.onChangeMainScale(() => {
      this.update();
    });

    this.chordChooser = new ChordChooser();

    this.state = {
      scale: "c_diatonic",
      chord: "",
    };
    this.update();
  }

  update() {
    let chord = null;
    if (this.props.navigator.main_polygon) {
      chord = this.chordChooser.pickChord(
        this.props.navigator.main_polygon.scale
      );
    }
    const scale = this.props.navigator.main_polygon ?
      this.props.navigator.main_polygon.scale
      : "none";
    this.setState({
      scale: scale,
      chord: chord ? chord : ""
    });
    // FIXME: forceUpdate is a code smell
    // I'm sorry, I am bad at React and could not figure out how to avoid this
    this.forceUpdate();
  }

  render() {
    return(
      <div id="Chords">
        <p>Current scale: { this.state.scale }</p>
        <p>Pitch classes: { this.state.chord }</p>
      </div>
    );
  }
};

export default Chords;
