import React, { Component, useState, useEffect } from 'react';
import { withFirebase } from '../../Firebase';
import { Link } from 'react-router-dom';
import ROUTES from 'common/Routes';

function RoomItem(props) {
  


    const {authUser, room, onRemoveMessage} = props;

    return (
       <div>

        <div style={{marginTop:90}}>
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
       </div>
    );
  }


export default withFirebase(RoomItem)