import React, { useState, useEffect } from 'react'
import { Slider } from '@material-ui/core'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { Read } from '../text'

const defaultTimeRange = [9, 17.5]

const Write = ({ questionCode, onSendAnswer, data }) => {
  const [initialStartTime, initialEndTime] = data?.value
    ? safelyParseJson(data?.value, defaultTimeRange)
    : defaultTimeRange

  const [selectedRange, setSelectedRange] = useState([initialStartTime, initialEndTime])

  const handleChange = (_, selection) => {
    setSelectedRange(selection)
  }

  const handleCommit = (_, selection) => {
    onSendAnswer(selection)
  }

  useEffect(() => {
    if (!data?.value) onSendAnswer(selectedRange)
  }, [data?.value, onSendAnswer, selectedRange])

  return (
    <Slider
      test-id={questionCode}
      value={selectedRange}
      onChange={handleChange}
      onChangeCommitted={handleCommit}
      min={0}
      step={0.5}
      max={23}
      marks
      valueLabelDisplay={'on'}
      valueLabelFormat={x =>
        `${Math.floor(x > 12.5 ? x - 12 : x < 1 ? 12 : x)}${x % 1 > 0 ? ':30' : ''} ${
          x < 12 ? 'am' : 'pm'
        }`
      }
    />
  )
}

const TimeRange = {
  Write,
  Read,
}

export default TimeRange
