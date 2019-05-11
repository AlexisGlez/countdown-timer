import React from 'react'
import DateTimePicker from 'react-datetime-picker'

import './SelectDate.css'

type SelectDateProps = {
  date: Date;
  onDateChange: (newDate: Date) => void;
}

const SelectDate: React.FC<SelectDateProps> = props => (
  <div>
    <p className="select-date--message">Click below to change the target date:</p>
    <DateTimePicker
      onChange={props.onDateChange}
      value={props.date}
      minDate={new Date()}
      format="MM/dd/y h:mm:ss a"
    />
  </div>
)

export default SelectDate
