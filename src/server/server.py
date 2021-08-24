#env/bin/python3

from flask.globals import request
import socketio 
from flask import Flask

sio = socketio.AsyncServer()

app = Flask(__name__) 
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

rooms = []

@sio.event
def begin_chat(sid):
	sio.enter_room(sid, 'chat_users')

	@sio.event
	def exit_chat(sid):
		sio.leave_room(sid, 'chat_users')


@app.route('/room', methods=['POST'])
def create_room(): 
	response_data = request.json() 
	if response_data['operation'] == 'create':
		if response_data['roomid'] in rooms: 
			return "400"
		else: 
			rooms.append(response_data['roomid'])
	
	elif response_data['operation'] == 'destroy':
		rooms.remove(request.json()['roomid'])	
	
	return "200"

if __name__ == "__main__":
	app.run()