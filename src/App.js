import React, { useEffect } from "react";
import { withFirebase } from "./components/Firebase";
import { compose } from "recompose";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Modal from "react-modal";
import { withAuthentication, AuthUserContext } from "components/Session";
import Navigation from "./components/Navigation/Navigation";
import Workspace from "./components/Workspace/Workspace";
import { BrowserRouter as Router } from "react-router-dom";
import Chords from "components/ToneJS/Chord";
import MidiPersist from "components/Workspace/Chords/MidiPersist";
import { KeepAwake } from "@capacitor-community/keep-awake";

Modal.setAppElement("#modal-root");
Modal.defaultStyles.overlay.backgroundColor = "rgb(0 0 0 / 65%)";
Modal.defaultStyles.overlay.zIndex = 123;

const startScreenKeepAwake = async () => {
    const result = await KeepAwake.isSupported();
    if (result.isSupported) {
        await KeepAwake.keepAwake();
    }
};

startScreenKeepAwake();

const App = ({ firebase }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        if (!authUser) return;
        firebase
            .user(authUser.uid)
            .get()
            .then((doc) => {
                dispatch({
                    type: "HYDRATE_FIREBASE_DATA",
                    payload: doc.data(),
                });
                dispatch({ type: "SET_AUTH_USER", payload: authUser.userName });
            });
    }, [firebase, dispatch]);

    return (
        <>
            <Chords />
            <MidiPersist />
            <Router>
                <Container fluid>
                    <Row>
                        <Col xs="12" sm="12" md="5">
                            <AuthUserContext.Consumer>
                                {(authUser) => (
                                    <Navigation authUser={authUser} />
                                )}
                            </AuthUserContext.Consumer>
                        </Col>

                        <Col xs="12" sm="12" md="7">
                            <Workspace />
                        </Col>
                    </Row>
                </Container>
            </Router>
        </>
    );
};

export default compose(withAuthentication, withFirebase)(App);
