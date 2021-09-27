import React from 'react';

import { withAuthorization, withEmailVerification, AuthUserContext } from '../../Session';
import { compose } from 'recompose';
import Room from '../Room'

const Ensemble = (authUser) => (
  <div>

    <AuthUserContext.Consumer>
       {authUser => (
          <div style={{color:'white'}} align="center">
            <Room authUser={authUser}/>
          </div>
        )}
      </AuthUserContext.Consumer>  
  </div>
);



export default compose(
  //withEmailVerification,
)(Ensemble);
