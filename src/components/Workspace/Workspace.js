import "react-tabs/style/react-tabs.css";
import About from "./About/About";
import Chords from "./Chords/Chords";
import Ensemble from "./Ensemble/Ensemble";
import Tablature from "./Tablature/Tablature";
import React from "react";
import { app } from "../../config/base";
import { ScaleContext } from "../Context/ScaleContext";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import ROUTES from "common/Routes";
import "./Workspace.scss";

export default function Workspace() {
  return (
    <div className="workspace">
      <nav>
        <ol class="workspacenav">
          <li class="workspacenav__item">
            <Link to={ROUTES.ENSEMBLE}>Ensemble</Link>
          </li>
          <li class="workspacenav__item">
            <Link to={ROUTES.TABLATURE}>Tablature</Link>
          </li>
          <li class="workspacenav__item">
            <Link to={ROUTES.CHORDS}>Chords</Link>
          </li>
          <li class="workspacenav__item">
            <Link to={ROUTES.MIDI}>MIDI</Link>
          </li>
          <li class="workspacenav__item">
            <Link to={ROUTES.NOTEPAD}>Notepad</Link>
          </li>
          <li class="workspacenav__item">
            <Link to={ROUTES.SCALENET}>Visualization</Link>
          </li>
          <li class="workspacenav__item">
            <Link to={ROUTES.ABOUT}>About</Link>
          </li>
          <li class="workspacenav__item">
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </li>
        </ol>
      </nav>
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
          <ScaleContext.Consumer>
            {({ scale, chord, navigator }) => {
              return (
                <Chords
                  scale={scale}
                  chord={chord}
                  navigator={navigator}
                  chordPlayer={this.props.chordPlayer}
                />
              );
            }}
          </ScaleContext.Consumer>
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
  );
}
