import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="grid">
        <div id="navigation">
          <div>
            <div id="title_container">scale navigator</div>
            <div id="logo">dashboard</div>
            <p id="author">by <a href="https://www.nathanturczan.com/">Nathan Turczan</a></p>
          </div>
          <div className="scalenav_container">
            <div id="scale_navigator"></div>
          </div>
          <div id="autopilot_container">
            <form>
              <p>autopilot checkbox</p>
            </form>
          </div>
          <div id="chatroom_container">
            <p>create ensemble chatroom</p>
            <p>select / join ensemble chatroom</p>
          </div>
        </div>
        <div id="instrument_area">
          <div class="tab">
            <button class="tablinks" onclick="openTab(event, 'Tablature')">tablature</button>
            <button class="tablinks" onclick="openTab(event, 'MIDI')">MIDI</button>
            <button class="tablinks" onclick="openTab(event, 'Notepad')">notepad</button>
            <button class="tablinks" onclick="openTab(event, 'ScaleNetVis'), resizeGraph(), selectExternally(key)">scale network visualization</button>
            <button class="tablinks" onclick="openTab(event, 'Account')">account</button>
            <button class="tablinks" onclick="openTab(event, 'About')">about</button>
          </div>
          <div id="Tablature" class="tabcontent">
            
          </div>
          <div id="MIDI" class="tabcontent">

          </div>

          <div id="Notepad" class="tabcontent">

          </div>

          <div id="ScaleNetVis" class="tabcontent">

          </div>

          <div id="Account" class="tabcontent">
            <h3>account info?</h3>
          </div>

          <div id="About" class="tabcontent">
            <ul>
              <li><a href="https://mtiid.calarts.edu/wp-content/uploads/2020/03/Turczan_MFA_Thesis.pdf">The Scale Navigator: A Synesthetic Interface for Manipulating Harmony in Composition, Performance and Installation</a></li>
              <li><a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">Scale Networks and Debussy</a></li>
              <li><a href="https://music.arts.uci.edu/abauer/3.1/notes/Chord-Scale_Networks.pdf">Chord-Scale Networks in the Music and Improvisations of Wayne Shorter</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
