# API Documentation

## General 
The backend uses the SocketIO library, use the (SocketIO Client Library)[https://github.com/socketio/socket.io-client] on the front end. 

## Methods

### Create an Ensemble 

Creates a new room and returns it's ID

Route: `/room` 

Method: `POST` 

Expected Return: `200 OK`

Example Request:

```json
{
	"roomid": "33123ASDFKJ",
	"operation": "create",
}
```

Expected Return: `200 OK` 

TODO: 
use headers to confirm authentication