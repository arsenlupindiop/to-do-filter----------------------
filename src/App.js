import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Form from './components/Form';
import Todo from './components/Todo';
import Focus from './components/Focus';

function App() {
	const [formInput, setFormInput] = useState('')
	const [tasks, setTasks] = useState([])
	const [taskFocus, setTaskFocus] = useState('')
	
    useEffect(() => {
	  getLocalTodos()  
	}, [])  
	useEffect(() => {
       saveLocalTodos()
	}, [tasks])
	const saveLocalTodos = () => {
		if (tasks.length === 0) {
			localStorage.clear()
		} else {
	  localStorage.setItem('tasks', JSON.stringify(tasks))
	}
	}
	const getLocalTodos = () => {
	  if (localStorage.getItem('tasks') === null) {
	    localStorage.setItem('tasks', JSON.stringify([]))
	  } else {
	    let LocalTodos = JSON.parse(localStorage.getItem('tasks'))
		setTasks(LocalTodos)
	  }
	}
	
	const addTasks = useCallback((newTask) => {
		setTasks(prev => [...prev, newTask])
	}, [])
	return (
		<div className='App'>
			{taskFocus ? (
				<Focus taskFocus={taskFocus} setTaskFocus={setTaskFocus}/>
			) : (
				<>
					<Form
						setTasks={setTasks}
						tasks={tasks}
						setFormInput={setFormInput}
						formInput={formInput}
						addTasks={addTasks}
					/>
					<Todo
						tasks={tasks}
						setTasks={setTasks}
						setTaskFocus={setTaskFocus}
					/>
				</>
			)}
		</div>
	)
	}


export default App