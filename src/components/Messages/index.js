import React from "react";
import styled from "styled-components";
import SendMessage from "./SendMessage";

const Wrapper = styled.div`
    color: #fff;
    text-align: left;
    padding: 12px 20px;
`;

const MsgHeader = styled.div`
    font-weight: bold;
    margin-bottom: 7px;

    span {
        font-size: 12px;
        margin-left: 7px;
    }
`;

const MessageBubble = styled.div`
    background-color: rgb(221 202 255 / 40%);
    border-radius: 0 50px 50px 50px;
    margin-bottom: 14px;
    padding: 4px 12px;
`;

const formatCreatedAt = (timestamp) =>
    new Date(timestamp).toTimeString().split(" ")[0];

const Messages = ({ data = [] }) => (
    <Wrapper>
        {data.map(({ createdAt, userId, message }, key) => (
            <div key={key}>
                <MsgHeader>
                    {userId}
                    <span>{formatCreatedAt(createdAt)}</span>
                </MsgHeader>
                <MessageBubble key={key}>{message}</MessageBubble>
            </div>
        ))}
    </Wrapper>
);

export { SendMessage };
export default Messages;
