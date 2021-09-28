import React,{useState, useEffect} from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, withAuthentication } from '../../Session';
import SignOutButton from '../SignOut'

function Account(props){ 

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('') 

  useEffect(() => {
     props.firebase
     .user(props.authUser.uid)
     .onSnapshot(snapshot => {
      setEmail(
       snapshot.data().email || '' 
      )
      setUserName(
       snapshot.data().userName || '' 
      )
   })
  })     
 
 return(
  <div align="center">
  <p>Account Details</p>
  <p>User Name: {userName}</p>
   <p>Email: {email}</p>
   <SignOutButton/>
  </div>
);

}

const condition = authUser => !!authUser;

export default compose(
  //withEmailVerification,
  withAuthentication,
  withAuthorization(condition),
)(Account);
