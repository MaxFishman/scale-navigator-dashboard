import { useSelector, useDispatch } from 'react-redux'
import classnames from "classnames";
import About from "./About/About";
import Chords from "./Chords/Chords";
import Ensemble from "./Ensemble/Ensemble";
import Tablature from "./Tablature/Tablature";
// import Visualization from "./Visualization/Visualization";
import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import ROUTES from "common/Routes";
import {
  Provider,
  KeepAlive,
} from 'react-keep-alive';
import Tabs from "components/Tabs";
import Visualization from "./Visualization/Visualization";

import "react-tabs/style/react-tabs.css";
import "./Workspace.scss";
import SignUp from './SignUp'
import SignIn from './SignIn'
import AccountLanding from './AccountLanding'


export default function Workspace() {
    const dispatch = useDispatch()
    const { chordData, scaleData } = useSelector(state => state.root)
    const setScaleData = (payload) => dispatch({ type: 'SET_SCALE_DATA', payload })
    const setChordData = (payload) => dispatch({ type: 'SET_CHORD_DATA', payload })

    const location = useLocation();

    const classNames = classnames('workspace', {
        'is-visible': location.pathname !== '/'
    })

    return (
        <div className={classNames}>
            <Tabs className="desktop"/>

            <div className="workspace__content">
                <Switch>
                    <Route path={ROUTES.SIGN_IN}>
                        <SignIn/>
                    </Route>
                    <Route path={ROUTES.SIGN_UP}>
                        <SignUp/>
                    </Route>

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
                        <Provider>
                        <KeepAlive name="Visualization">
                            <div className="navigation__scalenav visu-wrapper" id="canv_container_visu">
                            <Visualization />
                            </div>
                        </KeepAlive>
                        </Provider>
                    </Route>

                    <Route path={ROUTES.ABOUT}>
                        <About/>
                    </Route>

                    <Route path={ROUTES.ACCOUNT}>
                        <AccountLanding/>
                    </Route>

                    {window.innerWidth > 960 &&
                        <Route exact path="/">
                            <Redirect to={ROUTES.ABOUT} />
                        </Route>
                    }
                </Switch>
            </div>
        </div>
    );
}
