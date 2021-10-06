import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ROUTES from 'common/Routes';
import RoomLanding from '../RoomLanding'
import RoomViewLanding from '../RoomViewLanding'

//Switches between array itm room list and room view

const Room = () => (
    <Switch>
        <Route exact path={ROUTES.ENSEMBLE_DETAILS} component={RoomViewLanding} />
        <Route exact path={ROUTES.ENSEMBLE} component={RoomLanding} />
    </Switch>
);

export default Room;
