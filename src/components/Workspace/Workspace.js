import "react-tabs/style/react-tabs.css";
import classnames from "classnames";
import About from "./About/About";
import Chords from "./Chords/Chords";
import Ensemble from "./Ensemble/Ensemble";
import Tablature from "./Tablature/Tablature";
import React, { useContext } from "react";
import { app } from "../../config/base";
import { ScaleContext } from "../Context/ScaleContext";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import ROUTES from "common/Routes";
import { ChordContext } from "components/Context/ChordContext";
import Tabs from "components/Tabs";

import "./Workspace.scss";

export default function Workspace() {
  const location = useLocation();
  const { scaleData, setScaleData } = useContext(ScaleContext);
  const { chordData, setChordData } = useContext(ChordContext);
  const classNames = classnames('workspace', {
    'is-visible': location.pathname !== '/'
  })

  return (
    <div className={classNames}>
      <Tabs className="desktop"/>

      <div className="workspace__content">
        <Switch>
          <Route path={ROUTES.ENSEMBLE}>
            <Ensemble/>
          </Route>

          <Route path={ROUTES.TABLATURE}>
            <Tablature/>
          </Route>

          <Route path={ROUTES.CHORDS}>
            <Chords
              scaleData={scaleData}
              setScaleData={setScaleData}
              chordData={chordData}
              setChordData={setChordData}
            />
          </Route>

          <Route path={ROUTES.SCALENET}>
            <p>Scale Network Component</p>
          </Route>

          <Route path={ROUTES.ABOUT}>
            <About/>
          </Route>

          <Route path={ROUTES.ACCOUNT}>
            <p>Account Component</p>
          </Route>

          {window.innerWidth > 960 &&
            <Route exact path="/">
              <Redirect to={ROUTES.ABOUT} />
            </Route>}
        </Switch>
      </div>
    </div>
  );
}
