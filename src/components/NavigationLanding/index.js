import React from 'react';
import Navigation from '../Navigation/Navigation'

import { AuthUserContext } from '../Session';



function NavigationLanding(){
    return(    
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                     <Navigation authUser={authUser}/>
                ) : (
                     <div></div>
            )}
        </AuthUserContext.Consumer>
     )
}




export default NavigationLanding


