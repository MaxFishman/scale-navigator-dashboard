import React from "react";
import "./About.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import Figure from "react-bootstrap/Figure";

import network from "./assets/twodnetwork.png";
import fifths from "./assets/circleoffifths.png";
import debussy from "./assets/debussy_analysis.png";
import pressingcircle from "./assets/pressing_circle.png";
import scales from "./assets/scales.svg";
import intersects from "./assets/seven_note_intersects.svg";
import lattice from "./assets/seven_note_lattice.png";

export default class About extends React.Component {
  render() {
    return (
      <>
        <article>
          <h2>About</h2>

          <p>
            <strong>Scale Navigator</strong> makes harmony accessible by giving
            users tangible harmonic objects to play with (scales represented via
            shape, color, and position), and placing these objects within an
            easy-to-understand and easy-to-navigate framework (the scale
            network). Even for an instrumentalist, it takes work to physically
            learn new chords/scales before you can really hear them; and if you
            aren't a traditional instrumentalist, these things can be locked
            away.
          </p>

          <p>
            <strong>Scale Navigator</strong> is designed as a
            creative-composition, improvisation, and teaching tool, focused on
            families of related scales --
          </p>

          <p>
            In 2018, I read Dmitri Tymoczko's paper{" "}
            <a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">
              Scale Networks and Debussy
            </a>{" "}
            which describes Claude Debussy's harmonic language as as a
            crystalline lattice of connected scales, or "scale network" (Figure
            1). Reading this paper changed everything for me; ever since, I rely
            on the scale network framework whenever I compose music. However,
            Tymoczko's proposed scale network is complex enough that it's tough
            to hold bits of it in my head, let alone the whole thing, and so I
            found myself working out the same musical calculations by hand over
            and over again — a dead giveaway that it's time to write a computer
            program. This is how I came upon the idea to create an application
            centered around a graphical interface that could allow users to
            interact directly with the scale network, and so{" "}
            <strong>Scale Navigator</strong> was born.{" "}
          </p>

          <Figure>
            <Figure.Image alt="Scale Network" src={network} />
            <Figure.Caption style={{ "text-align": "center" }}>
              Figure 1. Scale Network of 7-note Pressing Scales, connected via
              maximal intersection
            </Figure.Caption>
          </Figure>

          <Figure>
            <div id="scale_list_container">
              <div id="shape_list_wrapper">
                <p>t</p>
                <p>t</p>
                <p>t</p>
                <p>t</p>
                <p>t</p>
                <p>t</p>
                <p>t</p>
              </div>

              <div id="scale_img_wrapper">
                <Figure.Image alt="scales" src={scales} />
              </div>
            </div>
            <Figure.Caption style={{ "text-align": "center" }}>
              Figure 4. Scales
            </Figure.Caption>
          </Figure>

          <Figure>
            <Figure.Image alt="Scale Network" src={debussy} />
            <Figure.Caption style={{ "text-align": "center" }}>
              Figure 2. Debussy
            </Figure.Caption>
          </Figure>

          <Figure>
            <Figure.Image alt="Debussy" src={pressingcircle} />
            <Figure.Caption style={{ "text-align": "center" }}>
              Figure 3. Debussy
            </Figure.Caption>
          </Figure>

          <Figure>
            <Figure.Image alt="intersects" src={intersects} />
            <Figure.Caption style={{ "text-align": "center" }}>
              Figure 5. intersects
            </Figure.Caption>
          </Figure>

          <Figure>
            <Figure.Image alt="Scale Network" src={fifths} />
            <Figure.Caption style={{ "text-align": "center" }}>
              Figure 1. Scale Network
            </Figure.Caption>
          </Figure>

          <Figure>
            <Figure.Image alt="Scale Network" src={lattice} />
            <Figure.Caption style={{ "text-align": "center" }}>
              Figure 1. Scale Network
            </Figure.Caption>
          </Figure>

          <blockquote cite="https://en.wikipedia.org/wiki/Pitch_space">
            And what is a diagram? A representation of a musical system. And we
            use a diagram so that, for students of the subject, matters which
            are hard to grasp with the hearing may appear before their eyes.
            <div class="attribution">
              <p class="author">Bacchius</p>
            </div>
          </blockquote>

          <blockquote cite="https://en.wikipedia.org/wiki/Modulation_(music)">
            Modulation is the essential part of the art. Without it there is
            little music, for a piece derives its true beauty not from the large
            number of fixed modes which it embraces but rather from the subtle
            fabric of its modulation.
            <div class="attribution">
              <p class="author">Charles-Henri Blainville</p>
            </div>
          </blockquote>

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
