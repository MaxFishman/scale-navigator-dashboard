import React from "react";
import Multiselect from "multiselect-react-dropdown";
import "../../../App.css";
import Mandolin from "./instruments/strings/Mandolin";
import Guitar from "./instruments/strings/Guitar";
import Banjo from "./instruments/strings/Banjo";
import Ukulele from "./instruments/strings/Ukulele";
import Data from "../../../Data";
import { ScaleContext } from "../../Context/ScaleContext";

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      selectedItem: null,
      selectedValues: [],
      instruments: [
        { name: "Mandolin", id: 1 },
        { name: "Guitar", id: 2 },
        { name: "Banjo", id: 3 },
        { name: "Ukelele", id: 4 },
        { name: "Flute", id: 5 },
        { name: "Piano", id: 6 },
        { name: "Treble Staff", id: 7 },
        { name: "Triads", id: 8 },
        { name: "Triads Circle", id: 9 },
        { name: "Autoharp", id: 10 },
      ],
    };
  }

  onSelect(selectedValues, selectedItem) {
    if (selectedItem.id === 1) {
      this.setState({ mandolin: true });
    } else if (selectedItem.id === 2) {
      this.setState({ guitar: true });
    } else if (selectedItem.id === 3) {
      this.setState({ banjo: true });
    } else if (selectedItem.id === 4) {
      this.setState({ ukelele: true });
    } else if (selectedItem.id === 5) {
      this.setState({ flute: true });
    } else if (selectedItem.id === 6) {
      this.setState({ piano: true });
    } else if (selectedItem.id === 7) {
      this.setState({ treble: true });
    } else if (selectedItem.id === 8) {
      this.setState({ triads: true });
    } else if (selectedItem.id === 9) {
      this.setState({ circle: true });
    } else if (selectedItem.id === 10) {
      this.setState({ autoharp: true });
    }
  }

  render() {
    let {
      mandolin,
      guitar,
      banjo,
      ukelele,
      flute,
      piano,
      treble,
      triads,
      circle,
      autoharp,
    } = this.state;
    return (
      <ScaleContext.Consumer>
        {({ scale, chord, navigator }) => {
          const keyData = Data.data["scales"][scale];
          return (
            <div>
              <div style={{ margin: "3vh" }}>
                <Multiselect
                  options={this.state.instruments}
                  selectedValues={this.state.selectedValues}
                  onSelect={this.onSelect}
                  onRemove={this.onRemove}
                  displayValue="name"
                  placeholder="Select instrument"
                />
              </div>
              <div>
                {mandolin && <Mandolin keyData={keyData} />}
                {guitar && <Guitar keyData={keyData} />}
                {banjo && <Banjo keyData={keyData} />}
                {ukelele && <Ukulele keyData={keyData} />}
                {flute && <h3>Flute SVG</h3>}
                {piano && <h3>Piano SVG</h3>}
                {treble && <h3>Treble Staff SVG</h3>}
                {triads && <h3>Triads SVG</h3>}
                {circle && <h3>Triads Circle SVG</h3>}
                {autoharp && <h3>Autoharp SVG</h3>}
              </div>
            </div>
          );
        }}
      </ScaleContext.Consumer>
    );
  }
}
