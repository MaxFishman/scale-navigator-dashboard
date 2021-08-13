import './ChordStyle.css';
import React from 'react';

class Chords extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.props.navigator.onChangeMainScale(() => {
      this.update();
    });

    this.state = {
      scale: "c_diatonic"
    };
    this.update();
  }

  update() {
    this.setState({
      scale: (
        this.props.navigator.main_polygon ?
          this.props.navigator.main_polygon.scale
          : "none"
      )
    });
    // I'm sorry, I am bad at React and could not figure out how to avoid this.
    this.forceUpdate();
  }

  render() {
    return(
      <div id="Chords">
        <p>Current scale: { this.state.scale }</p>
      </div>
    );
  }
};

export default Chords;
