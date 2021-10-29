import Firebase from '../../components/Firebase'

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

const userData = {}
const tabData = []
const ensembleHostRoomId = undefined;
const isEnsembleMember = false;

const initialState = {
    userData,
    chordData,
    scaleData,
    tabData,
    ensembleHostRoomId,
    isEnsembleMember
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "HYDRATE_FIREBASE_DATA": {
            return {
                ...state,
                userData: action.payload
            };
        }

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

        case "SET_ENSEMBLE_HOST_ROOM_ID": {
            return {
                ...state,
                userData: {
                    ...userData,
                    ensembleHostRoomId: action.payload
                }
            }
        }

        case "SET_IS_ENSEMBLE_MEMBER": {
            return {
                ...state,
                isEnsembleMember: action.payload
            }
        }

        default:
            return state;
    }
};
