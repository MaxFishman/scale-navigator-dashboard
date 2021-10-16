import React,{useState, useEffect} from 'react';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification, withAuthentication, AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut'
import { withRouter, Link } from 'react-router-dom';
import ROUTES from 'common/Routes';
import { withFirebase } from '../../Firebase';
import styled, { css } from 'styled-components';
import UserImage from './user.png'

const Wrapper = styled.div`
    color: #ffffff;
`;

const Button = styled.button`
    background: #FFDE6A;
    border-radius: 9px;
    text-align: center;
    width: 139px;
    height: 40px;
    color: black;
    font-weight: bold;
    margin: 12px auto 30px;
    display: block;

    ${props => props.alt && css`
        background: transparent;
        border: 1px solid #FFDE6A;
        color: #FFDE6A;
    `}
`;

const UserName = styled.div`
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 12px;
`;

const EmailVerify = styled.div`
    font-size: 12px;
    margin: 12px 0 5vh;
`;

const UserDetailsWrapper = styled.div`
    padding: 20px 0;

    &:before {
        content: '';
        display: block;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        background: url(${UserImage}) no-repeat center;
        background-size: cover;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 22px;
    }
`;



const Account = () => (
    <Wrapper>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? (
                      <UserDetails user={authUser}/>
                ) : (
                    <>
                        <p>You are currently not signed in</p>
                        <Link to={ROUTES.SIGN_IN}><Button>Sign In </Button></Link>
                        <p>OR</p>
                        <Link to={ROUTES.SIGN_UP}><Button alt>Sign Up </Button></Link>
                    </>
            )}
        </AuthUserContext.Consumer>
    </Wrapper>
)

function UserDetails({ user }) {
  
    const { userName, email, emailVerified, accountType, stuff } = user;
    const EmailVerifiedText = emailVerified ? 'Email is Verified' : 'Email is not Verified'

    return (
        <UserDetailsWrapper>
            <UserName>{userName}</UserName>
            <div>{email}</div>
            <div>Account Type: <span style={{color:'red'}}> {accountType}</span> </div>
            <EmailVerify>{EmailVerifiedText}</EmailVerify>
            <SignOutButton/>
        </UserDetailsWrapper>
    );
}

export default compose(withAuthentication)(Account);

