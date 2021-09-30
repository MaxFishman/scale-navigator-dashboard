import React, { Component, useState, useEffect } from 'react';

import { AuthUserContext, withAuthorization, } from '../../Session';
import { withFirebase } from '../../Firebase';
import RoomList from './RoomList';
import { Link, withRouter } from 'react-router-dom';
import ROUTES from 'common/Routes';
import { compose } from 'recompose';
import SignOutButton from '../SignOut'

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
          <div>
         {listMode && (<div>
          <AuthUserContext.Consumer>
              {authUser =>
                authUser ? (
               <React.Fragment>   
               <button
               style={{backgroundColor:'white', color:'red'}}
               onClick={handleNewRoom}
  
                >
              + Host An Ensemble
            </button>
            <br/>
            <br/>
            <SignOutButton/>
            </React.Fragment>
                ) : (
             <button
               onClick={handleNotAuth}
                >
              + Host An Ensemble
            </button>
                )
              }
            </AuthUserContext.Consumer>
    
            {rooms && (
              <React.Fragment>

              <RoomList
                authUser={authUser}
                rooms={rooms}
                //onEditMessage={onEditMessage}
                onRemoveRoom={onRemoveRoom}
              />
              </React.Fragment>
            )}
            </div>)}

         {addNewRoomMode && (<div>
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
          </div>)}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }

export default compose(withRouter, withFirebase)(Rooms);