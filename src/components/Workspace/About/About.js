import React from "react";
import { Link } from "react-router-dom";
import Figure from "react-bootstrap/Figure";

import "./About.scss";

import acoustic from "./shape_svgs/acoustic.svg";
import diatonic from "./shape_svgs/diatonic.svg";
import harmonic_major from "./shape_svgs/harmonic_major.svg";
import harmonic_minor from "./shape_svgs/harmonic_minor.svg";
import hexatonic from "./shape_svgs/hexatonic.svg";
import octatonic from "./shape_svgs/octatonic.svg";
import whole_tone from "./shape_svgs/whole_tone.svg";

const About = () => (
    <div className="page-about">
        <div>
            <h2>About</h2>

            <p>
                <strong>Scale Navigator Dashboard</strong> is a web app for
                exploring musical harmony! Use it to:
            </p>

            <ul id="activities">
                <li>
                    Creatively <strong>compose</strong> music
                </li>
                <li>
                    <strong>Improvise</strong> melodies, chords, riffs,
                    progressions, and phrases
                </li>
                <li>
                    Learn <strong>music theory</strong> concepts
                </li>
                <li>
                    Stay <strong>harmonically synchronized</strong> while
                    jamming in <strong>ensembles</strong> with your friends
                </li>
                <li>
                    Connect with <strong>Scale Navigator MIDI VST</strong> to
                    harmonically synchronize your <strong>DAW</strong>
                </li>
            </ul>

            <p>
                Scale Navigator makes harmony accessible by giving users
                tangible harmonic objects to <em>play with</em>, and placing
                these objects within an easy-to-understand and easy-to-navigate
                framework. Even as an instrumentalist, it takes work to
                physically learn scales / chords before you can actually{" "}
                <em>hear them</em>; and if you {`can't`} play an instrument,
                these things can be locked away. Scale Navigator unlocks these
                harmonic concepts by giving them form, and by placing them in
                context.
            </p>

            <p>
                Scale Navigator represents scales as icons. A scale {`icon's`}
                polygonal shape indicates its scale class:
            </p>

            <div id="scale_table">
                <Figure className="scale_fig">
                    <Figure.Image
                        alt="diatonic scale class icon"
                        src={diatonic}
                    />
                    <Figure.Caption className="figurecaption">
                        <a href="https://en.wikipedia.org/wiki/Diatonic_scale">
                            diatonic
                        </a>
                    </Figure.Caption>
                </Figure>

                <Figure className="scale_fig">
                    <Figure.Image
                        alt="acoustic scale class icon"
                        src={acoustic}
                    />
                    <Figure.Caption className="figurecaption">
                        <a href="https://en.wikipedia.org/wiki/Acoustic_scale">
                            acoustic
                        </a>
                    </Figure.Caption>
                </Figure>

                <Figure className="scale_fig">
                    <Figure.Image
                        alt="harmonic major scale class icon"
                        src={harmonic_major}
                    />
                    <Figure.Caption className="figurecaption">
                        <a href="https://en.wikipedia.org/wiki/Harmonic_major_scale">
                            harmonic
                            <br />
                            major
                        </a>
                    </Figure.Caption>
                </Figure>

                <Figure className="scale_fig">
                    <Figure.Image
                        alt="harmonic minor scale class icon"
                        src={harmonic_minor}
                    />
                    <Figure.Caption className="figurecaption">
                        <a href="https://en.wikipedia.org/wiki/Minor_scale#Harmonic_minor_scale">
                            harmonic
                            <br />
                            minor
                        </a>
                    </Figure.Caption>
                </Figure>

                <Figure className="scale_fig">
                    <Figure.Image
                        alt="whole tone scale class icon"
                        src={whole_tone}
                    />
                    <Figure.Caption className="figurecaption">
                        <a href="https://en.wikipedia.org/wiki/Whole_tone_scale">
                            whole
                            <br />
                            tone
                        </a>
                    </Figure.Caption>
                </Figure>

                <Figure className="scale_fig">
                    <Figure.Image
                        alt="octatonic scale class icon"
                        src={octatonic}
                    />
                    <Figure.Caption className="figurecaption">
                        <a href="https://en.wikipedia.org/wiki/Octatonic_scale">
                            octatonic
                        </a>
                    </Figure.Caption>
                </Figure>

                <Figure className="scale_fig">
                    <Figure.Image
                        alt="hexatonic scale class icon"
                        src={hexatonic}
                    />
                    <Figure.Caption className="figurecaption">
                        <a href="https://en.wikipedia.org/wiki/Hexatonic_scale#Augmented_scale">
                            hexatonic
                        </a>
                    </Figure.Caption>
                </Figure>
            </div>

            <p>{`A scale icon's color indicates its root:`}</p>
            <br />

            <div id="circle_container">
                <div className="root_heading" id="root_f">
                    F
                </div>
                <div className="root_heading" id="root_c">
                    C
                </div>
                <div className="root_heading" id="root_g">
                    G
                </div>
                <div className="root_heading" id="root_d">
                    D
                </div>
                <div className="root_heading" id="root_a">
                    A
                </div>
                <div className="root_heading" id="root_e">
                    E
                </div>
                <div className="root_heading" id="root_b">
                    B
                </div>
                <div className="root_heading" id="root_fs">
                    F#
                </div>
                <div className="root_heading" id="root_df">
                    D♭
                </div>
                <div className="root_heading" id="root_af">
                    A♭
                </div>
                <div className="root_heading" id="root_ef">
                    E♭
                </div>
                <div className="root_heading" id="root_bf">
                    B♭
                </div>
            </div>

            <p>
                {`Users can travel (or "modulate") to a new scale by clicking on
                its scale icon in the Navigator interface. The current selected
                scale is in the center, radially surrounded by adjacent neighbor
                scales. Each neighbor scale shares all notes in common with the
                current scale save for one, i.e., each neighbor scale differs
                from the current scale by a single note. Enable autopilot (in
                the infobox below the Navigator interface) to automatically
                select a new current scale&mdash;adjust the autopilot slider to
                change the rate at which the autopilot selects a new scale.`}
            </p>

            <p>
                {`The Navigator interface displays the local harmonic context as
                it relates to the current selected scale. A bird's eye view of
                all of the scales as they relate to one another can be seen in
                the <Link to="scale-network">Visualization tab</Link>, which
                desplays all of the scale icons in a network graph.`}
            </p>

            <p>
                Make music with your friends by creating or joining an ensemble
                in the <Link to="ensemble">Ensemble tab</Link>.
            </p>

            <p>
                Select an instrument with which to compose or improvise music in
                the <Link to="tablature">Tablature tab</Link>.
            </p>

            <p>
                In the words of Dmitri Tymoczko,{" "}
                {`"New scales [provide] access to
                new chords, while new chords, in turn, [suggest] new scales."`}
                Use the <Link to="chords">Chords tab</Link> to generate chords
                within the context of the current selected scale.
            </p>

            <h2>Further Reading</h2>
            <p>
                Scale Navigator was the subject of my graduate thesis at
                California Institute of the Arts:{" "}
                <a href="https://mtiid.calarts.edu/wp-content/uploads/2020/03/Turczan_MFA_Thesis.pdf">
                    “The Scale Navigator: A Synesthetic Interface for
                    Manipulating Harmony in Composition, Performance and
                    Installation”
                </a>{" "}
                describes not only Scale {`Navigator's`} design, but also its
                use as a music compositional assistive tool, a performance tool,
                and as a framework&mdash;and interface&mdash;for interactive
                multimedia installations. I later presented this work at the{" "}
                <a href="https://www.nime.org/proceedings/2019/nime2019_paper020.pdf">
                    New Interfaces for Musical Expression conference
                </a>{" "}
                in June 2019.
            </p>
            <p>
                Scale Navigator is built entirely on the foundation laid by
                Dmitri Tymoczko in his paper{" "}
                <a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">
                    Scale Networks and Debussy
                </a>
                . To read more about scale networks, this time in a jazz
                context, check out{" "}
                <a href="https://music.arts.uci.edu/abauer/3.1/notes/Chord-Scale_Networks.pdf">
                    Chord-Scale Networks in the Music and Improvisations of
                    Wayne Shorter
                </a>{" "}
                by Garrett Michaelsen.
            </p>

            <p style={{ "text-align": "right" }}>
                &mdash; Nathan Turczan, September 2021
            </p>

            <h2>Credits</h2>
            <ul id="credits">
                <li>
                    <a href="https://hapy.space/">Nate Ben</a>
                </li>
                <li>
                    <a href="https://bboettcher3.github.io/">Brady Boettcher</a>
                </li>
                <li>
                    <a href="https://popleap.dev/">Scott Devereux</a>
                </li>
                <li>
                    <a href="https://nathan.ho.name/">Nathan Ho</a>
                </li>
                <li>
                    <a href="https://colinhonigman.com/">Colin Honigman</a>
                </li>
                <li>
                    <a href="https://github.com/mjmaurer">Michael Maurer</a>
                </li>

                <li>
                    <a href="https://github.com/rudytak">Ondřej Sedláček</a>
                </li>
                <li>
                    <a href="https://dexterjshepherd.com/">Dexter Shepherd</a>
                </li>
                <li>
                    <a href="https://nathanturczan.com">Nathan Turczan</a>
                </li>
            </ul>
        </div>
    </div>
);

export default About;
