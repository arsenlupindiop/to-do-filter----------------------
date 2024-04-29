import React, {useState} from 'react';
import { InputNumber } from 'antd'
import { memo } from 'react';

const Form = memo((props) => {
	const [pomos, setPomos] = useState(2)

	const handleChange = e => {
		props.setFormInput(e.target.value)
	}
    
	const handleSubmit = e => {
		e.preventDefault()
		if (props.formInput !== '' && !props.tasks.some(task => task.task === props.formInput)) {
			const newTask = {
				date: new Date().toLocaleString(),
				task: props.formInput,
				completed: false,
				pomos: pomos,
				index: props.tasks.length,
			}
			props.addTasks(newTask)
			props.setFormInput('')
		}
	}
	const onChange = (pomos) => {
		setPomos(pomos)
	}
	return (
		<>
			<form className='formInput' onSubmit={handleSubmit}>
				<label htmlFor='taskInput'></label>
				<input
					required
					type='text'
					value={props.formInput}
					onChange={handleChange}
					className=''
				/>
				<InputNumber
					min={1}
					max={10}
					defaultValue={pomos}
					onChange={onChange}
					className='inputNumber'
					color='7E7E7E'
					
				/>
				<button className='btn-add'>add</button>
			</form>
		</>
	)
})

export default Form