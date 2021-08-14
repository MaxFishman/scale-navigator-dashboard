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
      playing: this.props.chordPlayer.playing,
      rootMovement: this.props.navigator.chord_chooser.allowed_root_intervals,
      voiceLeadingSmoothness: this.props.navigator.chord_chooser.voice_leading_smoothness,
      scale: this.props.navigator.main_polygon.scale,
      chord: this.props.navigator.chord_chooser.current_chord_name,
    };
    this.update();

    this.togglePlaying = this.togglePlaying.bind(this);
    this.handleVoiceLeadingSmoothnessChange = this.handleVoiceLeadingSmoothnessChange.bind(this);
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

  togglePlaying() {
    this.setState((previousState) => ({
      playing: !previousState.playing
    }));
    // TODO: Why the ! here?
    this.props.chordPlayer.setPlaying(!this.state.playing);
  }

  handleRootMovementChange(i) {
    return () => {
      this.setState((previousState) => {
        const rootMovement = previousState.rootMovement.slice();
        rootMovement[i] = !rootMovement[i];
        this.props.navigator.chord_chooser.allowed_root_intervals[i] = (
          rootMovement[i]
        );
        return { rootMovement: rootMovement };
      });
    };
  }

  handleVoiceLeadingSmoothnessChange(event) {
    console.log(event.target.value);
    this.props.navigator.chord_chooser.voice_leading_smoothness = event.target.value;
    this.setState({
      voiceLeadingSmoothness: event.target.value
    });
  }

  render() {
    const elements = [
      "Unison", "m2, M7", "M2, m7", "m3, M6", "M3, m6", "P4, P5", "Tritone"
    ].map((name, i) => {
      const id = "root-movement-" + i;
      return (
        <li key={ i }>
          <input
            id={ id }
            type="checkbox"
            checked={ this.state.rootMovement[i] }
            onChange={ this.handleRootMovementChange(i) }
          />
          <label htmlFor={ i }>{ name }</label>
        </li>
      );
    });

    return(
      <div id="Chords">
        <p>
          <button onClick={ this.togglePlaying }>
            { this.state.playing ? "STOP" : "PLAY" }
          </button>
        </p>
        <p>Current scale: { this.state.scale }</p>
        <p>
          Current chord: {
            this.state.chord === null
              ? "none"
              : this.state.chord === "error"
                ? "Error -- couldn't find a chord fitting these constraints. Try checking more boxes."
                : this.state.chord
          }
        </p>
        <p>Allowed root movements:</p>
        <ul>
          { elements }
        </ul>
        <p>
          <label htmlFor="voice-leading-smoothness">Voice leading smoothness:</label>
          <input
            type="range"
            id="voice-leading-smoothness"
            min="0"
            max="100"
            value={ this.voiceLeadingSmoothness }
            onChange={ this.handleVoiceLeadingSmoothnessChange }
          />
        </p>
      </div>
    );
  }
};

export default Chords;
