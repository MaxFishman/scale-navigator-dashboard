import React from "react";
import "./About.css";
import * as img from './assets'

export default class About extends React.Component {
  render() {
    return (
      <>
        

        <article>

        <h2>About</h2>

        <p>In the summer of 2018, I came across <a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">Scale Networks and Debussy</a>, a paper by Dmitri Tymoczko that describes Claude Debussy's harmonic language as as a crystalline lattice of interlocking scales, or "scale network" (Figure 1). I was excited about the idea of creating a graphical interface that could allow users to interact directly with the scale network to explore Debussian harmony, and so the <a href="https://www.nathanturczan.com/apps/">Scale Navigator</a> (Figure 2) was born.</p>

        <p>The basics of the interface are as follows: each scale in the Scale Navigator is represented by a clickable polygonal-shaped node. The selected scale is in the center, radially surrounded by adjacent neighbor scales. Clicking on an adjacent scale selects a new scale. A <a href="https://www.vexflow.com/">VexFlow</a> display in the upper left corner shows the notes of the selected scale on a treble staff.</p>

        <p>As a multimedia artist, I am interested in synesthesia and the idea that sound, color, shape, and direction can have meaningful and persistent relationships among one another. I decided to keep synesthesia in my mind as a guiding design principle while working on the Scale Navigator, determining that the scale's class (whether it be Diatonic, Acoustic, Harmonic Major, Harmonic Minor, Octatonic, Heptatonic or Whole Tone) should govern the shape of the scale node, and the scale's root should dictate the scale node's color.</p>

        <p>While the scale network accounts for the relationship among scales, I wanted the Scale Navigator to also include a way of dealing with chords, so I added a chordal element to the interface. The Scale Navigator’s chord generator draws from a lexicon of jazz chord voicings catalogued in Bill Boyd’s <a href="https://www.amazon.com/Jazz-Chord-Progressions-Bill-Boyd/dp/0793570387">Jazz Chord Progressions</a>. To generate a new chord, the user clicks on the currently selected scale, one of its adjacent scale neighbors, or one of a list of “scalar supersets” found in the upper right of the interface. The chord generated will be a subset of the scale clicked. This selected chord is displayed in a text box in the upper right: root note followed by chord quality. Depending on the chord, this name may also include the number of an interval (e.g. 7), whether or not the fifth is altered (e.g. &#x266d 5), added chord-tones, and alterations (e.g. add &#x266f 11). Included in this chord display is the option to 'jump' in the network to the selected chord's scalar supersets: other, possibly non-adjacent scales that also contain the pitches of the chord. This enables pivot chord modulations to distant parts of the graph.</p>

        <p>Part of Boyd's taxonomy of jazz chords includes a Position designation for each chord, of which there are two: the third of the chord is the bottom note in the right hand in Position 1, and the seventh of the chord is the bottom of the right hand in Position 2. My colleague <a href="https://nathan.ho.name/">Nathan Ho</a> helped me to implement Boyd's algorithm for chord choice based on root movement (Figure 3):</p>

        <p>Boyd did not give instructions for the case of root movement by tritone, and so the authors allow for selection of a chord in any position in this case. The user can select allowable root movements using the checkboxes in the bottom left corner of the interface.</p>

        <p>Boyd's algorithm leaves us with a list of allowable next-chord candidates. <a href="https://nathan.ho.name/">Nathan Ho</a> created a voice-leading algorithm to ranks this list of candidates according to a fitness function describing the smoothness of voice leading from current chord to next chord. Chords are given a higher fitness score if the next chord has many notes in common with the current chord, or if the next chord has many notes that are stepwise to the notes of the current chord. A slider in the bottom left corner of the screen dictates which candidates get selected: when the slider is all the way to the right at 100%, only the highest ranked chords are chosen. At 0%, the chord generator picks at random from the list of chord candidates regardless of their ranking.</p>

        <p>It was important that the Scale Navigator should actually play these chords aloud, and so I used <a href="https://tonejs.github.io/">Tone.js</a> to design the synthesizer patch that the user hears when interacting with the interface in the browser &mdash; the button in the lower right corner of the interface turns this sound on and off. The Scale Navigator also takes advantage of the <a href="https://www.w3.org/TR/webmidi/">WebMIDI API</a> to send MIDI control data out to Ableton Live and TouchDesigner for audiovisual performances &mdash; choose from among your computer's MIDI drivers from the drop down menu in the bottom-center of the interface. Refer to Figure 4 for a YouTube playlist of music improvised using the Scale Navigator and routed to various digital instruments, synthesizers, and Yamaha DisKlaviers.</p>

        <p>At every point in the process of designing the Scale Navigator, I was lucky to have help from my advisors <a href="https://colinhonigman.com/">Colin Honigman</a> and <a href="https://dexterjshepherd.com/">Dexter Shepherd</a>, who were a constant source of design advice and support. In addition to teaching me computer science fundamentals, these two also contributed to this project by use-testing the Scale Navigator in its different iterations and helping to generate the dataset that describes the scale network.</p>

        <p> The scale network, much like the circle of fifths (Figure 5), is a pitch-space diagram &mdash; a visual representation of sonic relationships. To quote Bacchius, an ancient Greek music theorist: &ldquo;And what is a diagram? A representation of a musical system. And we use a diagram so that, for students of the subject, matters which are hard to grasp with the hearing may appear before their eyes.&rdquo; It is logical that the usefulness of these diagrams increase when they are made interactive. Here is my user problem: <strong>What kind of pitch-space diagram best represents the kind of harmonic relationships explored in Tymoczko's <a href="https://dmitri.mycpanel.princeton.edu/files/publications/debussy.pdf">Scale Networks and Debussy</a>, and how can users interact with this diagram? Can this interface sound good? Can it be educational?</strong></p>

        <h2>Further Reading</h2>
        <p>The Scale Navigator was the subject of my graduate thesis at California Institute of the Arts: <a href="https://mtiid.calarts.edu/wp-content/uploads/2020/03/Turczan_MFA_Thesis.pdf">“The Scale Navigator: A Synesthetic Interface for Manipulating Harmony in Composition, Performance and Installation”</a> describes not only the Scale Navigator's design, but also its use as a music compositional assistive tool, a performance tool, and as an interface for interacting with multimedia installations. I later presented this work at the <a href="https://www.nime.org/proceedings/2019/nime2019_paper020.pdf">New Interfaces for Musical Expression conference</a> in June of 2019. </p>

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

        </article>






        
      </>
    );
  }
}
