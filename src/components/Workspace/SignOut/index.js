import React from 'react';
import { withFirebase } from '../../Firebase';
import styled from 'styled-components';

const Button = styled.button`
    background: #ff8080;
    color: #fff;
    border-radius: 9px;
    text-align: center;
    width: 139px;
    height: 40px;
    font-weight: bold;
    margin: 12px auto 30px;
    display: block;
`

const SignOutButton = ({ firebase }) => (
    <Button onClick={firebase.doSignOut}>
        Sign Out
    </Button>
);

export default withFirebase(SignOutButton);
