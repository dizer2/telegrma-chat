import React from 'react'
import "./style/Home.css"
import Logo from '../UI/logo/Logo';
import ButtonUI from '../UI/button/ButtonUI';

function Home() {
  return (
	<div className='home'>
		<div className="home__rigth-background"></div>
		<div className="home__left-background"></div>
	
		<Logo />
		<p className='home__title'>Melegram Network</p>
		<p className='home__description'>The <span>updated</span> version of the telegram</p>
		<div className="home__buttons">
			<ButtonUI text="Sign in" />
			<ButtonUI text="Sign up" />
		</div>

	</div>
  )
}

export default Home;