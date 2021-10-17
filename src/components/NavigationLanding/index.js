import React from 'react';
import Navigation from '../Navigation/Navigation'
import { AuthUserContext } from '../Session';

const NavigationLanding = () => (
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                     <Navigation authUser={authUser}/>
                ) : (
                  <Navigation authUser={''}/>
            )}
        </AuthUserContext.Consumer>
);




export default NavigationLanding
