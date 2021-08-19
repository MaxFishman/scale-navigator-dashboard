import "react-tabs/style/react-tabs.css";
import { Tabs, Row, Col, Button } from "antd";
import About from "./About/About";
import Chords from "./Chords/Chords";
import Ensemble from "./Ensemble/Ensemble";
import Tablature from "./Tablature/Tablature";
import React from "react";
import { app } from "../../config/base";

const { TabPane } = Tabs;

export default class Workspace extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    activeKey: "0",
  };

  render() {
    return (
      <>
        <Tabs
          id="workspace"
          activeKey={this.state.activeKey}
          onChange={(key) => this.setState({ activeKey: key })}
        >
          <TabPane tab="Ensemble" key="0">
            <Ensemble />
          </TabPane>
          <TabPane tab="Tablature" key="1">
            <Tablature />
          </TabPane>
          <TabPane tab="Chords" key="2">
            <Chords
              navigator={this.props.navigator}
              chordPlayer={this.props.chordPlayer}
            />
          </TabPane>
          <TabPane tab="MIDI" key="3">
            <p>MIDI Component</p>
          </TabPane>
          <TabPane tab="Notepad" key="4">
            <p>Notepad Component</p>
          </TabPane>
          <TabPane tab="Scale Network" key="5">
            <p>Scale Network Component</p>
          </TabPane>
          <TabPane tab="Account" key="6">
            <p>Account component</p>
          </TabPane>
          <TabPane tab="About" key="7">
            <About />
          </TabPane>
        </Tabs>
      </>
    );
  }
}
