import Pfivesketch from "../../Navigation/Navigator/Pfivesketch";
import Data from "../../../Data";

import showPianoNotes from "./tablature_scripts/pianoscript"
import displayFluteDiagrams from "./tablature_scripts/flutescript"
import showGuitarNotes from "./tablature_scripts/guitarscript"
import showCircleChords from "./tablature_scripts/chordcirclescript"

import $ from "jquery";

function TablatureManager() {
    $(document).ready(function() {
        $('#select_instrument').on('change', function() {
            if (this.value === '0') {
                $("#mandolin_container").show();
            } else if (this.value === '1') {
                $("#guitar_container").show();
            } else if (this.value === '2') {
                $("#banjo_container").show();
            } else if (this.value === '3') {
                $("#ukulele_container").show();
            } else if (this.value === '4') {
                $("#flute_container").show();
            } else if (this.value === '5') {
                $("#piano_container").show();
            } else if (this.value === '6') {
                $("#notation_container").show();
            } else if (this.value === '7') {
                $("#chordstext_container").show();
            } else if (this.value === '8') {
                $("#chordcircle_container").show();
            } else if (this.value === '9') {
                $("#snharp_container").show();
            }
        });
    });

    this.setScale = (key = Pfivesketch.p5.random(Object.keys(Data.data["scales"]))) => {
        var keyData = Data.data["scales"][key]

        showPianoNotes(keyData.pitch_classes);
        displayFluteDiagrams(keyData.pitch_classes);
        showGuitarNotes(keyData.pitch_classes);
        showCircleChords(keyData.chords);

        return [key, keyData]
    }
}

export default TablatureManager;