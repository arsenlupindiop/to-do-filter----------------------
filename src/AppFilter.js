import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Todo from './components/Todo';
import './App.css';
import Filter from './components/Filter';

function App() {
	const [formInput, setFormInput] = useState('')
	const [tasks, setTasks] = useState([])
	const [filterToDo, setFilterTodo] = useState([])
	const [filter, setFilter] = useState(false)
	const [active, setActive] = useState('all')
	
    useEffect(() => {
	  getLocalTodos()  
	}, [])  

	useEffect(() => {
		tasks.length > 0 ? setFilter(true) : setFilter(false);
	}, [tasks])

	useEffect(() => {
	   handleFilter()
       saveLocalTodos()
	}, [tasks])


	const saveLocalTodos = () => {
	  localStorage.setItem('tasks', JSON.stringify(tasks))
	}
	
	const getLocalTodos = () => {
	  if (localStorage.getItem('tasks') === null) {
	    localStorage.setItem('tasks', JSON.stringify([]))
	  } else {
	    let LocalTodos = JSON.parse(localStorage.getItem('tasks'))
		setTasks(LocalTodos)
	  }
	}
      
    const handleFilter = () => {
	  switch(active) {
      case "completed":
        setFilterTodo(tasks.filter(item=> item.completed === true ))
        break;
      case "uncompleted":
        setFilterTodo(tasks.filter(item=> item.completed === false ))   
        break;
      default:
        setFilterTodo(tasks);
        break;
        }

	}
   
	return (
		<div className='App'>
			<Form
				setTasks={setTasks}
				tasks={tasks}
				setFormInput={setFormInput}
				formInput={formInput}
			/>
			<Todo
				tasks={tasks}
				setTasks={setTasks}
			/>
			{filter ? <Filter setActive={setActive} /> : ''}
		</div>
	)
	}


export default App