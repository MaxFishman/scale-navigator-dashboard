import React, { Component, useState, useEffect } from 'react';

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
        margin-left: -11px;
    }
`;

//Room component handle auth state of the list to control ui / add a new room

function Rooms(props) {

    const [rooms, setRooms] = useState([])
     
    const handleNewRoom = (e) =>{
       if(roomName == ''){
        return
       } 
       props.firebase
      .user(props.authUser.uid)
      .get().then((doc) => {
        if (doc.exists && doc.data().accountType=='free' && doc.data().ensembleCount == 0) {
            props.firebase.rooms().add({
            roomName: roomName,
            hostName: doc.data().userName || '',
            hostId:props.authUser.uid,
            createdAt:new Date().getTime()
        }).then(function(docRef) {
            props.firebase.user(props.authUser.uid).set({
             ensembleCount:1,  
             currentEnsemble:docRef.id,
             isHost:true,
            },{merge:true})   
             props.history.push(ROUTES.ENSEMBLE + '/' + docRef.id);    
        })
        e.preventDefault();    
 
       } else {
          if (doc.exists && doc.data().accountType=='pro' && doc.data().ensembleCount == 1){
           props.firebase.rooms().add({
            roomName: roomName,
            hostName: doc.data().userName || '',
            hostId:props.authUser.uid,
            createdAt:new Date().getTime()
        }).then(function(docRef) {
        props.history.push(ROUTES.ENSEMBLE + '/' + docRef.id); 
            props.firebase.user(props.authUser.uid).set({
             ensembleCount:1,
             currentEnsemble:docRef.id,
             isHost:true
            },{merge:true})   
        })

          }else{
              props.history.push(ROUTES.CHECKOUT); 
          }
 
       }
    })
  }





    const [userName, setUserName] = useState('')
    const [addNewRoomMode, setAddNewRoomMode] = useState(false)
    const [listMode, setListMode] = useState(true)
    const [ensembleCount, setEnsembleCount] = useState('')



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


    const onRemoveRoom = uid => {
        props.firebase.Room(uid).delete();
    };

    const [roomName, setRoomName] = useState('')
    const isVisible = true
    return (
        <AuthUserContext.Consumer>
            {authUser => (
                <Wrapper>
                    {listMode && <>
                        <AuthUserContext.Consumer>
                            {authUser =>
                              authUser ? (
                             <CreateEnsamble>
                                <input onChange={e => setRoomName(e.target.value)}  placeholder="input new ensemble name..."/>
                                 <button onClick={handleNewRoom}>
                                    Create Ensemble
                                </button>
                             </CreateEnsamble>
                              ) : (
                             <CreateEnsamble>
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
                                //onEditMessage={onEditMessage}
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
