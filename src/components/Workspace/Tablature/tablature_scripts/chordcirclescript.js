function showCircleChords(chords) {
    var allChords = [
        "C",
        "Em",
        "G",
        "Bm",
        "D",
        "F#m",
        "A",
        "C#m",
        "E",
        "G#m",
        "B",
        "D#m",
        "F#",
        "B♭m",
        "D♭",
        "Fm",
        "A♭",
        "Cm",
        "E♭",
        "Gm",
        "B♭",
        "Dm",
        "F",
        "Am",
    ];

    var offChords = allChords.filter(function (val) {
        return chords.indexOf(val) === -1;
    });

    for (var i = 0; i < offChords.length; i++) {
        for (
            var j =
                document.getElementsByClassName(offChords[i] + "_chord")
                    .length - 1;
            j >= 0;
            --j
        ) {
            const chordElm = document.getElementsByClassName(
                offChords[i] + "_chord"
            );

            chordElm[j].setAttribute("opacity", 0.0);
        }
    }

    for (var _i = 0; _i < chords.length; _i++) {
        const chordElm = document.getElementsByClassName(chords[i] + "_chord");
        for (var _j = chordElm.length - 1; _j >= 0; --_j) {
            const chordElm = document.getElementsByClassName(
                chords[_i] + "_chord"
            );
            chordElm[_j].setAttribute("opacity", 1.0);
        }
    }
}

export default showCircleChords;
