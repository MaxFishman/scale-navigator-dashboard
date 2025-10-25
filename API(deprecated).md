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
	"operation": "create",
	"name": "My room name"
}
```

Expected Return: `200 OK` 

### Destroy an Ensemble 

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

### Ensemble Host Change 

Destroys a room 

Route: `/room` 

Method: `POST` 

Expected Return: `200 OK`

Example Request:

```json
{
	"origin": "33123ASDFKJ",
	"userid": "33123ASDFKJ",
	"operation": "change"
}
```

The origin parameter is the user in which triggers the switch host command (also the room id), while 
userid is the userid of the new room host 

### Get All Rooms

Route: `/getrooms` 

Method: `GET` 

Expected Return: `200 OK`


### Get Room Members

Route: `/getmembers` 

Method: `GET` 

Example Request:

```json
{
	"room": "33111AA2kADF"
}
```

Expected Return: `200 OK`



TODO: 
use headers to confirm authentication