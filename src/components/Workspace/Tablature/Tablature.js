import Pfivesketch from "../../Navigation/Navigator/Pfivesketch";
import Data from "../../../Data";

import showPianoNotes from "./tablature_scripts/pianoscript"
import displayFluteDiagrams from "./tablature_scripts/flutescript"
import showGuitarNotes from "./tablature_scripts/guitarscript"
import showCircleChords from "./tablature_scripts/chordcirclescript"

function TablatureManager() {
  try {
    this.setScale = (
      key = Pfivesketch.p5.random(Object.keys(Data.data["scales"]))
    ) => {
      var keyData = Data.data["scales"][key];

      console.log("keyData.pitch_classes :", keyData.pitch_classes);
      new showGuitarNotes(keyData.pitch_classes);
    //   new showPianoNotes(keyData.pitch_classes);
    //   new displayFluteDiagrams(keyData.pitch_classes);
    //   new showCircleChords(keyData.chords);
      
      return [key, keyData];
    };
  } catch (err) {
    console.log(err);
  }
}

export default TablatureManager;
