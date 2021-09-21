import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Workspace from "./components/Workspace/Workspace";
import { ScaleContext } from "./components/Context/ScaleContext";
import { ChordContext } from "./components/Context/ChordContext";
import { BrowserRouter as Router } from "react-router-dom";
import Chords from "components/ToneJS/Chord";
import { Container, Row, Col } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.scss";

const App = () => {
    const [tabData, setTabData] = useState([]);

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

    const chordContext = {
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
    }

    const scaleContext = {
        scaleData,
        tabData,
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
        setTablatureInstruments: (data) => {
            // setTabData([
            //     ...tabData,
            //     ...data
            // ])
            setTabData(data)
        }
    }

    return (
        <ChordContext.Provider value={chordContext}>
            <ScaleContext.Provider value={scaleContext}>
                <Router>
                    <Container fluid>
                        <Row>
                            <Chords/>
                            <Col xs="12" md="5">
                                <Navigation />
                            </Col>

                            <Col xs="12" md="7">
                                <Workspace />
                            </Col>
                        </Row>
                    </Container>
                </Router>
            </ScaleContext.Provider>
        </ChordContext.Provider>
    );
}

export default App;
