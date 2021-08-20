import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Workspace from "./components/Workspace/Workspace";
import { ScaleContext } from "./components/Context/ScaleContext";
import Navigator from "./components/Navigation/Navigator/Navigator";
import React, { useState, useRef } from "react";

function App() {
  const [scaleData, setScaleData] = useState({
    scale: "c_diatonic",
  });
  // TODO(mjmaurer): I think ideally workspace shouldn't have to know
  // about the navigator, but right now it's surface is pretty large.
  const navRef = useRef(new Navigator.Navigator(setScaleData));
  navRef.current.scaleDataCallback(setScaleData);

  return (
    <div className="App">
      <div id="grid">
        <ScaleContext.Provider
          value={{
            ...scaleData,
            navigator: navRef.current,
          }}
        >
          <Navigation />
          <Workspace />
        </ScaleContext.Provider>
      </div>
    </div>
  );
}

export default App;
