import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    h1 {color: #fff;}
`;

const Messages = ({ data = [] }) => (
    <Wrapper>

        <h1>Worked 1:15 HRs</h1>

        {data.map((message)=> (
            <p key={message.userId}><span>{message.userId + ':\xa0' + message.message}</span></p>
        ))}
    </Wrapper>
);

export default Messages;
