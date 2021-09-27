import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyBOi8JxlvhF8pO3cUW9hl4-XZNfOVzbBTs",
  authDomain: "scale-navigator.firebaseapp.com",
  projectId: "scale-navigator",
  storageBucket: "scale-navigator.appspot.com",
  messagingSenderId: "908459111045",
  appId: "1:908459111045:web:1799c278153c10c0f8afec"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();

  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);


  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

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

  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection('users');

  // *** Message API ***

  message = uid => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection('messages');

   // *** Message API ***

  room = uid => this.db.doc(`rooms/${uid}`);

  rooms = () => this.db.collection('rooms');
}

export default Firebase;
