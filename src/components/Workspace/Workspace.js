import "react-tabs/style/react-tabs.css";
import About from "./About/About";
import Chords from "./Chords/Chords";
import Ensemble from "./Ensemble/Ensemble";
import Tablature from "./Tablature/Tablature";
import React, { useContext } from "react";
import { app } from "../../config/base";
import { ScaleContext } from "../Context/ScaleContext";
import { Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import ROUTES from "common/Routes";
import "./Workspace.scss";
import classNames from "classnames";
import { ChordContext } from "components/Context/ChordContext";

export default function Workspace() {
  const { scaleData, setScaleData } = useContext(ScaleContext);
  const { chordData, setChordData } = useContext(ChordContext);
  const location = useLocation();
  const routes = {
    Ensemble: ROUTES.ENSEMBLE,
    Tablature: ROUTES.TABLATURE,
    Chords: ROUTES.CHORDS,
    MIDI: ROUTES.MIDI,
    Notepad: ROUTES.NOTEPAD,
    Visualization: ROUTES.SCALENET,
    About: ROUTES.ABOUT,
    Account: ROUTES.ACCOUNT,
  };
  return (
    <div className="workspace">
      <nav className="workspace__navwrap">
        <ol className="workspace__nav">
          {Object.entries(routes).map((nameroute) => {
            return (
              <li
                className={classNames("workspace__navitem", {
                  "workspace__navitem--on": location.pathname === nameroute[1],
                })}
              >
                <Link to={nameroute[1]}>{nameroute[0]}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
      <div className="workspace__content">
        <Switch>
          <Route exact path="/">
            <Redirect to={ROUTES.ABOUT} />
          </Route>
          <Route path={ROUTES.ENSEMBLE}>
            <Ensemble></Ensemble>
          </Route>
          <Route path={ROUTES.TABLATURE}>
            <Tablature></Tablature>
          </Route>
          <Route path={ROUTES.CHORDS}>
            <Chords
              scaleData={scaleData}
              setScaleData={setScaleData}
              chordData={chordData}
              setChordData={setChordData}
            />
          </Route>
          <Route path={ROUTES.MIDI}>
            <p>MIDI Component</p>
          </Route>
          <Route path={ROUTES.NOTEPAD}>
            <p>Notepad Component</p>
          </Route>
          <Route path={ROUTES.SCALENET}>
            <p>Scale Network Component</p>
          </Route>
          <Route path={ROUTES.ACCOUNT}>
            <p>Account Component</p>
          </Route>
          <Route path={ROUTES.ABOUT}>
            <About></About>
          </Route>
        </Switch>
      </div>
    </div>
  );
}
