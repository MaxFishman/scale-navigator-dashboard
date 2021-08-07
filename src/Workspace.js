import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MIDI from './MIDI';

const Workspace = () => {
  return(
      <div id="workspace">
        <Tabs>
    <TabList>
      <Tab>Tablature</Tab>
      <Tab>MIDI</Tab>
      <Tab>Notepad</Tab>
      <Tab>Scale Network Visualization</Tab>
      <Tab>Account</Tab>
      <Tab>About</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
    <TabPanel>
      <h2>notepad for musical ideas</h2>
    </TabPanel>
    <TabPanel>
      <h2>insert scale network vis here</h2>
    </TabPanel>
    <TabPanel>
      <h3>account info?</h3>
    </TabPanel>
    <TabPanel>
      <ul>
        <li><a href="https://mtiid.calarts.edu/wp-content/uploads/2020/03/Turczan_MFA_Thesis.pdf">The Scale Navigator: A Synesthetic Interface for Manipulating Harmony in Composition, Performance and Installation</a></li>
        <li><a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">Scale Networks and Debussy</a></li>
        <li><a href="https://music.arts.uci.edu/abauer/3.1/notes/Chord-Scale_Networks.pdf">Chord-Scale Networks in the Music and Improvisations of Wayne Shorter</a></li>
      </ul>
    </TabPanel>
  </Tabs>
      </div>
    );
}

export default Workspace;
