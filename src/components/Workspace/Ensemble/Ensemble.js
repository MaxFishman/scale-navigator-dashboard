import React, {useState, useEffect} from "react";
import { Card, Avatar, Input, message, Button } from "antd";
import { app, host } from "../../../config/base";
import Auth from "../../Authentication/AuthenticationModal";
import axios from 'axios';
import io from 'socket.io-client';
const { Search } = Input;
const { Meta } = Card;

class EnsembleInfo extends React.Component {
  render() {
    return (
      <Card
        style={{ width: 300 }}
        onClick={() => this.props.onSelect()}
      >
        <Meta
          avatar={
            <Avatar src="https://www.vippng.com/png/detail/509-5094205_hexagon-rounded-corners-png.png" />
          }
          title={this.props.title}
        />
        <p>Host: {this.props.host}</p>
        <p>{this.props.members} members</p>
      </Card>
    );
  }
}

function subscribeToMessages(cb) {
  const socket = io(host); 
  socket.on("message", data => cb(data));
}

export default class Ensemble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      activeRoom: null,
      messages: [],
      ready: false
    }

    subscribeToMessages(data => this.handleMessage(data));
  }

  handleMessage = data => { //very important!!!!!!!!!!!
    this.setState({messages: this.state.messages.concat(data)});
  }
  
  handleLogin = () => {
    console.log(app.auth().currentUser);
    this.setState({ready: true})
  };

  updateRooms = () => {
    axios.get(host + '/getrooms').then(response => this.setState({rooms: response.data}))
  }

  componentDidMount() {
    this.updateRooms()
    if(app.auth().currentUser) {
      this.setState({ready: true})
    }
  }

  handleRoomSelect = id => {
    this.state.rooms.forEach(room => {
      if(room.id === id) {
        this.setState({
          activeRoom: room,
        })
      }
    })
  }

  render() {
    return (
      <>
        {!this.state.ready ? (
          <Auth onMasterClose={this.handleLogin}/>
        ) : (
          <>
            {this.state.activeRoom === null ? 
              <div style={{ background: "#ECECEC", padding: "30px" }}>
                <Search
                  placeholder="input new ensemble name"
                  enterButton="Create Ensemble"
                  size="large"
                  value={this.state.input}
                  onChange={e => this.setState({input: e.target.value})}
                  onSearch={() => {
                    axios.post(host + '/room', {
                      "roomid": app.auth().currentUser.uid,
                      "userid": app.auth().currentUser.uid,
                      "name": this.state.input,
                      "operation": "create"
                    }).then(response => {
                        this.updateRooms()
                    })
                  }}
                />
                <h1>join an ensemble</h1>
                {this.state.rooms.length === 0 ? <p>No rooms, create one!</p> : <div>
                  {this.state.rooms.map(i => (
                    <EnsembleInfo host={"TBD"} title={i.name} members={'tbd'} onSelect={() => this.handleRoomSelect(i.id)} />
                  ))}
                </div>}
              </div> : 
              <div>
                <h1>Current Room: {this.state.activeRoom.name}</h1>
                <Button onClick={() => this.setState({activeRoom: null})}>Exit Room</Button>
                <Button onClick={() => {
                  const socket = io(host);
                  socket.emit("message", {"data": "hello"})
                }}>Send Message</Button>
                <Button onClick={() => this.setState({messages: []})}>Clear</Button>

                <div style={{marginTop: 50}}>
                  <h2>Messages</h2>
                  {this.state.messages.map(item => <p>message</p>)}
                </div>
              </div>}
          </>
        )}
      </>
    );
  }
}
