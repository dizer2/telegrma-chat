import React, { useState } from 'react'
import "./style/Chat.css"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


function Chat() {
	const [selected, setSelected] = useState(false);

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
					<div className="newMessege newMessegeOther">
						<div className="newMessege__avatar"></div>
						<div className="newMessege__messege">
							<div className="newMessege__messege-header">
								<p>kiguk</p>
							</div>
							<div className="newMessege__messege-main">
								<p>lore2 mins? lorem</p>
							</div>
							<div className="newMessege__messege-bottom">
								<p>10:03 AM</p>
							</div>
						</div>
					</div>

					<div className="newMessege newMessegeMy">
						<div className="newMessege__avatar"></div>
						<div className="newMessege__messege">
							<div className="newMessege__messege-header">
								<p>kiguk</p>
							</div>
							<div className="newMessege__messege-main">
								<p>lore2 mins? lorem</p>
							</div>
							<div className="newMessege__messege-bottom">
								<p>10:03 AM</p>
							</div>
						</div>
					</div>
					<div className="newMessege newMessegeMy">
						<div className="newMessege__avatar"></div>
						<div className="newMessege__messege">
							<div className="newMessege__messege-header">
								<p>kiguk</p>
							</div>
							<div className="newMessege__messege-main">
								<p>lore2 mins? lorem</p>
							</div>
							<div className="newMessege__messege-bottom">
								<p>10:03 AM</p>
							</div>
						</div>
					</div>
					<div className="newMessege newMessegeOther">
						<div className="newMessege__avatar"></div>
						<div className="newMessege__messege">
							<div className="newMessege__messege-header">
								<p>kiguk</p>
							</div>
							<div className="newMessege__messege-main">
								<p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum quam labore saepe ex voluptatum, rem voluptates recusandae necessitatibus debitis, incidunt cumque non adipisci? Sapiente, voluptate. Sint facilis architecto accusamus expedita molestiae. Illo nulla error magni delectus distinctio tenetur iste temporibus pariatur officiis quisquam nam, praesentium numquam assumenda natus excepturi rerum?</p>
							</div>
							<div className="newMessege__messege-bottom">
								<p>10:03 AM</p>
							</div>
						</div>
					</div>
					<div className="newMessege newMessegeMy">
						<div className="newMessege__avatar"></div>
						<div className="newMessege__messege">
							<div className="newMessege__messege-header">
								<p>kiguk</p>
							</div>
							<div className="newMessege__messege-main">
								<p>lore2 mins? lorem</p>
							</div>
							<div className="newMessege__messege-bottom">
								<p>10:03 AM</p>
							</div>
						</div>
					</div>
					<div className="newMessege newMessegeMy">
						<div className="newMessege__avatar"></div>
						<div className="newMessege__messege">
							<div className="newMessege__messege-header">
								<p>kiguk</p>
							</div>
							<div className="newMessege__messege-main">
								<p>lore2 mins? lorem</p>
							</div>
							<div className="newMessege__messege-bottom">
								<p>10:03 AM</p>
							</div>
						</div>
					</div>
					<div className="newMessege newMessegeOther">
						<div className="newMessege__avatar"></div>
						<div className="newMessege__messege">
							<div className="newMessege__messege-header">
								<p>kiguk</p>
							</div>
							<div className="newMessege__messege-main">
								<p>lore2 mins? lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur placeat modi excepturi corrupti exercitationem recusandae quasi, iste amet et suscipit.</p>
							</div>
							<div className="newMessege__messege-bottom">
								<p>10:03 AM</p>
							</div>
						</div>
					</div>

					
				</div>
			


				
			</div>

			<div className="chat__rigth-bottom">
				<div className="messege">
					<Button className="messege__left">
						<div className="messege__left-file"></div>
					</Button>
					
					<div className="messege__main">
						<input className='messege__main-messege' placeholder='Write a message...' type="text" />
					</div>
					<div className="messege__rigth">
						<Button className="messege__rigth-emoji">
							<div className="emoji"></div>
						</Button>

						<Button className='messege__rigth-send' color="secondary">
							<div className="send"></div>
						</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Chat;