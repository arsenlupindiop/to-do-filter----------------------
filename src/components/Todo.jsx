import React from 'react'

const Todo = (props) => {
	const { tasks, setTasks, setTaskFocus } = props
    
	const handleComplete = index => {
		const newTasks = [...tasks]
		if (newTasks[index].completed === false) {
			newTasks[index].completed = true
		} else {
			newTasks[index].completed = false
		}
		setTasks(newTasks)
	}

	const handleRemove = index => {
		const newTasks = [...tasks]
		newTasks.splice(index, 1)
		setTasks(newTasks)
	} 
	return (
		<>
			<ul className='todo'>
				{tasks.map((task, index) => {
				return (
					<li key={index}>
						<div className='checkAndTask'>
							<label className='checkContainer'>
								<input type='checkbox' onChange={() => handleComplete(index)} />
								<span className='checkmark'></span>
							</label>
							<span>{task.task}</span>
						</div>
						<div>
							<button onClick={() => setTaskFocus(task)} className='btn-focus'>
								Focus
							</button>
							<button
								className='btn-remove'
								onClick={() => handleRemove(index)}
							>
								Delete
							</button>
						</div>
					</li>
				)})}
			</ul>
		</>
	)
}

export default Todo
