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

    this.state = {
      scale: "c_diatonic",
      chord: "",
    };
    this.update();
  }

  update() {
    const scale = this.props.navigator.main_polygon ?
      this.props.navigator.main_polygon.scale
      : "none";
    const chord = this.props.navigator.chord_chooser.current_chord_name;
    this.setState({
      scale: scale,
      chord: chord
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
