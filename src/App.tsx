import React from 'react'
import formatDate from 'date-fns/format'
import differenceInSeconds from 'date-fns/difference_in_seconds'

import Header from './components/Header'
import Timer from './components/Timer'
import SelectDate from './components/SelectDate'

import './App.css'

const DEFAULT_TARGET_DATE = new Date(2019, 4, 13, 17) // Monday, May 13 at 5:00 PM

const HOURS_IN_DAY = 24
const MINUTES_IN_DAY = HOURS_IN_DAY * 60
const SECONDS_IN_DAY = MINUTES_IN_DAY * 60

const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE

type AppProps = {}

type RemainingTime = {
  remainingDays: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
}

type AppState = RemainingTime & {
  targetDate: Date;
}

class App extends React.PureComponent<AppProps, AppState> {
  private intervalId: NodeJS.Timeout | undefined

  public constructor(props: AppProps) {
    super(props)

    this.state = {
      ...this.getRemainingTimeUntilTarget(DEFAULT_TARGET_DATE),
      targetDate: DEFAULT_TARGET_DATE,
    }
  }

  public componentDidMount() {
    this.initInterval()
  }

  private initInterval = () => {
    this.clear()
    this.intervalId = setInterval(() => {
      this.setState((prevState) => this.getRemainingTimeUntilTarget(prevState.targetDate))
    }, 1000)
  }

  public componentWillUnmount() {
    this.clear()
  }

  private clear = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  private getRemainingTimeUntilTarget = (targetDate: Date): RemainingTime => {
    const now = new Date()

    const secondsUntilDate = differenceInSeconds(targetDate, now)

    if (secondsUntilDate < 0) {
      this.clear()

      return {
        remainingDays: 0,
        remainingHours: 0,
        remainingMinutes: 0,
        remainingSeconds: 0,
      }
    }

    const remainingDays = secondsUntilDate / SECONDS_IN_DAY
    const remainingHours = (secondsUntilDate % SECONDS_IN_DAY) / SECONDS_IN_HOUR
    const remainingMinutes = (secondsUntilDate % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
    const remainingSeconds = secondsUntilDate % SECONDS_IN_MINUTE

    return {
      remainingDays: Math.floor(remainingDays),
      remainingHours: Math.floor(remainingHours),
      remainingMinutes: Math.floor(remainingMinutes),
      remainingSeconds: Math.floor(remainingSeconds),
    }
  }

  private onDateChange = (newDate: Date) => {
    this.setState({ targetDate: newDate || DEFAULT_TARGET_DATE }, () => { this.initInterval() })
  }

  public render(): React.ReactNode {
    return (
      <div className="app">
        <Header title="Countdown Timer" />
        <Timer
          remainingDays={this.state.remainingDays}
          remainingHours={this.state.remainingHours}
          remainingMinutes={this.state.remainingMinutes}
          remainingSeconds={this.state.remainingSeconds}
        />
        <p className="app--time">left until {formatDate(this.state.targetDate, 'dddd, MMM DD [at] h:mm:ss a')}</p>
        <SelectDate date={this.state.targetDate} onDateChange={this.onDateChange} />
      </div>
    )
  }
}

export default App
