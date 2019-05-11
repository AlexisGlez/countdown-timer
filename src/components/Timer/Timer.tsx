import React from 'react'

import TimeSquare from '../TimeSquare'

import './Timer.css'

type TimerProps = {
  remainingDays: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
}

const Timer: React.FC<TimerProps> = props => (
  <div className="timer">
    <TimeSquare time={props.remainingDays} label="days" />
    <TimeSquare time={props.remainingHours} label="hours" />
    <TimeSquare time={props.remainingMinutes} label="minutes" />
    <TimeSquare time={props.remainingSeconds} label="seconds" />
  </div>
)

export default Timer
