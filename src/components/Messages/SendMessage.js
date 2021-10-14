import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    text-align: left;
    padding: 12px 20px;
    margin-bottom: 12px;
`;

const Input = styled.input`
    flex: 1;
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 9px;
    background-color: transparent;
    height: 40px;
    padding-left: 12px;
    margin-right: 12px;
`;

const Button = styled.button`
    background: #FFDE6A;
    border-radius: 9px;
    text-align: center;
    width: 139px;
    height: 40px;
    color: black;
    font-weight: bold;
    display: block;
`;

const SendMessage = ({ text, handleText, createMessage }) => (
    <Wrapper>
        <Input onChange={handleText} value={text}/>
        <Button onClick={createMessage}>Send Message</Button>
    </Wrapper>
);

export default SendMessage;
