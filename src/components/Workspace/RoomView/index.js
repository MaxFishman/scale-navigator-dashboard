import React, {useEffect, useState} from 'react';
import { withAuthorization, withEmailVerification, AuthUserContext } from '../../Session';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import ROUTES from 'common/Routes';

function RoomView(props) {
 
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
     props.firebase
     .room(props.match.params.id)
     .onSnapshot(snapshot => {
      setRoomName(
       snapshot.data().roomName || '' 
      )
      setUserName(
       snapshot.data().userName || '' 
      )
   })
  })   

return(
  <div>

   <div>
   <p variant="body2">You are in Ensemble : <span style={{color:'red'}}>{roomName}</span></p>
   <br/>
    <p>The host of this Ensemble is : <span style={{color:'red'}}>{userName}</span></p>
  <br/>
   <p><Link  to={ROUTES.ENSEMBLE}>Home</Link></p>
   </div>
  </div>
 );
}

export default compose(
  //withEmailVerification,
  withFirebase,
)(RoomView);