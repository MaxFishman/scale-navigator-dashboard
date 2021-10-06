import React from 'react';
import { AuthUserContext } from '../../Session';
import Room from '../Room'

const Ensemble = () => (
    <AuthUserContext.Consumer>
       {authUser => (
            <Room authUser={authUser}/>
        )}
    </AuthUserContext.Consumer>
);

export default Ensemble
