import React, { useEffect, useRef, useState } from 'react';
import "./style/Chat.css";
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import MicRecorder from 'mic-recorder-to-mp3';
import io from 'socket.io-client';
const socket = io('http://localhost:4000', { transports: ['websocket'] });


const Chat = ({ user }) => {
	const [inputEmpty, setInputEmpty] = useState(true);
	const [chatMessage, setChatMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [currentUsername, setCurrentUsername] = useState(user.name);
	const [recording, setRecording] = useState(false);
	const audioRecorderRef = useRef(null); // Ref for MicRecorder instance
	const [audioElements, setAudioElements] = useState([]);
	const [currentAudioDuration, setCurrentAudioDuration] = useState(0);
	const [opnePopup, setOpnePopup] = useState(false);
	const [urlOpen, setUrlOpen] = useState(false);
	const fileInputRef = useRef(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [onlineUsersCount, setOnlineUsersCount] = useState(0);

	const updateOnlineUsersCount = (users) => {
		setOnlineUsersCount(users.length);
	  };
	

	// Handle input for chat message
	const handleChatMessage = (event) => {
	  const messageValue = event.target.value;
	  setChatMessage(messageValue);
	  const isEmpty = messageValue.trim().length === 0;
	  setInputEmpty(isEmpty);
	};
  
  
	// Function to send a new message
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
  
	// Function to start recording voice message
	const handleVoiceMessageStart = () => {
	  if (!recording) {
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
		  if (!audioRecorderRef.current) {
			// Create a new instance of MicRecorder if it doesn't exist
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
  
	// Function to stop recording voice message and send it
	const handleVoiceMessageStop = async () => {
		if (recording && audioRecorderRef.current) {
		  await audioRecorderRef.current.stop().getMp3().then(([buffer, blob]) => {
			const base64Audio = URL.createObjectURL(blob);
	  
			// Use a temporary audio element to get the duration
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
	// Function to play the received voice message
	const handleReceivedVoiceMessagePlay = async (base64Audio) => {
		const audio = new Audio(base64Audio);
	  
		// Use a Promise to wait for the 'loadeddata' event to complete
		await new Promise((resolve) => {
		  audio.addEventListener('loadeddata', () => {
			console.log(audio.duration);
			console.log(Math.round(audio.duration));
			setCurrentAudioDuration(Math.round(audio.duration));
			resolve(); // Resolve the Promise once the event is triggered.
		  });
		});
	  
		// Now that the 'loadeddata' event has completed, play the audio.
		audio.play().catch((error) => {
		  console.error(error);
		});
	  };
	  
	  
	// Function to handle voice message playback on load
	const handleVoiceMessageLoaded = async (index) => {
		if (audioElements[index]) {
		  // Use a Promise to wait for the 'loadeddata' event to complete
		  await new Promise((resolve) => {
			audioElements[index].addEventListener('loadeddata', () => {
			  // The 'loadeddata' event will ensure that the duration is updated correctly.
			  setCurrentAudioDuration(Math.round(audioElements[index].duration));
			  resolve(); // Resolve the Promise once the event is triggered.
			});
		  });
	  
		  // Now that the 'loadeddata' event has completed, play the audio.
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
			// Convert the selected image to base64 and set it in the state
			const base64Image = reader.result;
			setSelectedImage(base64Image);
	  
			// Send the image as a chat message
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
		if (fileInputRef.current) {
		  fileInputRef.current.click();
		}
	  };


	  useEffect(() => {
		socket.on('new_message', (message) => {
		  setMessages((prevMessages) => [...prevMessages, message]);
	
		  if (message.isVoiceMessage) {
			handleReceivedVoiceMessagePlay(message.message);
		  }
		});
	
		socket.on('user_list', (users) => {
		  updateOnlineUsersCount(users);
		});
	

		socket.emit('user_connected', user);
	
		return () => {
		  socket.off('new_message');
		  socket.off('user_list');
		};
	  }, [user]);

	  const addEmojiToChat = (emoji) => {
		setChatMessage((prevMessage) => prevMessage + emoji);
	  };

	  const toggleEmojiPopup = () => {
		setOpnePopup((prev) => !prev);
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
						<p className='header__status'>{onlineUsersCount} online</p>
					</div>
				</div>
				<IconButton  className="header__cricle" variant="contained" color="secondary">
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
							onChange={handleFileInputChange}
							ref={fileInputRef}
						/>
					</Button>
					
					<div className="messege__main">
						<input 	onChange={(event) => handleChatMessage(event)} value={chatMessage} className='messege__main-messege' placeholder='Write a message...' type="text" />
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
							<Button   onMouseDown={handleVoiceMessageStart}
							onMouseUp={handleVoiceMessageStop}  className='messege__rigth-voice' color="secondary">
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