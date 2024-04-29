import React, { useEffect, useRef, useState } from 'react'
import { Progress } from 'antd'
import SettingsContext from './SettingsContext'

export default function CountDown({
	timer,
	setTimer,
	timerChange,
	btnTime,
	focus,
	handleTimeChange,
	donePomos,
	setdonePomos,
	taskFocus
}) {
	const timerRef = useRef(timer)
	const [isRunning, setIsRunning] = useState(true);

	const timerToString = timer => {
		const minutes = ('0' + Math.floor(timer / 60)).slice(-2)
		let seconds = ('0' + (timer % 60)).slice(-2)
		return minutes + ':' + seconds
	}

	useEffect(() => {
		timerRef.current = timer
		if (timer > 0 && isRunning) {
			const timerId = setTimeout(() => {
				setTimer(timerRef.current - 1)
			}, 1000)

			return () => {
				clearTimeout(timerId)
			}
		} else if (timer <= 0) {
			if (btnTime === 'Pomodoro') {
				setdonePomos(prevDonePomos => prevDonePomos + 1)
				console.log(donePomos)
			  handleTimeChange('shortBreak')
			} else {
			  handleTimeChange('Pomodoro')
			}
			if (donePomos === taskFocus.pomos) {
				setTimer()
			}
		}
	}, [timer, setTimer, isRunning])

	return (
		timer ? (
			 <div className={`countdown-container`}>
			{timerToString(timer)}
			<div className='progress-container'>
				<Progress
					className='progressBar'
					percent={Math.round((timer / timerChange(btnTime)) * 100)}
					format={() => ''}
					showInfo={false}
					strokeColor={'#98D988'}
					size={[100, 14]}
				/>
				<button className='btn-next' onClick={() => setTimer(0)}>
					skip
				</button>
				<button className='btn-next' onClick={() => setIsRunning( prev => !prev)}>start/stop</button>
			</div>
		</div>
		) : (
		<div className={`countdown-container`}>0:00</div>
		)
	)
}
