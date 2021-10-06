import React,{useState, useEffect} from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, withAuthentication, AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut'


function Account() {

 return( 
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <SignOutButton/>
      ) : (
      <p>You are not currently signed In</p>
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
