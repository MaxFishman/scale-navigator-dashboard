import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../Session';
import ROUTES from 'common/Routes';
import RoomLanding from '../RoomLanding'
import RoomView from '../RoomView'

const Room = () => (
  <div>

    <Switch>
      <Route exact path={ROUTES.ENSEMBLE_DETAILS} component={RoomView} />
      <Route exact path={ROUTES.ENSEMBLE} component={RoomLanding} />
    </Switch>
  </div>
);


export default compose(

)(Room);
