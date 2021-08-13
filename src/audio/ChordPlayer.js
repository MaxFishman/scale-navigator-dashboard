import * as Tone from "tone"

const midiToHz = (midiNote) => {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
};

export default class ChordPlayer {
  constructor(navigator) {
    this.synths = [];
    this.navigator = navigator;
    this.navigator.onChangeMainScale(() => {
      if (this.playing) {
        this.play();
      }
    });
    this.playing = false;
  }

  setPlaying(playing) {
    this.playing = playing;
    console.log(playing);
    if (playing) {
      this.play();
    } else {
      this.stop();
    }
  }

  stop() {
    for (let synth of this.synths) {
      synth.triggerRelease();
    }
    this.synths = [];
  }

  play() {
    this.stop();

    const chord = this.navigator.chord_chooser.current_chord;
    const notes = chord.original_voicing;
    for (let note of notes) {
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttack(midiToHz(note), "8n");
      this.synths.push(synth);
    }
  }
}

