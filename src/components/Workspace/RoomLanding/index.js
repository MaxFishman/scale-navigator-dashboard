import React from 'react';

import Rooms from '../Rooms'
import { withAuthorization, withEmailVerification, AuthUserContext } from '../../Session';
import { compose } from 'recompose';



const RoomLanding = (authUser) => (
  <div>
    <AuthUserContext.Consumer>
       {authUser => (
          <div style={{marginTop:20}} align="center">
            <Rooms authUser={authUser}/>
          </div>
        )}
      </AuthUserContext.Consumer>  
  </div>
);



export default compose(
  //withEmailVerification,
)(RoomLanding);
