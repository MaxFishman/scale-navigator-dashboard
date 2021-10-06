import React, { Component, useState, useEffect } from 'react';
import { withFirebase } from '../../Firebase';
import { Link, Switch } from 'react-router-dom';
import ROUTES from 'common/Routes';
import RoomView from '../RoomView'
import styled from 'styled-components';

const Wrapper = styled.div`
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 8px;
    color: white;
    padding: 20px;
    width: 250px;
    height: 124px;
    margin: 6px;
    transition: .3s ease opacity;
    display: flex;
    align-items: center;

    &:hover {
        opacity: .7;
    }
`;

const RoomImage = styled.div`
    height: 100%;
    background-color: red;
    width: 88px;
    margin-right: 14px;
    border-radius: 50px 0 50px 0;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #FFDE6A;
    text-align: left;

    >div {
        color: white;
    }
`;

//Fetch the individual room item with unique id from the list

const RoomItem = ({ authUser, room, onRemoveMessage }) => {
    return (
        <Link to={`${ROUTES.ENSEMBLE}/${room.uid}`}>
            <Wrapper>
                <RoomImage/>
                <Title>
                    {room.roomName}
                    <div>Host: {room.hostName}</div><br/>
                    <div>{10} Members</div>
                </Title>
                {console.log(room)}
            </Wrapper>
       </Link>
    );
}

export default withFirebase(RoomItem)
