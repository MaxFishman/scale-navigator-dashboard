import json

class Room:
	def __init__(self, creator_id: str):
		self.id = creator_id
		self._host = creator_id

	def set_host(self, newhost) -> None: 
		self._host=  newhost 

	def save_room_to_file(self):
		with open('roomlog.json', 'w+') as f: 
			try: 
				data = json.loads(f.read())
				if self.id not in [i['id'] for i in data['rooms']]:
					data['rooms'].append(vars(self))
			except json.decoder.JSONDecodeError: #file is likely empty
				data = {'rooms': [vars(self)]}

			f.write(json.dumps(data))


if __name__ == "__main__":
	r = Room('123')
	r.save_room_to_file()
