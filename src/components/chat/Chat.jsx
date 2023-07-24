import React, { useEffect, useState } from 'react'
import "./style/Chat.css"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import io from 'socket.io-client'; // Додали бібліотеку socket.io-client
const socket = io('http://localhost:4000', { transports: ['websocket'] }); // 

function Chat({user}) {
	console.log(user);
	const [selected, setSelected] = useState(false);
	const [inputEmpty, setInputEmpty] = useState(true);
	const [chatmessege, setChatmessege] = useState('');
	const [messages, setMessages] = useState([]);
	const [currentUsername, setCurrentUsername] = useState(user.name); 

	const handlerChatMessege = (event) => {

		console.log(event.target.value);
		setChatmessege(event.target.value);
		const isEmpty = event.target.value.trim().length === 0;
    	setInputEmpty(isEmpty);
		console.log(isEmpty);
	}
	
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const userInfo = { user }; 
	

		socket.emit('user_connected', userInfo);
	
		socket.on('user_list', (users) => {
		  setUsers(users);
		});
	
		socket.on('new_message', (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});


		return () => {
		  socket.off('new_message');
		  socket.off('new_message');

		};
	  }, [currentUsername]);
	
	
	  const sendMessage = () => {
		console.log('send');
		console.log(messages);
		console.log(user.url);
		const newMessage = {
		  username: user.name,
		  message: chatmessege,
		  url: user.url,
		  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
		};

		socket.emit('new_message', newMessage);
		setChatmessege('');
		setInputEmpty(true);
	  };

  return (
	<div className='chat'>
		<div className="chat__left">

		</div>
		<div className="chat__rigth">
			<div className="chat__rigth-header">
				<div className="header__info">
					<div className="header__info-avatar"></div>
					<div className="header__info-box">
						<p className='header__title'>Global chat</p>
						<p className='header__status'>3 online</p>
					</div>
				</div>
				<IconButton  className="header__cricle" variant="contained" color="secondary">
					<div className="header__cricle-touch"></div>
				</IconButton>

				
			</div>
			<div className="chat__rigth-main">
				
				<div className="container__messege">
				{messages.map((message, index) => (
				<div  key={index} className={`newMessege ${ message.username === currentUsername ? 'newMessegeMy' : 'newMessegeOther'}`}>
					<div  style={{ backgroundImage: message.url ? `url(${message.url})` : `url('defaultAvatarUrl')` }}className="newMessege__avatar"></div>
					<div className="newMessege__messege">
					<div className="newMessege__messege-header">
						<p>{message.username}</p>
					</div>
					<div className="newMessege__messege-main">
						<p>{message.message}</p>
					</div>
					<div className="newMessege__messege-bottom">
						<p>{message.timestamp}</p>
					</div>
					</div>
				</div>
				))}


					
				</div>
				
			</div>

			<div className="chat__rigth-bottom">
				<div className="messege">
					<Button className="messege__left">
						<div className="messege__left-file"></div>
					</Button>
					
					<div className="messege__main">
						<input 	onChange={(event) => handlerChatMessege(event)} value={chatmessege} className='messege__main-messege' placeholder='Write a message...' type="text" />
					</div>
					<div className="messege__rigth">
						<Button className="messege__rigth-emoji">
							<div className="emoji"></div>
						</Button>

						{inputEmpty ? (
							<Button  className='messege__rigth-voice' color="secondary">
									<div className="send"></div>
							</Button>
						) : (
							<Button onClick={sendMessage} className='messege__rigth-send' color="secondary">
									<div className="messege-send"></div>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Chat;