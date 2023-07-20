import React from 'react'
import "./style/Input.css"

function Input({text, name, handler, value}) {
  return (
	<input 
		className='home__buttons-input' 
		onChange={(event) => handler(event)}
		name={name} 
		type="text" 
		placeholder={text} 
		value={value}
	/>
  )
}

export default Input;