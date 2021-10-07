import React,{useState, useEffect} from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, withAuthentication, AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut'
import { withRouter, Link } from 'react-router-dom';
import ROUTES from 'common/Routes';

function Account() {

 return( 
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <SignOutButton/>
      ) : (
     <>
       <p>You are currently not signed in </p>
       <Link to={ROUTES.SIGN_IN}> <p>Sign In </p></Link>
       <p>OR</p>
        <Link to={ROUTES.SIGN_UP}> <p>Sign Up </p></Link>
      </>
      )
    }
  </AuthUserContext.Consumer>
 )
};

function AccountAuth(props) {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        props.firebase
            .user(props.authUser.uid)
            .onSnapshot(snapshot => {
                setEmail(
                   // snapshot.data().email || ''
                )
                setUserName(
                   // snapshot.data().userName || ''
            )
        })
    })

    return (
        <div align="center">
            <SignOutButton/>
        </div>
    );
    
}

const condition = authUser => !!authUser;

export default compose(
    //withEmailVerification,
    withAuthentication,

)(Account);
