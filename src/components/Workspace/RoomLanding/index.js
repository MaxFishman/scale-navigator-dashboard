import React from 'react';
import Rooms from '../Rooms'
import { AuthUserContext } from '../../Session';

const RoomLanding = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <Rooms authUser={authUser}/>
        )}
    </AuthUserContext.Consumer>
);

export default RoomLanding
