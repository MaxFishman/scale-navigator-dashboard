import React , { Component, useState, useEffect }  from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import ROUTES from 'common/Routes';





const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

function SignIn(props) {
  
  const [ email, setEmail] = useState('')
  const [ passwordOne, setPasswordOne] = useState('')
  const [error] = useState('')


  const onSubmit = evt => {
     evt.preventDefault();
      props.firebase.doSignInWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return props.firebase.user(authUser.user.uid).set(
          {
            email,  
          },
          { merge: true },
        );
      })
      .then(() => {
        props.history.push(ROUTES.ENSEMBLE);
      })
      //need to add error catching return
       .catch(error => {
        //do something with errors
      });

    
   } 
  
  return (

      <div>

        <form autocomplete="off" onSubmit={onSubmit}>
        <label >email:</label>
          <input
            value={email}
            type="text"
            required
            id="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <br/>
          <br/>
         <label >password:</label>
          <input
            value={passwordOne}
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            onChange={e => setPasswordOne(e.target.value)}
          />
          <br/>
          <br/>
          <button
            type="submit"
            fullWidth
            style={{color:'red', backgroundColor:'white'}}
          >
            Sign In
          </button>
           <br/>
          <br/>
           <span href="#" variant="body2">
              Already have an account? 
            <Link to={ROUTES.SIGN_UP}> {"Sign Up"}</Link>
              </span>

             {error && <p>{error.message}</p>}
    
        </form>
      </div>

  );
}
export default compose(withRouter, withFirebase)(SignIn)