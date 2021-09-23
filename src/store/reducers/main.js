
const chordData = {
    playing: false,
    voiceLeadingSmoothness: 100,
    chord: null,
    chordName: null,
    prevoiusChord: null,
    allowedRootIntervals: [true, true, true, true, true, true, true],
}

const scaleData = {
    scale: "c_diatonic",
    scaleIndex: 0,
}

const tabData = []

const initialState = {
    chordData,
    scaleData,
    tabData
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_CHORD_DATA": {
            const newChordData = action.payload
            const previousProps = {};

            if (newChordData.chord) {
                previousProps.previousChord = state.chordData.chord;
            }

            return {
                ...state,
                chordData: {
                    ...state.chordData,
                    ...newChordData,
                    ...previousProps,
                }
            };
        }

        case "SET_SCALE_DATA": {
            const newScaleData = action.payload
            const previousProps = {};

            if (newScaleData.scale) {
                previousProps.previousScale = state.scaleData.scale;
                previousProps.scaleIndex = state.scaleData.scaleIndex + 1;
            }

            return {
                ...state,
                scaleData: {
                    ...state.scaleData,
                    ...newScaleData,
                    ...previousProps,
                }
            };
        }

        case "SET_TAB_DATA": {
            return {
                ...state,
                tabData: action.payload
            }
        }

        default:
            return state;
    }
};
