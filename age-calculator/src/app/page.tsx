'use client'
import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [bday, setBday] = useState({
    day: {
      value: '',
      isTouched: false
    },
    month: {
      value: '',
      isTouched: false
    },
    year: {
      value: '',
      isTouched: false
    }
  })

  interface Result {
    year: '--' | number,
    day: '--' | number,
    month: '--' | number
  }
  const [result, setResult] = useState<Result>({
    year: '--',
    day: '--',
    month: '--'
  })

  const formIsValid = () => {
    return bday.day.value != '' && bday.month.value != '' && bday.year.value != ''
  }

  const isValidDay = (day: string) => Number(day) < 32 && Number(day) > 0
  const isValidMonth = (month: string) => Number(month) < 13 && Number(month) > 0
  const isValidYear = (year: string) => {
    const currentYear = new Date().getFullYear()
    return Number(year) < currentYear + 1
  }

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    const currMonth = new Date().getMonth()
    const currDay = new Date().getDay()
    const currYear = new Date().getFullYear()

    let resultMonth
    let resultDay
    let resultYear = currYear - Number(bday.year.value)

    if (Number(bday.month.value) > currMonth) {
      resultYear--
      resultMonth = 12 - (Number(bday.month.value) - currMonth)
    } else {
      resultMonth = 12 - (currMonth - Number(bday.month.value))
    }

    if (Number(bday.day.value) > currDay) {
      resultMonth--
      resultDay = 31 - (Number(bday.day.value) - currDay)
    } else {
      resultDay = 31 - (currDay - Number(bday.day.value))
    }

    console.log(resultYear, resultMonth, resultDay)

    setResult({
      ...result,
      year: resultYear,
      month: resultMonth,
      day: resultDay
    })

  }

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className="input-box">
            <label htmlFor="day">DAY</label>
            <input type="number"
              name="day"
              placeholder="DD"
              required
              value={bday.day.value}
              onChange={e => setBday({ ...bday, day: { ...bday.day, value: e.target.value } })}
              onBlur={() => setBday({ ...bday, day: { ...bday.day, isTouched: true } })}
              style={!isValidDay(bday.day.value) && bday.day.isTouched ? { border: '1px solid red' } : { border: '1px solid #a9a9a9' }}
            />
            {!isValidDay(bday.day.value) && bday.day.isTouched ?
              <p>Must be a valid day.</p>
              : null
            }
          </div>
          <div className="input-box">
            <label htmlFor="month">MONTH</label>
            <input type="number"
              name="month"
              placeholder="MM"
              required
              value={bday.month.value}
              onChange={e => setBday({ ...bday, month: { ...bday.month, value: e.target.value } })}
              onBlur={() => setBday({ ...bday, month: { ...bday.month, isTouched: true } })}
              style={!isValidMonth(bday.month.value) && bday.month.isTouched ? { border: '1px solid red' } : { border: '1px solid #a9a9a9' }}
            />
            {!isValidMonth(bday.month.value) && bday.month.isTouched ?
              <p>Must be a valid month</p>
              : null
            }
          </div>
          <div className="input-box">
            <label htmlFor="year">YEAR</label>
            <input type="number"
              name="year"
              placeholder="YYYY"
              required
              value={bday.year.value}
              onChange={e => setBday({ ...bday, year: { ...bday.year, value: e.target.value } })}
              onBlur={() => setBday({ ...bday, year: { ...bday.year, isTouched: true } })}
              style={!isValidYear(bday.year.value) && bday.year.isTouched ? { border: '1px solid red' } : { border: '1px solid #a9a9a9' }}
            />
            {!isValidYear(bday.year.value) && bday.year.isTouched ?
              <p>Year must be in the past.</p>
              : null
            }
          </div>
        </div>
        <div className={styles.arrowLine}>
            <hr /> <button className={styles.btn} type='submit' disabled={!formIsValid() || !isValidDay(bday.day.value) || !isValidMonth(bday.month.value) || !isValidYear(bday.year.value)}></button>
        </div>
        <div className="result">
          <h1><span>{result.year}</span> years</h1>
          <h1><span>{result.month}</span> months</h1>
          <h1><span>{result.day}</span> days</h1>
        </div>
      </form>
    </>
  )
}
