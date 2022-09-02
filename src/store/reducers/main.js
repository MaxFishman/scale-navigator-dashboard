const chordData = {
    playing: false,
    voiceLeadingSmoothness: 100,
    chord: null,
    chordName: null,
    prevoiusChord: null,
    allowedRootIntervals: [true, true, true, true, true, true, true],
};

const scaleData = {
    scale: "c_diatonic",
    scaleIndex: 0,
};

const midiData = {
    featureEnabled: false,
    midiEnabled: false,
    midiError: false,
    midiInfo: null,
    midiOutputMap: {},
};

const userData = {};
const tabData = [];
const ensembleHostRoomId = undefined;
const isEnsembleMember = false;

const initialState = {
    userData,
    chordData,
    scaleData,
    tabData,
    midiData,
    midiOutputs: [],
    ensembleHostRoomId,
    isEnsembleMember,
    currentRoomId: null,
    authUser: null,
    isMobileMenuVisible: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "HYDRATE_FIREBASE_DATA": {
            return {
                ...state,
                userData: action.payload,
            };
        }

        case "SET_CHORD_DATA": {
            const newChordData = action.payload;
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
                },
            };
        }

        case "SET_SCALE_DATA": {
            const newScaleData = action.payload;

            return {
                ...state,
                scaleData: {
                    scale: newScaleData,
                    scaleIndex: state.scaleData.scaleIndex + 1,
                },
            };
        }

        case "SET_TAB_DATA": {
            return {
                ...state,
                tabData: action.payload,
            };
        }

        case "SET_ENSEMBLE_HOST_ROOM_ID": {
            return {
                ...state,
                userData: {
                    ...userData,
                    ensembleHostRoomId: action.payload,
                },
            };
        }

        case "SET_IS_ENSEMBLE_MEMBER": {
            return {
                ...state,
                isEnsembleMember: action.payload,
            };
        }

        case "SET_CURRENT_ROOM_ID": {
            return {
                ...state,
                currentRoomId: action.payload,
            };
        }

        case "SET_AUTH_USER": {
            return {
                ...state,
                authUser: action.payload,
            };
        }

        case "SET_IS_MOBILE_MENU_VISIBLE": {
            return {
                ...state,
                isMobileMenuVisible: action.payload,
            };
        }

        case "ADD_MIDI_OUTPUT": {
            return {
                ...state,
                midiOutputs: [...state.midiOutputs, action.payload],
            };
        }

        case "REMOVE_MIDI_OUTPUT": {
            state.midiOutputs.splice(action.payload, 1);
            return {
                ...state,
                midiOutputs: [...state.midiOutputs],
            };
        }

        case "MODIFY_MIDI_OUTPUT": {
            const { index, data } = action.payload;
            state.midiOutputs[index] = {
                ...state.midiOutputs[index],
                ...data,
            };

            return {
                ...state,
                midiOutputs: [...state.midiOutputs],
            };
        }

        case "SET_MIDI_DATA": {
            return {
                ...state,
                midiData: {
                    ...state.midiData,
                    ...action.payload,
                },
            };
        }

        default:
            return state;
    }
};

export default reducer;
