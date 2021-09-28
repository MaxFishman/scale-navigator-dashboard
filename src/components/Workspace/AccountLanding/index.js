import React from 'react';

import Account from '../Account'
import { withAuthorization, withEmailVerification, AuthUserContext } from '../../Session';
import { compose } from 'recompose';



const RoomLanding = (authUser) => (
  <div>
    <AuthUserContext.Consumer>
       {authUser => (
          <div style={{marginTop:20}} align="center">
            <Account authUser={authUser}/>
          </div>
        )}
      </AuthUserContext.Consumer>  
  </div>
);



export default compose(
  //withEmailVerification,
)(RoomLanding);