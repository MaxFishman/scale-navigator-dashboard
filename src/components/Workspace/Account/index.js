import React,{useState, useEffect} from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, withAuthentication, AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut'
import { withRouter, Link } from 'react-router-dom';
import ROUTES from 'common/Routes';
import { withFirebase } from '../../Firebase';
import AccountMenu from '../AccountMenu'

function Account(props) {

 return( 
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
       <div> 
       <AccountMenu authUser={authUser}/>
       </div> 
      ) : (
     <div>
       <p>You are currently not signed in </p>
       <Link to={ROUTES.SIGN_IN}> <p>Sign In </p></Link>
       <p>OR</p>
        <Link to={ROUTES.SIGN_UP}> <p>Sign Up </p></Link>
      </div>
      )}
  </AuthUserContext.Consumer>
 )
};



const condition = authUser => !!authUser;

export default compose(
    //withEmailVerification,
    withAuthentication,
    withFirebase,
    //withAuthorization(condition),
    )(Account);
