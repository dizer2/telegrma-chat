import React, { useEffect, useRef, useState } from 'react';
import "./style/Chat.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MicRecorder from 'mic-recorder-to-mp3';
import io from 'socket.io-client';
const socket = io('https://chatio-server.onrender.com/', { transports: ['websocket'] });


const Chat = ({ user, setUser }) => {
	const [inputEmpty, setInputEmpty] = useState(true);
	const [chatMessage, setChatMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [currentUsername, setCurrentUsername] = useState(user.name);
	const [recording, setRecording] = useState(false);
	const audioRecorderRef = useRef(null);
	const [audioElements, setAudioElements] = useState([]);
	const [currentAudioDuration, setCurrentAudioDuration] = useState(0);
	const [opnePopup, setOpnePopup] = useState(false);
	const [urlOpen, setUrlOpen] = useState(false);
	const fileInputRef = useRef(null);
	const fileInputRef2 = useRef(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [onlineUsersCount, setOnlineUsersCount] = useState(0);
	const [avatarUrl, setAvatarUrl] = useState(user.url);


	const updateOnlineUsersCount = (users) => {
		setOnlineUsersCount(users.length);
	};

	const handleChatMessage = (event) => {
		const messageValue = event.target.value;
		setChatMessage(messageValue);
		const isEmpty = messageValue.trim().length === 0;
		setInputEmpty(isEmpty);
	};

	const sendMessage = () => {
		const newMessage = {
			username: user.name,
			message: chatMessage,
			url: user.url,
			timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
		};
		socket.emit('new_message', newMessage);
		setChatMessage('');
		setInputEmpty(true);
	};


	const handleVoiceMessageStart = () => {
		if (!recording) {
			navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
				if (!audioRecorderRef.current) {
					audioRecorderRef.current = new MicRecorder({ bitRate: 256 });
				}
				audioRecorderRef.current.start().then(() => {
					setRecording(true);
				}).catch((error) => {
					console.error(error);
				});
			}).catch((error) => {
				console.error(error);
			});
		}
	};


	const handleVoiceMessageStop = async () => {
		if (recording && audioRecorderRef.current) {
			await audioRecorderRef.current.stop().getMp3().then(([buffer, blob]) => {
				const base64Audio = URL.createObjectURL(blob);
				const tempAudio = new Audio(base64Audio);
				tempAudio.addEventListener('loadeddata', () => {
					const currentDuration = Math.round(tempAudio.duration);
					const newMessage = {
						username: user.name,
						message: base64Audio,
						url: user.url,
						currentAudioDuration: currentDuration,
						timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
						isVoiceMessage: true,
					};
					socket.emit('new_message', newMessage);
				});

				tempAudio.play().catch((error) => {
					console.error(error);
				});

			}).catch((error) => {
				console.error(error);
			});

			setRecording(false);
		}
	};

	const handleReceivedVoiceMessagePlay = async (base64Audio) => {
		const audio = new Audio(base64Audio);

		await new Promise((resolve) => {
			audio.addEventListener('loadeddata', () => {
				console.log(audio.duration);
				console.log(Math.round(audio.duration));
				setCurrentAudioDuration(Math.round(audio.duration));
				resolve();
			});
		});

		audio.play().catch((error) => {
			console.error(error);
		});
	};


	const handleVoiceMessageLoaded = async (index) => {
		if (audioElements[index]) {
			await new Promise((resolve) => {
				audioElements[index].addEventListener('loadeddata', () => {
					setCurrentAudioDuration(Math.round(audioElements[index].duration));
					resolve();
				});
			});

			audioElements[index].play().catch((error) => {
				console.error(error);
			});
		}
	};

	const handleFileInputChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {

				const base64Image = reader.result;
				setAvatarUrl(base64Image);

				setUser((prevUser) => {
					const updatedUser = { ...prevUser, url: base64Image };
					localStorage.setItem('USER-TELEGRAM', JSON.stringify({ name: updatedUser.name, url: updatedUser.url }));
					return updatedUser;
				});
				socket.emit('change_avatar', { username: user.name, avatarUrl: base64Image });
			};

			reader.readAsDataURL(file);
		}
	};

	const handleFileInputChange2 = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64Image = reader.result;
				setSelectedImage(base64Image);

				const newMessage = {
					username: user.name,
					message: base64Image,
					url: user.url,
					timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				};
				socket.emit('new_message', newMessage);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleUploadButtonClick = () => {
		if (fileInputRef2.current) {
			fileInputRef2.current.click();
		}
	};

	const handleAvatarClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	useEffect(() => {
		socket.on('new_message', (message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		socket.on('change_avatar', ({ username, avatarUrl }) => {
			if (username === user.name) {
				setAvatarUrl(avatarUrl);
			}
		});

		socket.on('user_list', (users) => {
			updateOnlineUsersCount(users);
		});

		socket.emit('user_connected', user);

		return () => {

			socket.off('new_message');
			socket.off('user_list');
			socket.off('change_avatar');
		};
	}, [user]);



	const addEmojiToChat = (emoji) => {
		setChatMessage((prevMessage) => prevMessage + emoji);
		setInputEmpty(false);

	};

	const toggleEmojiPopup = () => {
		setOpnePopup((prev) => !prev);
	};

	const handleEnterKeyPress = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			setChatMessage((prevMessage) => prevMessage + '\n');
		}
	};

	const handleChangeName = (newName) => {
		if (newName && newName.trim().length > 0) {
		  socket.emit('change_name', { oldName: currentUsername, newName });
	  
		  setUser((prevUser) => {
			const updatedUser = { ...prevUser, name: newName };
			localStorage.setItem('USER-TELEGRAM', JSON.stringify({ name: updatedUser.name, url: updatedUser.url }));
			return updatedUser;
		  });
	  
		  setCurrentUsername(newName);
		}
	  };

	const handleLogOut = () => {
		localStorage.clear();
	}

	
	return (
		<div className='chat'>
			<div className="chat__left">
				<div className="chat__left-info">
					<div onClick={handleAvatarClick} style={{ backgroundImage: user.url ? `url(${user.url})` : "url('defaultAvatarUrl')", }} className="avatar"
					><div className="avatar__camera"></div></div>
					<input
						type="file"
						accept="image/*"
						style={{ display: "none" }}
						onChange={handleFileInputChange}
						ref={fileInputRef}
					/>
					<div className="info__box">
						<p className='info__box-name'>{currentUsername}</p>
						<div className='info__box-pen' onClick={() => handleChangeName(prompt('Enter your new name'))}></div>
					</div>
				</div>
				<div className="chat__left-setting">
					<Link onClick={handleLogOut} to="/home">
						<button className='button__log-out'>Log out</button>
					</Link>
				</div>
			</div>
			<div className="chat__rigth">
				<div className="chat__rigth-header">
					<div className="header__info">
						<div className="header__info-avatar"></div>
						<div className="header__info-box">
							<p className='header__title'>Global chat</p>
							<p className='header__status'>{onlineUsersCount} online</p>
						</div>
					</div>
					<IconButton className="header__cricle" variant="contained" color="secondary">
						<div className="header__cricle-touch"></div>
					</IconButton>

				</div>
				<div className="chat__rigth-main">

					<div className="container__messege">
						{messages.map((message, index) => (
							<div key={index} className={`newMessege ${message.username === currentUsername ? 'newMessegeMy' : 'newMessegeOther'}`}>
								<div style={{ backgroundImage: message.url ? `url(${message.url})` : `url('defaultAvatarUrl')` }} className="newMessege__avatar"></div>
								<div className="newMessege__messege">
									<div className="newMessege__messege-header">
										<p>{message.username}</p>
									</div>
									<div className="newMessege__messege-main">
										{message.isVoiceMessage ? (
											<>
												<button className='button__voice' onClick={() => handleReceivedVoiceMessagePlay(message.message)}>
													<div className="button__voice-play"></div>
												</button>
												<p>{message.currentAudioDuration}</p>
												<audio ref={(el) => audioElements[index] = el} onLoadedData={() => handleVoiceMessageLoaded(index)} controls preload="auto" className="hidden-audio" />
											</>
										) : (
											<>
												{message.message.startsWith('data:image/') ? (
													<img src={message.message} alt={message.username} />
												) : (
													<p>{message.message}</p>
												)}
											</>
										)}
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
						<Button className="messege__left" onClick={handleUploadButtonClick}>
							<div className="messege__left-file"></div>
							<input
								type="file"
								accept="image/*"
								style={{ display: "none" }}
								onChange={handleFileInputChange2}
								ref={fileInputRef2}
							/>
						</Button>

						<div className="messege__main">
							<textarea
								onChange={(event) => handleChatMessage(event)}
								onKeyDown={handleEnterKeyPress}
								value={chatMessage}
								className='messege__main-messege'
								placeholder='Write a message...'
							/>
						</div>
						<div className="messege__rigth">
							<Button className="messege__rigth-emoji">
								<div className={`emoji__popup ${opnePopup ? 'show' : ''}`}>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😀")} color="secondary">😀</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😁")} color="secondary">😁</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😂")} color="secondary">😂</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🤣")} color="secondary">🤣</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😃")} color="secondary">😃</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😅")} color="secondary">😅</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😆")} color="secondary">😆</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😉")} color="secondary">😉</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😊")} color="secondary">😊</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😎")} color="secondary">😎</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😍")} color="secondary">😍</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🥳")} color="secondary">🥳</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("💪")} color="secondary">💪</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🤙")} color="secondary">🤙</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("❤️")} color="secondary">❤️</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("💛")} color="secondary">💛</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("💚")} color="secondary">💚</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("💙")} color="secondary">💙</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("💜")} color="secondary">💜</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😶‍🌫️")} color="secondary">😶‍🌫️</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🫠")} color="secondary">🫠</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🤑")} color="secondary">🤑</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🥶")} color="secondary">🥶</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("😇")} color="secondary">😇</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🍉")} color="secondary">🍉</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🍊")} color="secondary">🍊</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🍌")} color="secondary">🍌</div>
									<div className='emoji__popup-button' onClick={() => addEmojiToChat("🍍")} color="secondary">🍍</div>

								</div>
								<div onClick={toggleEmojiPopup} className="emoji__bg">
									<div className="emoji"></div>
								</div>
							</Button>

							{inputEmpty ? (
								<Button onMouseDown={handleVoiceMessageStart}
									onMouseUp={handleVoiceMessageStop} className='messege__rigth-voice' color="secondary">
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