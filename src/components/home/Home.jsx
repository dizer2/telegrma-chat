import React, { useEffect, useState } from 'react'
import "./style/Home.css"
import Logo from '../UI/logo/Logo';
import ButtonUI from '../UI/button/ButtonUI';
import Input from '../UI/input/Input';
import { Link } from 'react-router-dom';


function Home({setUser}) {
	const [email, setEmail] = useState('');
	const [signUp, setSignUp] = useState(false);
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');

	const hadlerSignUp = () => {
		setSignUp(true);
	}

	const handlerEmail = (event) => {
		console.log(event.target.value);
		setEmail(event.target.value);
	}

	const handlerPassword = (event) => {
		console.log(event.target.value);
		setPassword(event.target.value);
	}

	const handlerName = (event) => {
		console.log(event.target.value);
		setName(event.target.value);
	}
	const handleAvatarChange = (event) => {
		const selectedAvatar = event.target.files[0];
		if (selectedAvatar) {
		  const allowedExtensions = ['png', 'jpeg', 'jpg', 'gif', 'svg'];
		  const fileExtension = selectedAvatar.name.split('.').pop().toLowerCase();
		  const isImage = allowedExtensions.includes(fileExtension);
		  if (isImage) {
			const formData = new FormData();
			formData.append('avatar', selectedAvatar);
	
			// Send the image to the server for upload
			fetch('http://localhost:4000/upload-avatar', {
			  method: 'POST',
			  body: formData,
			})
			  .then((response) => response.json())
			  .then((data) => {
				// Use the returned direct image URL from the server
				const avatarURL = data.imageUrl;
				console.log('Avatar URL:', avatarURL);
				setUrl(avatarURL);
			  })
			  .catch((error) => {
				console.error('Error uploading avatar:', error);
				setUrl('');
			  });
		  } else {
			setUrl('');
		  }
		}
	  };
	
	  const SignUp = () => {
		function generateUniqueId() {
		  return Date.now();
		}
		const defaultAvatarUrl = 'https://-icons-png.flaticon.com/128/6997/.png';

		const newUser = {
		  id: generateUniqueId(),
		  name: name,
		  password: password,
		  email: email,
		  url: url || defaultAvatarUrl, // Use defaultAvatarUrl if url is not provided
		};
		console.log(newUser);
		setUser(newUser);
		localStorage.removeItem('USER-TELEGRAM');
		localStorage.setItem('USER-TELEGRAM', JSON.stringify(newUser));
	  };
	


	


  return (
	<div className='home'>
		<div className="home__rigth-background"></div>
		<div className="home__left-background"></div>
	
		<Logo />
		<p className='home__title'>Melegram Network</p>
		<p className='home__description'>The <span>updated</span> version of the telegram</p>

		{signUp ? (
			<div className="home__buttons  home__buttons-green">
				<Input handler={handlerName} value={name}  text="Name" name="text"/>
				<Input handler={handlerEmail} value={email}  text="Email" name="email"/>
				<Input handler={handlerPassword} value={password} text="Password" name="password"/>
				<div className="home__buttons-upload">
				<label htmlFor="avatarUpload" className="upload-button">
					Upload Avatar
					<input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarChange} />
				</label>
				</div>
				
				<Link onClick={SignUp} to="/chat">
					<ButtonUI text="Sign up" />
				</Link>
			</div>
			) : (
			<div className="home__buttons">
				<ButtonUI hadlerSignUp={hadlerSignUp} text="Sign up" />
				<ButtonUI  text="Sign in" />
			</div>
      	)}

	</div>
  )
}

export default Home;