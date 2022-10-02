import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import About from "./About/About";
import Chords from "./Chords/Chords";
import Ensemble from "./Ensemble/Ensemble";
import Tablature from "./Tablature/Tablature";
import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import ROUTES from "common/Routes";
import { Provider, KeepAlive } from "react-keep-alive";
import Tabs from "components/Tabs";
import Visualization from "./Visualization";
import AccountLanding from "./AccountLanding";
import LoginModal from "components/LoginModal";
import SignUpModal from "components/SignUpModal";
import Checkboxes from "./Checkboxes";

import "react-tabs/style/react-tabs.css";
import "./Workspace.scss";

export default function Workspace() {
    const dispatch = useDispatch();
    const { chordData, scaleData } = useSelector((state) => state.root);
    const setScaleData = (payload) =>
        dispatch({ type: "SET_SCALE_DATA", payload });
    const setChordData = (payload) =>
        dispatch({ type: "SET_CHORD_DATA", payload });

    const location = useLocation();

    const classNames = classnames("workspace", {
        "is-visible": location.pathname !== "/",
    });

    return (
        <div className={classNames}>
            <Tabs className="desktop" />

            <div className="workspace__content">
                <Switch>
                    <Route path={ROUTES.SIGN_IN}>
                        <LoginModal />
                    </Route>
                    <Route path={ROUTES.SIGN_UP}>
                        <SignUpModal />
                    </Route>

                    <Route path={ROUTES.ENSEMBLE}>
                        <Ensemble />
                    </Route>

                    <Route path={ROUTES.TABLATURE}>
                        <Tablature />
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
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <Checkboxes />
                                    <Visualization />
                                </div>
                            </KeepAlive>
                        </Provider>
                    </Route>

                    <Route path={ROUTES.ABOUT}>
                        <About />
                    </Route>

                    <Route path={ROUTES.ACCOUNT}>
                        <AccountLanding />
                    </Route>

                    {window.innerWidth > 960 && (
                        <Route exact path="/">
                            <Redirect to={ROUTES.ABOUT} />
                        </Route>
                    )}
                </Switch>
            </div>
        </div>
    );
}
