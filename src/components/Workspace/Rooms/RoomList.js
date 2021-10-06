import React from 'react';
import RoomItem from './RoomItem';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 26px 0;
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 8px 8px 28px 8px;
`;

const RoomsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
`;

const MainTitle = styled.div`
    color: white;
    font-weight: bold;
    font-size: 4.2vh;
    line-height: 20px;
    text-align: center;
    margin-bottom: 28px;
`;

const RoomList = ({
    authUser,
    rooms,
    onRemoveRoom,
}) => (
    <Wrapper>
        <MainTitle>Join an Ensemble</MainTitle>

        <RoomsContainer>
            {rooms.map(room => (
                <RoomItem
                    authUser={authUser}
                    key={room.uid}
                    room={room}
                    onRemoveRoom={onRemoveRoom}
                />
            ))}
        </RoomsContainer>
    </Wrapper>
);

export default RoomList;