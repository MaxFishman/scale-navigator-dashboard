#env/bin/python3

from flask.globals import request
from server.room import Room
import socketio 
from flask import Flask, jsonify
from datetime import datetime as dt  
import os
import json

sio = socketio.AsyncServer()

app = Flask(__name__) 
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

rooms = []


def fetch_UTC() -> int:
	return dt.utcnow()



def load_state_from_file(): 
	if 'roomlog.json' in os.listdir():
		with open('roomlong.json', 'r') as f:
			data = json.loads(f.read())
		
		for item in data['rooms']:
			i = Room(item['id'])
			i.set_host(item['_host'])

			rooms.append(i)


@sio.event
def joinroom(sid, room): #allow a user to enter the room
	sio.emit('joinroom', { #emit that a user has joined the room
		'user': sid, 
		'timestamp': fetch_UTC()
	})

	room_index = rooms.index([i for i in rooms if i.id == room][0])
	rooms[room_index].add_member(sid)

	sio.enter_room(sid, room)

	@sio.event
	def exitroom(sid): #room exit 
		sio.emit('exitroom', {
			'user': sid,
			'timestamp': fetch_UTC()
		})
		sio.leave_room(sid, room)

	@sio.event
	def message(sid, message: dict):
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

	elif response_data['operation'] == 'change':
		sio.emit('hostchange', {
			'origin': response_data['origin'], 
			'newhost': response_data['userid'],
			'timestamp': fetch_UTC() 
		}, room=response_data['origin'])
		
		room = rooms.index([i for i in rooms if i.id == response_data['origin']][0])
		rooms[room].set_host(response_data['userid'])

	return "200"


@app.route('/getrooms', methods=['GET'])
def get_rooms():
	parsed_data = [{'host': i._host, 'id': i.id} for i in rooms] 
	return jsonify(parsed_data)


@app.route('/getmembers', methods=['GET'])
def get_rooms():
	room_index = rooms.index([i for i in rooms if i.id == request.json()['room']][0])
	return jsonify(rooms[room_index].get_members())



if __name__ == "__main__":
	app.run()