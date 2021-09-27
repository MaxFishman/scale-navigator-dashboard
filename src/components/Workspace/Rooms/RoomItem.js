import React, { Component, useState, useEffect } from 'react';
import { withFirebase } from '../../Firebase';
import { Link, Switch } from 'react-router-dom';
import ROUTES from 'common/Routes';
import RoomView from '../RoomView'

function RoomItem(props) {
  


    const {authUser, room, onRemoveMessage} = props;

    return (


     <div style={{marginTop:30, border:'solid 1px yellow'}}>    
       <Link
            style={{textDecoration:'none'}}
            to={{
              pathname: `${ROUTES.ENSEMBLE}/${room.uid}`,
            }}
          >
        <p>{room.roomName}</p>
         <p variant="body2">{room.userName}</p>

       </Link>
       </div>
    );
  }


export default withFirebase(RoomItem)