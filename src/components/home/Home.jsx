import React, { useEffect, useState } from 'react'
import "./style/Home.css"
import Logo from '../UI/logo/Logo';
import ButtonUI from '../UI/button/ButtonUI';
import Input from '../UI/input/Input';
import { Link, useNavigate  } from 'react-router-dom';
let number = Math.floor(Math.random() * 8) + 1;
const defaultAvatarImgPromise = import(`./img/avatar${number}.png`);
let defaultAvatarImg;

defaultAvatarImgPromise.then((module) => {
  defaultAvatarImg = module.default;
});


function Home({ setUser }) {
	const navigate = useNavigate();

	useEffect(() => {
		if ("USER-TELEGRAM" in localStorage) {
		  navigate('/chat');
		}
	  }, [navigate]);

	const [email, setEmail] = useState('');
	const [signUp, setSignUp] = useState(false);
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
  
	// Обробник кліку на кнопку SignUp
	const handleSignUp = () => {
	  setSignUp(true);
	};
  
	// Обробник введення електронної пошти
	const handleEmailChange = (event) => {
	  const emailValue = event.target.value;
	  console.log(emailValue);
	  setEmail(emailValue);
	};
  
	// Обробник введення пароля
	const handlePasswordChange = (event) => {
	  const passwordValue = event.target.value;
	  console.log(passwordValue);
	  setPassword(passwordValue);
	};
  
	// Обробник введення імені
	const handleNameChange = (event) => {
	  const nameValue = event.target.value;
	  console.log(nameValue);
	  setName(nameValue);
	};
  
	// Обробник вибору аватару
	const handleAvatarChange = (event) => {
	  const selectedAvatar = event.target.files[0];
	  if (selectedAvatar) {
		const allowedExtensions = ['png', 'jpeg', 'jpg', 'gif', 'svg'];
		const fileExtension = selectedAvatar.name.split('.').pop().toLowerCase();
		const isImage = allowedExtensions.includes(fileExtension);
		if (isImage) {
		  const formData = new FormData();
		  formData.append('avatar', selectedAvatar);
  
		  fetch('https://chatio-server.onrender.com/upload-avatar', {
			method: 'POST',
			body: formData,
		  })
			.then((response) => response.json())
			.then((data) => {
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
  
	// Функція для генерації унікального ідентифікатора
	const generateUniqueId = () => {
	  return Date.now();
	};
  
	// Обробник SignUp
	const handleSignUpSubmit = () => {

		  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		  if (!emailRegex.test(email) && password.length < 6) {
			console.log("gg")
		  }else{
			let defaultAvatarUrl = defaultAvatarImg; 
			const newUser = {
			  id: generateUniqueId(),
			  name: name,
			  password: password,
			  email: email,
			  url: url || defaultAvatarUrl,
			};
			console.log(newUser);
			setUser(newUser);
		
			// Очищення даних про користувача у localStorage
			localStorage.removeItem('USER-TELEGRAM');
			localStorage.setItem('USER-TELEGRAM', JSON.stringify(newUser));
			
		  }
		
		

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
				<Input handler={handleNameChange} value={name}  text="Name" name="text"/>
				<Input handler={handleEmailChange} value={email}  text="Email" name="email"/>
				<Input handler={handlePasswordChange} value={password} text="Password" name="password"/>
				<div className="home__buttons-upload">
				<label htmlFor="avatarUpload" className="upload-button">
					Upload Avatar
					<input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarChange} />
				</label>
				</div>
				
				<div onClick={handleSignUpSubmit}>
				<ButtonUI  text="Sign up" />
				</div>

			</div>
			) : (
			<div className="home__buttons">
				<ButtonUI hadlerSignUp={handleSignUp} text="Sign up" />
			</div>
      	)}

	</div>
  )
}

export default Home;