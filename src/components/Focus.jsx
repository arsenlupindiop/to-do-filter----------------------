import React, { useEffect } from 'react'
import TrackVisibility from 'react-on-screen'
import ButtonsFocus from './ButtonsFocus'
import { useState} from 'react'
import CountDown from './CountDown'
import { InputNumber } from 'antd'

const Focus = ({ taskFocus, setTaskFocus }) => {
	const [btnTime, setBtnTime] = useState()
	const [workMinutes, setWorkMinutes] = useState(0.3)
	const [longMinutes, setLongMinutes] = useState(0.2)
	const [shortMinutes, setShortMinutes] = useState(0.1)
	const [timer, setTimer] = useState()
	const [donePomos, setdonePomos] = useState(0)
	const [modal, setModal] = useState(false)
    
	const handleTimeChange = newTime => {
		setBtnTime(newTime)
		setTimer(timerChange(newTime))
	}
	const timerChange = newTime => {
		return newTime === 'Pomodoro'
			? workMinutes * 60
			: newTime === 'longBreak'
			? longMinutes * 60
			: shortMinutes * 60
	}

	useEffect(() => {
	    getTimer()
	}, [])
	useEffect(() => {
		saveTimer()
	}, [timer])
	const saveTimer = () => {
	  localStorage.setItem(`${taskFocus.index}_timer`, JSON.stringify(timer))
	  localStorage.setItem(`${taskFocus.index}_donePomos`, JSON.stringify(donePomos))
	  localStorage.setItem(`${taskFocus.index}_workMinutes`, JSON.stringify(workMinutes))
	  localStorage.setItem(`${taskFocus.index}_shortMinutes`, JSON.stringify(shortMinutes))
	  localStorage.setItem(`${taskFocus.index}_longMinutes`, JSON.stringify(longMinutes))
	}
	const getTimer = () => {
		const localTimer = localStorage.getItem(`${taskFocus.index}_timer`)
		const localWorkMinutes = localStorage.getItem(
			`${taskFocus.index}_workMinutes`
		)
		const localShortMinutes = localStorage.getItem(
			`${taskFocus.index}_shortMinutes`
		)
		const localLongMinutes = localStorage.getItem(
			`${taskFocus.index}_longMinutes`
		)

		if (localTimer && localTimer !== 'undefined') {
			setTimer(JSON.parse(localTimer))
			if (localWorkMinutes && localWorkMinutes !== 'undefined') {
				setWorkMinutes(JSON.parse(localWorkMinutes))
			}
			if (localShortMinutes && localShortMinutes !== 'undefined') {
				setShortMinutes(JSON.parse(localShortMinutes))
			}
			if (localLongMinutes && localLongMinutes !== 'undefined') {
				setLongMinutes(JSON.parse(localLongMinutes))
			}
		}
	}
	
	return (
		<TrackVisibility>
			{({ isVisible }) => (
				<div
					className={`timer-container ${isVisible ? 'visible' : ''} ${btnTime}`}
				>
					<ButtonsFocus setBtnTime={handleTimeChange} btnTime={btnTime} />
					<CountDown
						timer={timer}
						setTimer={setTimer}
						timerChange={timerChange}
						btnTime={btnTime}
						handleTimeChange={handleTimeChange}
						taskFocus={taskFocus}
						donePomos={donePomos}
						setdonePomos={setdonePomos}
					/>
					<h2 className='focusTask'>
						{' '}
						Task {taskFocus.index + 1}: {taskFocus.task}
					</h2>
					<span className='pomos'>
						Done pomos: {donePomos} / {taskFocus.pomos}
					</span>
					<button className='btn-home' onClick={() => setTaskFocus()}>
						home
					</button>
					<button className='btn-home' onClick={() => setModal(true)}>
						settings
					</button>
					{modal && (
						<div className='modal'>
							<div className='modal-content'>
								<h4>Pomodoro</h4>
								<InputNumber
									defaultValue={workMinutes}
									onChange={setWorkMinutes}
									min={10}
									max={300}
								/>
								<h4>Short Break</h4>
								<InputNumber
									defaultValue={shortMinutes}
									onChange={setShortMinutes}
									min={5}
									max={15}
								/>
								<h4>Long Break</h4>
								<InputNumber
									defaultValue={longMinutes}
									onChange={setLongMinutes}
									min={20}
									max={60}
								/>
							</div>
							<span className='close' onClick={() => setModal(false)}>
								Close
							</span>
						</div>
					)}
				</div>
			)}
		</TrackVisibility>
	)
}

export default Focus