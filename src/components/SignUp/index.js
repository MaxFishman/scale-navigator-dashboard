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

function SignUp(props) {

  const [ email, setEmail] = useState('')
  const [ passwordOne, setPasswordOne] = useState('')
  const [error] = useState('')
  const [userName, setUserName] = useState('')

  const onSubmit = evt => {
     evt.preventDefault();
      props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return props.firebase.user(authUser.user.uid).set(
          {
            email:email,  
            userName:userName,
          },
          { merge: true },
        );
      })
      .then(() => {
        props.history.push(ROUTES.ENSEMBLE);
      })
      //need to add error catching return
       .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        //this.setState({ error });
      });

    
   } 
  
  return (
        <div>
        <form autocomplete="off"  onSubmit={onSubmit}>
           <label >user name:</label>
          <input
            value={userName}
            type="text"
            required
            onChange={e => setUserName(e.target.value)}
            autoFocus
          />
          <br/>
          <br/>
          <label >email:</label>
          <input
            value={email}
            type="text"
            required
            //autoComplete="new-password"
            onChange={e => setEmail(e.target.value)}
     
          />
          <br/>
          <br/>
          <label >password:</label>
          <input
            value={passwordOne}
            required
            type="password"
            id="password"
            onChange={e => setPasswordOne(e.target.value)}
          />
          <br/>
          <br/>
          <button
            type="submit"
            style={{color:'red', backgroundColor:'white'}}
          >
            Sign Up
          </button>
          <br/>
              <span href="#" variant="body2">
              Already have an account? 
               <Link to={ROUTES.SIGN_IN}> {"Sign In"}</Link>
              </span>
       
        </form>
      
    </div>
  );
}
export default compose(withRouter, withFirebase)(SignUp)