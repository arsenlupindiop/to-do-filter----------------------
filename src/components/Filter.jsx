import React from 'react'

const Filter = (props) => {
	const statusHandler = (e) => {
	 props.setActive(e.target.value)
	}
return (
	<select name='filter' className='filter' onChange={statusHandler}>
		<option value='all'>All</option>
		<option value='completed'>Completed</option>
		<option value='uncompleted'>Uncompleted</option>
	</select>
)
}

export default Filter
