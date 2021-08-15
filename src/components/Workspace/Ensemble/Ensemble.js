import React from 'react';
import { Card, Avatar, Input } from 'antd';
import { app } from '../../../config/base';
import Auth from '../../Authentication/AuthenticationModal';
const { Search } = Input;
const { Meta } = Card;

export default class Ensemble extends React.Component {

	handleLogin = () => {
		console.log(app.auth().currentUser);
		console.log('signed in');
	}

	render() {
		return <> 
		{console.log(app.auth().currentUser)}
			{app.auth().currentUser === null ? <Auth onMasterClose={this.handleLogin} /> : <>

				<div style={{ background: '#ECECEC', padding: '30px' }}>
					<Search placeholder="input new ensemble name" enterButton="Create Ensemble" size="large" />
					<h1>join an ensemble</h1>
					<Card style={{ width: 300 }}>
						<Meta
							avatar={<Avatar src="https://www.vippng.com/png/detail/509-5094205_hexagon-rounded-corners-png.png" />}
							title="Berliner Philharmoniker"
						/>
						<p>Host: OctorDocktopus</p>
						<p>3 members</p>
					</Card>
				</div>
			</>}
		</>;
	}
}
