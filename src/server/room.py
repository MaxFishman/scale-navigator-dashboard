import json

class Room:
	def __init__(self, creator_id: str, name: str):
		self.id = creator_id
		self._host = creator_id
		self.members = []
		self.name = name

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

	def get_members(self): 
		return {
			'members': self.members
		}

	def add_members(self, member_id: str):
		self.members.append(member_id)


if __name__ == "__main__":
	r = Room('123')
	r.save_room_to_file()
