import React, { useState }  from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import ROUTES from 'common/Routes';
import LoginModal from 'components/LoginModal';

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

function SignIn({ firebase, history }) {
    const [error, setErrors] = useState('')

    const onSubmit = (details) => {
        const { email, password } = details;

        firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
            // Create a user in your Firebase realtime database
            return firebase.user(authUser.user.uid).set(
                { email },
                { merge: true },
            );
        })
        .then(() => {
            history.push(ROUTES.ENSEMBLE);
        })
        //need to add error catching return
        .catch(error => {
            setErrors(error)
        });
    }

    return (
        <LoginModal onSubmit={onSubmit}/>
    );
}

export default compose(withRouter, withFirebase)(SignIn)
