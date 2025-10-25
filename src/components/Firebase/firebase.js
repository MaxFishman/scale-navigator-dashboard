import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, FieldValue, doc, onSnapshot } from "firebase/firestore";

const process = {};

const config = {
    apiKey: "AIzaSyBiTTX24mBjypGdel2ARBx0UUvFQEaRDf4",
    authDomain: "scale-navigator-ensemble.firebaseapp.com",
    databaseURL: "https://scale-navigator-ensemble-default-rtdb.firebaseio.com",
    projectId: "scale-navigator-ensemble",
    storageBucket: "scale-navigator-ensemble.appspot.com",
    messagingSenderId: "156837833740",
    appId: "1:156837833740:web:ce00fcf2297f899f8b9229",
    measurementId: "G-5G2C3541ZY",
};

class Firebase {
    constructor() {
        this.app = initializeApp(config);

        /* Helper */

        this.fieldValue = FieldValue;
        this.emailAuthProvider = EmailAuthProvider;
        this.googleAuthProvider = new GoogleAuthProvider();

        /* Firebase APIs */

        this.auth = getAuth(this.app);
        this.db = getFirestore(this.app);
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        createUserWithEmailAndPassword(this.auth, email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        signInWithEmailAndPassword(this.auth, email, password);

    doSignInWithGoogle = () =>
        signInWithPopup(this.auth, this.googleAuthProvider);

    doSignOut = () => signOut(this.auth);

    doPasswordReset = (email) => sendPasswordResetEmail(this.auth, email);

    doSendEmailVerification = () =>
        sendEmailVerification(this.auth.currentUser, {
            url:
                process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT ||
                "someurl.since.process.is.undefined",
        });

    doPasswordUpdate = (password) =>
        updatePassword(this.auth.currentUser, password);

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        onAuthStateChanged(this.auth, (authUser) => {
            if (authUser) {
                onSnapshot(this.user(authUser.uid), (doc) => {
                    const dbUser = doc.data();

                    // default empty roles
                    // if (!dbUser.roles) {
                    // dbUser.roles = {};
                    //}

                    // merge auth and db user
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        emailVerified: authUser.emailVerified,
                        providerData: authUser.providerData,
                        ...dbUser,
                    };

                    next(authUser);
                });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = (uid) => doc(this.db, `users/${uid}`);

    users = () => this.db.collection("users");

    // *** Rooms API ***

    room = (uid) => doc(this.db, `rooms/${uid}`);

    rooms = () => this.db.collection("rooms");
}

export default Firebase;
