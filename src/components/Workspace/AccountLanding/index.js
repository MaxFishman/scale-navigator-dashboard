import React from "react";
import Account from "../Account";
import { AuthUserContext } from "../../Session";
import { compose } from "recompose";

const AccountLanding = () => (
    <div>
        <AuthUserContext.Consumer>
            {(authUser) => (
                <div style={{ marginTop: 20 }}>
                    <Account authUser={authUser} />
                </div>
            )}
        </AuthUserContext.Consumer>
    </div>
);

export default compose()(AccountLanding);
//withEmailVerification,
