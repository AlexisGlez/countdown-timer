declare module 'react-datetime-picker' {
  import React from 'react'

  export interface ReactDateTimePickerProps {
    onChange: (newDate: Date) => void;
    value: Date;
    minDate?: Date;
    format?: string;
  }

  export default class ReactDateTimePicker extends React.Component<ReactDateTimePickerProps> {}
}
