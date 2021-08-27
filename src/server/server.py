#env/bin/python3

from flask.globals import request
from server.room import Room
import socketio 
from flask import Flask
from datetime import datetime as dt  

sio = socketio.AsyncServer()

app = Flask(__name__) 
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

rooms = []


def fetch_UTC() -> int:
	return dt.utcnow()

@sio.event
def begin_chat(sid, room): #allow a user to enter the room
	sio.emit('joinroom', { #emit that a user has joined the room
		'user': sid, 
		'timestamp': fetch_UTC()
	})
	sio.enter_room(sid, room)

	@sio.event
	def exit_room(sid): #room exit 
		sio.emit('exitroom', {
			'user': sid,
			'timestamp': fetch_UTC()
		})
		sio.leave_room(sid, room)

	@sio.event
	def send_message(sid, message: dict):
		sio.emit('message', message, room=room, skip_sid=sid) #send to all users except the current user 


@app.route('/room', methods=['POST']) #creates a room and saves the json
def create_room(): 
	global rooms 
	response_data = request.json() 
	if response_data['operation'] == 'create':
		if response_data['roomid'] in rooms: 
			return "400"
		else: 
			rooms.append(Room(response_data['roomid']))
			for room in rooms:
				room.save_room_to_file()
	
	elif response_data['operation'] == 'destroy':
		room_to_remove = [room for room in rooms if room.id == response_data['roomid']][0]
		if room_to_remove._host == response_data['userid']:
			rooms = [room for room in rooms if room.id != room_to_remove.id]
			for room in rooms:
				room.save_room_to_file()
		else: 
			return "403"

	
	return "200"

if __name__ == "__main__":
	app.run()