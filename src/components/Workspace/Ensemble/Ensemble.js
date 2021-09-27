import React from 'react';

import { withAuthorization, withEmailVerification, AuthUserContext } from '../../Session';
import { compose } from 'recompose';
import SignOutButton from '../SignOut'
import Rooms from '../Rooms'

const Ensemble = (authUser) => (
  <div>

    <AuthUserContext.Consumer>
       {authUser => (
          <div style={{color:'white'}} align="center">
            <Rooms authUser={authUser}/>
          </div>
        )}
      </AuthUserContext.Consumer>  
  </div>
);



export default compose(
  //withEmailVerification,
)(Ensemble);
