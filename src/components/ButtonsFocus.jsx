import React from 'react'

export default function ButtonsFocus({setBtnTime, btnTime}) {

  return (
		<div className='timer-menu'>
			<button
				onClick={() => setBtnTime('Pomodoro')}
				className={` ${btnTime === 'Pomodoro' ? 'click' : ''}`}
			>
				Pomodoro
			</button>
			<button
				onClick={() => setBtnTime('shortBreak')}
				className={` ${btnTime === 'longBreak' ? 'click' : ''}`}
			>
				Short break
			</button>
			<button
				onClick={() => setBtnTime('longBreak')}
				className={` ${btnTime === 'longBreak' ? 'click' : ''}`}
			>
				Long break
			</button>
		</div>
	)
}
