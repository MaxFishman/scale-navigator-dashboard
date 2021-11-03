import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AuthUserContext, withAuthorization, } from '../../Session';
import { withFirebase } from '../../Firebase';
import RoomList from './RoomList';
import { Link, withRouter } from 'react-router-dom';
import ROUTES from 'common/Routes';
import { compose } from 'recompose';
import SignOutButton from '../SignOut'
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

const Title = styled.div`
    font-weight: bold;
    font-size: 36px;
    line-height: 20px;
    text-align: center;
    width: 100%;
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

const Wrapper = styled.div`
    height: 100%;
`;


const ModalWrapper = styled.div`
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


const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
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
    }
`;

function Rooms(props) {
    const dispatch = useDispatch()

    const [roomName, setRoomName] = useState('')
    const [rooms, setRooms] = useState([])
    const [listMode, setListMode] = useState(true)

    const handleNewRoom = () => {
        if (roomName == '') return

        props.firebase
            .user(props.authUser.uid)
            .get().then((doc) => {
                // Check if user eligible to create room
                if (doc.exists && doc.data().accountType === 'free' && doc.data().ensembleCount > 0) {
                    props.history.push(ROUTES.CHECKOUT);
                } else {
                    addNewRoom()
                }
            })
    }

    const addNewRoom = () => {
        const { uid, userName } = props.authUser

        props.firebase.rooms().add({
            createdAt: new Date().getTime(),
            roomName: roomName,
            hostName: userName || '',
            hostId: uid,
            scaleData: 'c_diatonic'
        }).then(function(docRef) {
            // Save room Id for hosting
            const roomId = docRef.id
            dispatch({ type: 'SET_CURRENT_ROOM_ID', payload: roomId })

            props.firebase.user(uid).set({
                ensembleCount: 1,
                currentEnsemble: roomName,
                isHost: true,
                ensembleHostRoomId: roomId
            }, {merge:true})

            props.history.push(ROUTES.ENSEMBLE + '/' + docRef.id);
        })
    }

    useEffect(() => {
        const unsubscribe = props.firebase
        .rooms()
        .orderBy('createdAt', 'desc')
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

    const onRemoveRoom = uid => {
        props.firebase.Room(uid).delete();
    };

    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <Wrapper>
                    {listMode && <>
                        <AuthUserContext.Consumer>
                            {authUser =>
                              authUser ? (
                             <CreateEnsamble>
                                 {/* TODO: REMOVE CODE DUPLICATION */}
                                <input onChange={e => setRoomName(e.target.value)}  placeholder="input new ensemble name..."/>
                                 <button onClick={handleNewRoom}>
                                    Create Ensemble
                                </button>
                             </CreateEnsamble>
                              ) : (
                                <CreateEnsamble>
                                 {/* TODO: REMOVE CODE DUPLICATION */}
                                <input placeholder="input new ensemble name..."/>
                                 <button onClick={handleNotAuth}>
                                    Create Ensemble
                                </button>
                             </CreateEnsamble>
                                )
                            }
                          </AuthUserContext.Consumer>


                        {rooms &&
                            <RoomList
                                authUser={authUser}
                                rooms={rooms}
                                onRemoveRoom={onRemoveRoom}
                            />
                        }
                    </>}

                </Wrapper>
            )}
        </AuthUserContext.Consumer>
    );
}

export default compose(withRouter, withFirebase)(Rooms);
