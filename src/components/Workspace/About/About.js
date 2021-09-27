import React from "react";
import "./About.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import Figure from "react-bootstrap/Figure";
import Modal from "react-modal";

import network from "./assets/twodnetwork.png";
import fifths from "./assets/circleoffifths.png";
import debussy from "./assets/debussy_analysis.png";
import pressingcircle from "./assets/pressing_circle.png";
import scales from "./assets/scales.svg";
import intersects from "./assets/seven_note_intersects.svg";
import lattice from "./assets/seven_note_lattice.png";

import acoustic from "./shape_svgs/acoustic.svg";
import diatonic from "./shape_svgs/diatonic.svg";
import harmonic_major from "./shape_svgs/harmonic_major.svg";
import harmonic_minor from "./shape_svgs/harmonic_minor.svg";
import hexatonic from "./shape_svgs/hexatonic.svg";
import octatonic from "./shape_svgs/octatonic.svg";
import whole_tone from "./shape_svgs/whole_tone.svg";

const MyContentStyles = {
  backgroundColor: "white",
  color: "black",
  padding: "20px 40px",
};

export default class About extends React.Component {
  render() {
    return (
      <>
        <article>
          <h2>About</h2>

          <p>
            <strong>Scale Navigator Dashboard</strong> is a web app for
            exploring musical harmony! Use it to:
          </p>

          <ul>
            <li>
              creatively <strong>compose</strong> music
            </li>
            <li>
              <strong>Improvise</strong> melodies, chords, riffs, and phrases
            </li>
            <li>
              Learn <strong>music theory</strong> concepts
            </li>
            <li>
              Stay <strong>harmonically synchronized</strong> while jamming in{" "}
              <strong>ensembles</strong> with your friends
            </li>
            <li>
              Connect with <strong>Scale Navigator MIDI VST</strong> to
              harmonically synchronize your DAW
            </li>
          </ul>

          <p>
            <strong>Scale Navigator</strong> makes harmony accessible by giving
            users tangible harmonic objects to <em>play with</em>, and placing
            these objects within an easy-to-understand and easy-to-navigate
            framework. Even as an instrumentalist, it takes work to physically
            learn new musical concepts such as scales and chords before you can
            really <em>hear them</em>; and if you aren't a traditional
            instrumentalist, these things can be locked away.
          </p>

          <p>
            <strong>Scale Navigator</strong> represents Musical scales as icons.
            A scale icon's polygonal shape indicates its scale class:
          </p>

          <div id="scale_table">
            <Figure class="scale_fig">
              <Figure.Image alt="diatonic scale class icon" src={diatonic} />
              <Figure.Caption style={{ "text-align": "center" }}>
                diatonic
              </Figure.Caption>
            </Figure>

            <Figure class="scale_fig">
              <Figure.Image alt="acoustic scale class icon" src={acoustic} />
              <Figure.Caption style={{ "text-align": "center" }}>
                acoustic
              </Figure.Caption>
            </Figure>

            <Figure class="scale_fig">
              <Figure.Image
                alt="harmonic major scale class icon"
                src={harmonic_major}
              />
              <Figure.Caption style={{ "text-align": "center" }}>
                harmonic major
              </Figure.Caption>
            </Figure>

            <Figure class="scale_fig">
              <Figure.Image
                alt="harmonic minor scale class icon"
                src={harmonic_minor}
              />
              <Figure.Caption style={{ "text-align": "center" }}>
                harmonic minor
              </Figure.Caption>
            </Figure>

            <Figure class="scale_fig">
              <Figure.Image
                alt="whole tone scale class icon"
                src={whole_tone}
              />
              <Figure.Caption style={{ "text-align": "center" }}>
                whole tone
              </Figure.Caption>
            </Figure>

            <Figure class="scale_fig">
              <Figure.Image alt="octatonic scale class icon" src={octatonic} />
              <Figure.Caption style={{ "text-align": "center" }}>
                octatonic
              </Figure.Caption>
            </Figure>

            <Figure class="scale_fig">
              <Figure.Image alt="hexatonic scale class icon" src={hexatonic} />
              <Figure.Caption style={{ "text-align": "center" }}>
                hexatonic
              </Figure.Caption>
            </Figure>
          </div>

          <p>A scale icon's color indicates its root:</p>

          <div id="root_table">
          <div class ="root_heading" id="root_f">F</div>
          <div class ="root_heading" id="root_c">C</div>
          <div class ="root_heading" id="root_g">G</div>
          <div class ="root_heading" id="root_d">D</div>
          <div class ="root_heading" id="root_a">A</div>
          <div class ="root_heading" id="root_e">E</div>
          <div class ="root_heading" id="root_b">B</div>
          <div class ="root_heading" id="root_fs">F#</div>
          <div class ="root_heading" id="root_df">D♭</div>
          <div class ="root_heading" id="root_af">A♭</div>
          <div class ="root_heading" id="root_ef">E♭</div>
          <div class ="root_heading" id="root_bf">B♭</div>
          <div class ="root_heading" id="root_f">F</div>

          </div>

          <p>
            The basics of the interface are as follows: each scale in the Scale
            Navigator is represented by a clickable polygonal-shaped node. The
            selected scale is in the center, radially surrounded by adjacent
            neighbor scales. Clicking on an adjacent scale selects a new scale.
            A <a href="https://www.vexflow.com/">VexFlow</a> display in the
            upper left corner shows the notes of the selected scale on a treble
            staff.
          </p>

          <h2>Further Reading</h2>
          <p>
            The <strong>Scale Navigator</strong> was the subject of my graduate
            thesis at California Institute of the Arts:{" "}
            <a href="https://mtiid.calarts.edu/wp-content/uploads/2020/03/Turczan_MFA_Thesis.pdf">
              “The Scale Navigator: A Synesthetic Interface for Manipulating
              Harmony in Composition, Performance and Installation”
            </a>{" "}
            describes not only the <strong>Scale Navigator</strong>'s design,
            but also its use as a music compositional assistive tool, a
            performance tool, and as an interface for interacting with
            multimedia installations. I later presented this work at the{" "}
            <a href="https://www.nime.org/proceedings/2019/nime2019_paper020.pdf">
              New Interfaces for Musical Expression conference
            </a>{" "}
            in June of 2019.{" "}
          </p>

          <p>&mdash; Nathan Turczan, Sept 2021</p>

          <ul>
            <li>
              <a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">
                Scale Networks and Debussy
              </a>
            </li>
            <li>
              <a href="https://music.arts.uci.edu/abauer/3.1/notes/Chord-Scale_Networks.pdf">
                Chord-Scale Networks in the Music and Improvisations of Wayne
                Shorter
              </a>
            </li>
          </ul>
          <h2>Credits</h2>
          <ul id="credits">
            <li>Nate Ben</li>
            <li>Brady Boettcher</li>
            <li>Scott Devereux</li>
            <li>Nathan Ho</li>
            <li>Colin Honigman</li>
            <li>Michael Maurer</li>
            <li>Nathan Turczan</li>
            <li>Ondřej Sedláček</li>
            <li>Dexter Shepherd</li>
          </ul>
        </article>
      </>
    );
  }
}
