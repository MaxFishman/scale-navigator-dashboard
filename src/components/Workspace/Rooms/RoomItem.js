import React from "react";
import { useDispatch } from "react-redux";
import ROUTES from "common/Routes";
import styled from "styled-components";
import { withFirebase } from "../../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const Wrapper = styled.div`
    border: 2px solid #ffffff;
    box-sizing: border-box;
    border-radius: 8px;
    color: white;
    padding: 20px;
    width: 250px;
    height: 124px;
    margin: 6px;
    transition: 0.3s ease opacity;
    display: flex;
    align-items: center;

    &:hover {
        opacity: 0.7;
    }
`;

const RoomImage = styled.div`
    height: 100%;
    background-color: red;
    width: 88px;
    margin-right: 14px;
    border-radius: 50px 0 50px 0;
    flex-shrink: 0;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #ffde6a;
    text-align: left;

    > div {
        color: white;
    }
`;

const RoomItem = ({ room, history }) => {
    const dispatch = useDispatch();

    const handleRoomClick = () => {
        const roomId = room.uid;
        dispatch({ type: "SET_CURRENT_ROOM_ID", payload: roomId });

        const roomRoute = `${ROUTES.ENSEMBLE}/${roomId}`;
        history.push(roomRoute);
    };

    return (
        <button onClick={handleRoomClick}>
            <Wrapper>
                <RoomImage />
                <Title>
                    {room.roomName}
                    <div style={{ wordBreak: "break-word" }}>
                        Host: {room.hostName}
                    </div>
                    <br />
                    <div>{10} Members</div>
                </Title>
            </Wrapper>
        </button>
    );
};

export default compose(withRouter, withFirebase)(RoomItem);
