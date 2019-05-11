import React from 'react'

import './TimeSquare.css'

type TimeSquareProps = {
  time: number;
  label: string;
}

const TimeSquare: React.FC<TimeSquareProps> = props => (
  <div className="time-square--container">
    <p className="time-square--time">{props.time}</p>
    <p className="time-square--label">{props.label}</p>
  </div>
)

export default TimeSquare
