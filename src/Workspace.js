const Workspace = () => {
  return(
      <div id="workspace">
        <div className="tab">
          <button className="tablinks" onClick="openTab(event, 'Tablature')">tablature</button>
          <button className="tablinks" onClick="openTab(event, 'MIDI')">MIDI</button>
          <button className="tablinks" onClick="openTab(event, 'Notepad')">notepad</button>
          <button className="tablinks" onClick="openTab(event, 'ScaleNetVis'), resizeGraph(), selectExternally(key)">scale network visualization</button>
          <button className="tablinks" onClick="openTab(event, 'Account')">account</button>
          <button className="tablinks" onClick="openTab(event, 'About')">about</button>
        </div>
        <div id="Tablature" className="tabcontent">
          
        </div>
        <div id="MIDI" className="tabcontent">

        </div>

        <div id="Notepad" className="tabcontent">

        </div>

        <div id="ScaleNetVis" className="tabcontent">

        </div>

        <div id="Account" className="tabcontent">
          <h3>account info?</h3>
        </div>

        <div id="About" className="tabcontent">
          <ul>
            <li><a href="https://mtiid.calarts.edu/wp-content/uploads/2020/03/Turczan_MFA_Thesis.pdf">The Scale Navigator: A Synesthetic Interface for Manipulating Harmony in Composition, Performance and Installation</a></li>
            <li><a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">Scale Networks and Debussy</a></li>
            <li><a href="https://music.arts.uci.edu/abauer/3.1/notes/Chord-Scale_Networks.pdf">Chord-Scale Networks in the Music and Improvisations of Wayne Shorter</a></li>
          </ul>
        </div>
      </div>
    );
}

export default Workspace;