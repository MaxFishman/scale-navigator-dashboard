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
	"userid": "33123ASDFKJ",
	"operation": "create"
}
```

Expected Return: `200 OK` 

### Destroys an Ensemble 

Destroys a room 

Route: `/room` 

Method: `POST` 

Expected Return: `200 OK`

Example Request:

```json
{
	"roomid": "33123ASDFKJ",
	"userid": "33123ASDFKJ",
	"operation": "destroy"
}
```

This request will kick back a `403` if the room host does not match the request sender's id 


TODO: 
use headers to confirm authentication