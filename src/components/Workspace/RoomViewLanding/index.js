import React from 'react';

import RoomView from '../RoomView'
import { withAuthorization, withEmailVerification, AuthUserContext } from '../../Session';
import { compose } from 'recompose';



const RoomViewLanding = (authUser) => (
  <div>
    <AuthUserContext.Consumer>
       {authUser => (
          <div style={{marginTop:20}} align="center">
            <RoomView authUser={authUser}/>
          </div>
        )}
      </AuthUserContext.Consumer>  
  </div>
);



export default compose(
  //withEmailVerification,
)(RoomViewLanding);
