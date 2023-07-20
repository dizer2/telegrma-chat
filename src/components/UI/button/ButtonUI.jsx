import React from 'react'
import "./style/Button.css"

function ButtonUI({text, hadlerSignUp}) {
  return (
		<div className="home__buttons-button" onClick={hadlerSignUp}>
			<p>{text}</p>
		</div>
  )
}

export default ButtonUI;