import React from 'react'
import "./style/Button.css"

function ButtonUI({text}) {
  return (
		<div className="home__buttons-button">
			<p>{text}</p>
		</div>
  )
}

export default ButtonUI;