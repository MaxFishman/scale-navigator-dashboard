import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withAuthorization, AuthUserContext } from "../../Session";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../Firebase";
import ROUTES from "common/Routes";
import styled from "styled-components";
import Messages, { SendMessage } from "../../Messages";

const Wrapper = styled.div`
    color: #ffffff;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border: 2px solid #ffffff;
    border-radius: 8px;
    margin-bottom: 22px;
`;

const RoomImage = styled.div`
    background-color: red;
    height: 88px;
    width: 88px;
    margin-right: 14px;
    border-radius: 50px 0 50px 0;
`;

const RoomName = styled.div`
    color: #ffde6a;
    font-weight: bold;
    font-size: 26px;
    text-align: left;
`;

const HostName = styled.div`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    text-align: left;
`;

const Button = styled.button`
    background: #ffde6a;
    border-radius: 9px;
    text-align: center;
    width: 139px;
    height: 40px;
    color: black;
    font-weight: bold;
    display: block;
`;

const MembersInRoom = styled.div`
    margin-top: 4px;
    font-size: 20px;
`;

const ContentWrapper = styled.div`
    min-height: 100%;
    border: 2px solid #ffffff;
    border-radius: 8px 8px 28px 8px;
    margin-bottom: 12px;
`;

function RoomView(props) {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.root);

    const [roomName, setRoomName] = useState("");
    const [hostName, setHostName] = useState("");
    const [activeUsers, setActiveUsers] = useState([]);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const roomId = props.location.pathname.split("/")[2];
        dispatch({ type: "SET_CURRENT_ROOM_ID", payload: roomId });
    }, [props.location]);

    useEffect(() => {
        const unsubscribe = props.firebase
            .room(props.match.params.id)
            .onSnapshot((snapshot) => {
                if (!snapshot.data())
                    return props.history.push(ROUTES.ENSEMBLE);
                setRoomName(snapshot.data().roomName || "");

                const authUser = JSON.parse(
                    localStorage.getItem("authUser")
                ).userName;

                if (snapshot.data().hostName === authUser) {
                    dispatch({ type: "SET_IS_ENSEMBLE_HOST", payload: true });
                    dispatch({
                        type: "SET_IS_ENSEMBLE_MEMBER",
                        payload: false,
                    });
                } else {
                    dispatch({ type: "SET_IS_ENSEMBLE_HOST", payload: false });
                    dispatch({ type: "SET_IS_ENSEMBLE_MEMBER", payload: true });
                }
            });

        return () => {
            unsubscribe();
        };
    }, [props.firebase]);

    const createMessage = () => {
        const { userName } = userData;

        props.firebase.room(props.match.params.id).collection("messages").add({
            userId: userName,
            message: text,
            createdAt: new Date().getTime(),
        });
        setText("");
    };

    useEffect(() => {
        const unsubscribe = props.firebase
            .room(props.match.params.id)
            .collection("messages")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                if (snapshot.size) {
                    let messages = [];
                    snapshot.forEach((doc) =>
                        messages.push({ ...doc.data(), uid: doc.id })
                    );

                    setMessages(messages.reverse());
                } else {
                    setMessages([]);
                }
            });

        return () => {
            unsubscribe();
        };
    }, [props.firebase]);

    useEffect(() => {
        props.firebase.user(props.authUser.uid).onSnapshot((snapshot) => {
            props.firebase
                .room(props.match.params.id)
                .collection("activeUsers")
                .doc(props.authUser.uid)
                .set({
                    userId: props.authUser.uid,
                    userName: snapshot.data().userName || "",
                    createdAt: new Date().getTime(),
                })
                .then(() => {
                    const unsubscribe = props.firebase
                        .room(props.match.params.id)
                        .collection("activeUsers")
                        .orderBy("createdAt", "desc")
                        .onSnapshot((snapshot) => {
                            if (snapshot.size) {
                                let activeUsers = [];

                                snapshot.forEach((doc) =>
                                    activeUsers.push({
                                        ...doc.data(),
                                        uid: doc.id,
                                    })
                                );

                                setActiveUsers(activeUsers.reverse());
                                setHostName(activeUsers[0].userName);
                            } else {
                                setActiveUsers([]);
                            }
                        });

                    return () => {
                        unsubscribe();
                    };
                });
        });
    }, [props.firebase]);

    const handleLeaveRoom = () => {
        if (activeUsers.length === 1) {
            props.history.push(ROUTES.ENSEMBLE);
            props.firebase.room(props.match.params.id).delete();
        } else {
            props.firebase
                .room(props.match.params.id)
                .collection("activeUsers")
                .doc(props.authUser.uid)
                .delete();
            props.history.push(ROUTES.ENSEMBLE);
            setHostName(activeUsers[0].userName);
        }

        // dispatch({ type: 'SET_IS_ENSEMBLE_MEMBER', payload: false })
    };

    return (
        <Wrapper>
            <AuthUserContext.Consumer>
                {() => (
                    <div>
                        <Header>
                            <div style={{ display: "flex" }}>
                                <RoomImage />
                                <div>
                                    <RoomName>{roomName}</RoomName>
                                    <HostName>Host: {hostName}</HostName>
                                </div>
                            </div>
                            <div>
                                <Button onClick={handleLeaveRoom}>
                                    Leave Ensemble
                                </Button>
                                <MembersInRoom>
                                    {activeUsers.length} Members
                                </MembersInRoom>
                            </div>
                        </Header>

                        <ContentWrapper>
                            <Messages data={messages} />
                            <SendMessage
                                text={text}
                                handleText={({ target }) =>
                                    setText(target.value)
                                }
                                createMessage={createMessage}
                            />
                        </ContentWrapper>

                        {/* <br/>
                            <p>Users in this room:</p>
                                {activeUsers.map((activeUser)=>(
                                    <p key={activeUser.userId}><span>{activeUser.userName}</span></p>
                                ))}
                        */}
                    </div>
                )}
            </AuthUserContext.Consumer>
        </Wrapper>
    );
}

const condition = (authUser) => !!authUser;

export default compose(
    withRouter,
    withAuthorization(condition),
    withFirebase
)(RoomView);
