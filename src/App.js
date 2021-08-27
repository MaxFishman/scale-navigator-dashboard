import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Workspace from "./components/Workspace/Workspace";
import { ScaleContext } from "./components/Context/ScaleContext";
import { ChordContext } from "./components/Context/ChordContext";
import Navigator from "./components/Navigation/Navigator/Navigator";
import React, { useState, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Chords from "components/ToneJS/Chord";

function App() {
  const [scaleData, setScaleData] = useState({
    scale: "c_diatonic",
  });
  const [chordData, setChordData] = useState({
    playing: false,
  });
  // TODO(mjmaurer): I think ideally workspace shouldn't have to know
  // about the navigator, but right now it's surface is pretty large.
  const navRef = useRef(new Navigator.Navigator(setScaleData));
  navRef.current.scaleDataCallback(setScaleData);

  return (
    <div className="appcontainer">
      <div className="contentcontainer">
        <Chords
          navigator={navRef.current}
          scaleData={scaleData}
          chordData={chordData}
        ></Chords>
        <Router>
          <ChordContext.Provider
            value={{
              chordData,
              setChordData,
            }}
          >
            <ScaleContext.Provider
              value={{
                ...scaleData,
                navigator: navRef.current,
              }}
            >
              <Navigation />
              <Workspace />
            </ScaleContext.Provider>
          </ChordContext.Provider>
        </Router>
      </div>
    </div>
  );
}

export default App;
