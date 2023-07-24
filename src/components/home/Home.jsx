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

	const SignUp = () => {
		function generateUniqueId() {
			return Date.now();
		  }

		  const newUser = {
			id: generateUniqueId(),
			name: name,
			password: password,
			email: email,
		};
		console.log(newUser);
		setUser(newUser);
		localStorage.removeItem('USER-TELEGRAM');
		localStorage.setItem('USER-TELEGRAM', JSON.stringify(newUser));
	}


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