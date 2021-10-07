import React, {useEffect, useState} from 'react';
import { withAuthorization, withEmailVerification, AuthUserContext } from '../../Session';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import ROUTES from 'common/Routes';

function RoomView(props) {

    const [roomName, setRoomName] = useState('')
    const [userName, setUserName] = useState('')
    const [hostName, setHostName] = useState('')
    const [activeUsers, setActiveUsers] = useState([])
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
       const unsubscribe = props.firebase
         .room(props.match.params.id)
         .onSnapshot(snapshot => {
          setRoomName(
            snapshot.data().roomName || ''
               )
            })

        return () => {
            unsubscribe()
        }
    },[props.firebase])


    const createMessage = () => {
        props.firebase.room(props.match.params.id).collection('messages').add({
            userId: userName,
            message:text,
            createdAt:new Date().getTime()
        })
        setText('')
    }

    useEffect(() => {
        const unsubscribe = props.firebase
            .room(props.match.params.id)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                if (snapshot.size) {
                let messages = [];
                snapshot.forEach(doc =>
                    messages.push({ ...doc.data(), uid: doc.id }),
                );

                setMessages(messages.reverse())

                } else {
                setMessages([])
                }
        })

        return () => {
            unsubscribe()
        }
    },[props.firebase])


    useEffect(() => {
       const unsubscribe = props.firebase
        .user(props.authUser.uid)
        .onSnapshot(snapshot => {
            setUserName(snapshot.data().userName || '')
            props.firebase.room(props.match.params.id).collection('activeUsers').doc(props.authUser.uid).set({
            userId: props.authUser.uid,
            userName: snapshot.data().userName || '',
            createdAt:new Date().getTime(),
            }).then(()=>{
            const unsubscribe = props.firebase
            .room(props.match.params.id)
            .collection('activeUsers')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                if (snapshot.size) {
                let activeUsers = [];
                snapshot.forEach(doc =>
                    activeUsers.push({ ...doc.data(), uid: doc.id }),
                )

                setActiveUsers(activeUsers.reverse())
                setHostName(activeUsers[0].userName)

                } else {
                setActiveUsers([])

                }
            })
            return () => {
            unsubscribe()
            }
    })
    })

    },[props.firebase])



    const handleLeaveRoom = () =>{

        if(activeUsers.length === 1){
        props.history.push(ROUTES.ENSEMBLE)
        props.firebase.room(props.match.params.id).delete()

        }else{
        props.firebase.room(props.match.params.id).collection('activeUsers').doc(props.authUser.uid).delete()
        props.history.push(ROUTES.ENSEMBLE);
        setHostName(activeUsers[0].userName)
        }


    }


    return(
    <div>
        <AuthUserContext.Consumer>
            {authUser => (
        <div>
        <p variant="body2">You are in Ensemble : <span style={{color:'red'}}>{roomName}</span></p>
        <br/>
            <p>The current host of this Ensemble is : <span style={{color:'red'}}>{hostName}</span></p>
            <p>Users in this room:</p>
                {activeUsers.map((activeUser)=>(
            <p key={activeUser.userId}><span>{activeUser.userName}</span></p>
            ))}

            {messages.map((message)=>(
            <p key={message.userId}><span>{message.userId + ':\xa0' + message.message}</span></p>
            ))}

        <p>Send Message to room:</p>
        <input
            value={text}
            style={{color:'black'}}
            onChange={event=>setText(event.target.value)}
        /><br/>
        <button onClick={createMessage}>send</button>
        <br/>
        <br/>


        <button onClick={handleLeaveRoom} style={{color:'red', backgroundColor:'white', cursor:'pointer'}} >Leave Room</button>
        </div>
        )}
        </AuthUserContext.Consumer>
        </div>
    );
}

const condition = authUser => !!authUser;

export default compose(
    //withEmailVerification,
    withRouter,
    withAuthorization(condition),
    withFirebase,
)(RoomView);
