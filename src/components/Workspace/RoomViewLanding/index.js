import React from 'react';
import RoomView from '../RoomView'
import { AuthUserContext } from '../../Session';

const RoomViewLanding = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <RoomView authUser={authUser}/>
        )}
    </AuthUserContext.Consumer>
);

export default RoomViewLanding
