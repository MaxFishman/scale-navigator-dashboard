import 'react-tabs/style/react-tabs.css';
import { Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

export default class Workspace extends React.Component {
  state = {
    activeKey: '1'
  }

  render() {
    return (
      <Tabs
        id="workspace"
        activeKey={this.state.activeKey}
        onChange={key => this.setState({ activeKey: key })}
      >
        <TabPane tab="Tablature" key="1">
          <p>Tablature Component</p>
        </TabPane>
        <TabPane tab="MIDI" key="2">
          <p>MIDI Component</p>
        </TabPane>
        <TabPane tab="Notepad" key="3">
          <p>Notepad Component</p>
        </TabPane>
        <TabPane tab="Scale Network" key="4">
          <p>Scale Network Component</p>
        </TabPane>
        <TabPane tab="Account" key="6">
          <p>Account component</p>
        </TabPane>
        <TabPane tab="About" key="7">
          <h2>About</h2>
          <ul>
            <li><a href="https://mtiid.calarts.edu/wp-content/uploads/2020/03/Turczan_MFA_Thesis.pdf">The Scale Navigator: A Synesthetic Interface for Manipulating Harmony in Composition, Performance and Installation</a></li>
            <li><a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">Scale Networks and Debussy</a></li>
            <li><a href="https://music.arts.uci.edu/abauer/3.1/notes/Chord-Scale_Networks.pdf">Chord-Scale Networks in the Music and Improvisations of Wayne Shorter</a></li>
          </ul>
        </TabPane>
      </Tabs>
    );

  }
}
