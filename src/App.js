import "./App.scss";
import Navigation from "./components/Navigation/Navigation";
import Workspace from "./components/Workspace/Workspace";
import { ScaleContext } from "./components/Context/ScaleContext";
import { ChordContext } from "./components/Context/ChordContext";
import React, { useState, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Chords from "components/ToneJS/Chord";

function App() {
  const [scaleData, setScaleData] = useState({
    scale: "c_diatonic",
    scaleIndex: 0,
  });
  const [chordData, setChordData] = useState({
    playing: false,
    voiceLeadingSmoothness: 100,
    chord: null,
    chordName: null,
    prevoiusChord: null,
    allowedRootIntervals: [true, true, true, true, true, true, true],
  });

  return (
    <div className="appcontainer">
      <div className="contentcontainer">
        <ChordContext.Provider
          value={{
            chordData,
            setChordData: (newChordData) => {
              const previousProps = {};
              if (newChordData.chord) {
                previousProps.previousChord = chordData.chord;
              }
              setChordData({
                ...chordData,
                ...newChordData,
                ...previousProps,
              });
            },
          }}
        >
          <ScaleContext.Provider
            value={{
              scaleData,
              setScaleData: (newScaleData) => {
                const previousProps = {};
                if (newScaleData.scale) {
                  previousProps.previousScale = scaleData.scale;
                  previousProps.scaleIndex = scaleData.scaleIndex + 1;
                }
                setScaleData({
                  ...scaleData,
                  ...newScaleData,
                  ...previousProps,
                });
              },
            }}
          >
            <Chords></Chords>
            <Router>
              <Navigation />
              <Workspace />
            </Router>
          </ScaleContext.Provider>
        </ChordContext.Provider>
      </div>
    </div>
  );
}

export default App;
