import 'react-tabs/style/react-tabs.css';
import { Tabs, Row, Col, Button } from 'antd';
import About from './About/About'
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
              <About />
            </TabPane>
          </Tabs>
    );

  }
}
