import React from 'react';

import RoomItem from './RoomItem';

//Passes the room list objects between the room compononent and item.
 
const RoomList = ({
  authUser,
  rooms,
  onRemoveRoom,

}) => (
  <React.Fragment>
    {rooms.map(room => (
      <RoomItem
        authUser={authUser}
        key={room.uid}
        room={room}
        onRemoveRoom={onRemoveRoom}
      />
    ))}
  </React.Fragment>
);

export default RoomList;