import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import { withAuthentication, AuthUserContext } from "../../Session";
import SignOutButton from "../SignOut";
import { withFirebase } from "../../Firebase";

function AccountMenu(props) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [accountType, setAccounttype] = useState("");
    console.log(setAccounttype);

    useEffect(() => {
        const unsubscribe = props.firebase
            .user(props.authUser.uid)
            .onSnapshot((snapshot) => {
                setUserName(snapshot.data().userName || "");
                setEmail(snapshot.data().email || "");
            });

        return () => {
            unsubscribe();
        };
    }, [props.firebase]);

    return (
        <AuthUserContext.Consumer>
            {() => (
                <div>
                    <p>{userName}</p>
                    <p>{email}</p>
                    <p>{accountType}</p>
                    <SignOutButton />
                </div>
            )}
        </AuthUserContext.Consumer>
    );
}

export default compose(
    //withEmailVerification,
    withAuthentication,
    withFirebase
)(AccountMenu);
