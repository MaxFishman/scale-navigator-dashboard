import React, { Component, useState, useEffect } from 'react';

import { AuthUserContext, withAuthorization, } from '../../Session';
import { withFirebase } from '../../Firebase';
import RoomList from './RoomList';
import { Link, withRouter } from 'react-router-dom';
import ROUTES from 'common/Routes';
import { compose } from 'recompose';
import SignOutButton from '../SignOut'
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 100%;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
`;

const CreateEnsamble = styled.div`
    border: 2px solid #FFFFFF;
    border-radius: 8px 11px 11px 8px;
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 22px;

    input {
        background-color: transparent;
        padding-left: 12px;
        border: 0;
        height: 100%;
        width: 100%;
    }

    button {
        background: #FFFFFF;
        border-radius: 8px;
        height: 100%;
        width: 100%;
        max-width: 230px;
        color: #000;
        font-weight: bold;
        font-size: 20px;
        margin-left: -11px;
    }
`;

//Room component handle auth state of the list to control ui / add a new room

function Rooms(props) {

    const [rooms, setRooms] = useState([])


    const handleNewRoom = () => {
        props.firebase
        .user(props.authUser.uid)
        .onSnapshot(snapshot => {
        setUserName(
        snapshot.data().userName || ''
        )
    })
        setAddNewRoomMode(true)
        setListMode(false)
    };

    const [userName, setUserName] = useState('')
    const [addNewRoomMode, setAddNewRoomMode] = useState(false)
    const [listMode, setListMode] = useState(true)

    useEffect(() => {
        const unsubscribe = props.firebase
        .rooms()
        .orderBy('createdAt', 'desc')
        //.setLimit(10)
        .onSnapshot(snapshot => {
            if (snapshot.size) {
            let rooms = [];
            snapshot.forEach(doc =>
                rooms.push({ ...doc.data(), uid: doc.id }),
            );

            setRooms(rooms.reverse())

            } else {
            setRooms([])

            }
        })

        return () => {
            unsubscribe()
        }
    }, [props.firebase])


    const handleNotAuth = () =>{
        props.history.push(ROUTES.SIGN_UP);
    }

    const handleCancel = () =>{
        setListMode(true)
        setAddNewRoomMode(false)
    }

    const onCreateRoom = (event, authUser) => {
        event.preventDefault();
        props.firebase.rooms().add({
        roomName: roomName,
        hostName: userName,
        hostId:props.authUser.uid,
        createdAt:new Date().getTime()
        }).then(function(docRef) {
        props.history.push(ROUTES.ENSEMBLE + '/' + docRef.id);
        setAddNewRoomMode(false)
        setListMode(true)
        setRoomName('')

        })

    };

    const onRemoveRoom = uid => {
        props.firebase.Room(uid).delete();
    };

    const [roomName, setRoomName] = useState()

    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <Wrapper>
                    {listMode && <>
                        <CreateEnsamble>
                            <input placeholder="input new ensemble name..."/>
                            <button onClick={handleNotAuth}>
                                Create Ensemble
                            </button>
                        </CreateEnsamble>

                        {rooms &&
                            <RoomList
                                authUser={authUser}
                                rooms={rooms}
                                //onEditMessage={onEditMessage}
                                onRemoveRoom={onRemoveRoom}
                            />
                        }
                    </>}

                    {addNewRoomMode && <>
                        <form
                            onSubmit={event =>
                            onCreateRoom(event, authUser)
                            }
                            >
                            <p variant="h6">Create a new Ensemble</p>
                            <input autoFocus required style={{width:'100%', color:'#000000'}} onChange={event=>setRoomName(event.target.value)}  />
                                <br/>
                                <br/>
                            <button style={{color:'red', backgroundColor:'white'}} type="submit" >
                            OK
                            </button>
                            <button style={{color:'red'}} onClick={handleCancel} >
                            Cancel
                            </button>
                        </form>
                    </>}
                </Wrapper>
            )}
        </AuthUserContext.Consumer>
    );
}

export default compose(withRouter, withFirebase)(Rooms);
