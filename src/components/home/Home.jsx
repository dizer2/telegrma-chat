import React, { useState } from 'react'
import "./style/Home.css"
import Logo from '../UI/logo/Logo';
import ButtonUI from '../UI/button/ButtonUI';
import Input from '../UI/input/Input';
import { Link } from 'react-router-dom';


function Home() {
	const [signUp, setSignUp] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');



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

  return (
	<div className='home'>
		<div className="home__rigth-background"></div>
		<div className="home__left-background"></div>
	
		<Logo />
		<p className='home__title'>Melegram Network</p>
		<p className='home__description'>The <span>updated</span> version of the telegram</p>

		{signUp ? (
			<div className="home__buttons  home__buttons-green">
				<Input handler={handlerEmail} value={email}  text="Email" name="email"/>
				<Input handler={handlerPassword} value={password} text="Password" name="password"/>
				
				<Link to="/chat">
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