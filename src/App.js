import React from "react";
import { Provider } from 'react-redux'
import store from './store'
import NavigationLanding from "./components/NavigationLanding";
import Workspace from "./components/Workspace/Workspace";
import { BrowserRouter as Router } from "react-router-dom";
import Chords from "components/ToneJS/Chord";
import { Container, Row, Col } from 'reactstrap';
import { withAuthentication, AuthUserContext } from 'components/Session';
import Modal from 'react-modal';


import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";

Modal.setAppElement('#modal-root');
Modal.defaultStyles.overlay.backgroundColor = 'rgb(0 0 0 / 65%)';
Modal.defaultStyles.overlay.zIndex = 123

const App = () => (
    <Provider store={store}>
        <Router>
            <Container fluid>
                <Row>
                    <Chords/>
                       <AuthUserContext.Consumer>
                         {authUser => ( 
                         <Col xs="12" md="5">
                           <NavigationLanding user={authUser} />
                          </Col>
                           )}
                          </AuthUserContext.Consumer> 
                         <Col xs="12" md="7">
                        <Workspace />
                    </Col>
                </Row>
            </Container>
        </Router>
    </Provider>
);

export default withAuthentication (App);
