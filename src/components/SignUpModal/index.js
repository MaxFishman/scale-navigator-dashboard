import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import Modal from 'react-modal';
import { withRouter, Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import ROUTES from 'common/Routes';
import { compose } from 'recompose';


const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead.
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '100%',
        maxWidth: '550px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        border: 0,
        zIndex: 9090
    },
};

const Wrapper = styled.div`
    color: #fff;
    background: #000000;
    border: 3px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 38px;
    padding: 20px 0 35px;

    &>div {
        width: 100%;
        max-width: 350px;
        margin: 0 auto;
        padding: 50px 20px 0;
    }
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 36px;
    line-height: 20px;
    text-align: center;
    width: 100%;
`;

const Label = styled.label`
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    display: block;

    &>div {
        margin-bottom: 10px;
    }
`;

const Input = styled.input`
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 9px;
    background-color: transparent;
    height: 39px;
    width: 100%;
    margin-bottom: 28px;
    padding-left: 12px;
`;

const Submit = styled.button`
    background: #FFDE6A;
    border-radius: 9px;
    text-align: center;
    width: 139px;
    height: 40px;
    color: black;
    font-weight: bold;
    margin: 12px auto 30px;
    display: block;
`;

const SignUpContent = styled.div`
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    text-shadow: 0px 4px 24px rgba(255, 255, 255, 0.5), 0px 0px 6px #FFFFFF;

    a {
        color: white;
        text-decoration: none;
    }
`;

const Forgot = styled.span`
    color: #FFDE6A;
`;

const SignUpModal = (props) => {
    const dispatch = useDispatch()

    const isVisible = true
    const [ email, setEmail] = useState('')
    const [ passwordOne, setPasswordOne] = useState('')
    const [error] = useState('')
    const [userName, setUserName] = useState('')

    const onSubmit = evt => {
        evt.preventDefault();
        props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            dispatch({ type: 'HYDRATE_FIREBASE_DATA', payload: authUser })

            return props.firebase.user(authUser.user.uid).set(
                {
                    email:email,
                    userName:userName,
                    accountType:'free',
                    ensembleCount:0,
                },
                { merge: true },
            );
        })
        .then(() => {
            props.history.push(ROUTES.ENSEMBLE);
        })
        //need to add error catching return
        .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
            error.message = ERROR_MSG_ACCOUNT_EXISTS;
            }

            //this.setState({ error });
        });
    }

    return (
        <>
            <Modal
                isOpen={isVisible}
                style={customStyles}
                onRequestClose={()=>window.location.replace('/account')}
            >
             <form autocomplete="off"  onSubmit={onSubmit}>
                <Wrapper>

                    <Title>Sign Up</Title>

                    <div>
                      <Label>
                          <div>* User Name</div>
                          <Input
                            value={userName}
                            type="text"
                            required
                            onChange={e => setUserName(e.target.value)}
                            autoFocus
                          />
                     </Label>
                        <Label>
                            <div>* Email</div>
                            <Input
                            value={email}
                            type="text"
                            required
                            placeholder="email"
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                            />
                        </Label>
                        <Label>
                            <div>* Password</div>
                            <Input
                                value={passwordOne}
                                placeholder="password"
                                required
                                id="password"
                                type="password"
                                onChange={e => setPasswordOne(e.target.value)}
                              />
                        </Label>
                    </div>

                    <Submit type="submit" >Sign Up</Submit>

                    <SignUpContent>
                        <Link to={ROUTES.SIGN_IN}>Already have an account? Sign In</Link><br/>
                        <Link to={ROUTES.RESET_PWD}>
                            <Forgot>Forgotten Password</Forgot>
                        </Link>
                    </SignUpContent>
                </Wrapper>
              </form>
            </Modal>
        </>
    );
}

export default compose(withRouter, withFirebase) (SignUpModal);
