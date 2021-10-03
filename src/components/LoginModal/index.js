import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';

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

const LoginModal = ({ onSubmit }) => {
    const isVisible = true
    const [details, setDetails] = useState({})

    const handleChange = ({target}) => {
        const {name, value} = target;
        setDetails({
            ...details,
            [name]: value
        })
    }

    const submitDisabled = !details.email || !details.password

    return (
        <>
            <Modal
                isOpen={isVisible}
                style={customStyles}
                onRequestClose={()=>window.location.replace('/about')}
            >
                <Wrapper>
                    <Title>Login to access!</Title>

                    <div>
                        <Label>
                            <div>* Email</div>
                            <Input name="email" onChange={handleChange}/>
                        </Label>
                        <Label>
                            <div>* Password</div>
                            <Input name="password" onChange={handleChange} type="password"/>
                        </Label>
                    </div>

                    <Submit onClick={() => onSubmit(details)} disabled={submitDisabled}>Sign In</Submit>

                    <SignUpContent>
                        <Link to="">Don't have an account? Create one</Link><br/>
                        <Link to="">
                            <Forgot>Forgotten Password</Forgot>
                        </Link>
                    </SignUpContent>
                </Wrapper>
            </Modal>
        </>
    );
}

export default LoginModal;
