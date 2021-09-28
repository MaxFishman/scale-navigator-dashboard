import React from 'react';

import { withFirebase } from '../../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" style={{backgroundColor:'white', color:'red'}} onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
