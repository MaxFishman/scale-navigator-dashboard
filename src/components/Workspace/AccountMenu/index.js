import React,{useState, useEffect} from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, withAuthentication, AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut'
import { withRouter, Link } from 'react-router-dom';
import ROUTES from 'common/Routes';
import { withFirebase } from '../../Firebase';

function AccountMenu(props) {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [accountType, setAccounttype] = useState('')
   
    useEffect(() => {
       const unsubscribe = props.firebase
         .user(props.authUser.uid)
         .onSnapshot(snapshot => {
          setUserName(
            snapshot.data().userName || ''
           )
          setEmail(
          snapshot.data().email || '' 
           )
       
         })

        return () => {
            unsubscribe()
        }
    },[props.firebase])

 return( 
  <AuthUserContext.Consumer>
     {authUser => (
       <div> 
        <p>{userName}</p>
        <p>{email}</p>
        <p>{accountType}</p>
        <SignOutButton/>
       </div> 
       )}
  </AuthUserContext.Consumer>
 )
}



const condition = authUser => !!authUser;

export default compose(
    //withEmailVerification,
    withAuthentication,
    withFirebase,
    )(AccountMenu);