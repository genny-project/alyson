import { Select } from '@chakra-ui/react'
import { map } from 'ramda'
import defaultTimeZones from 'utils/helpers/time-zone.json'

const TimeZone = () => {
  return (
    <Select placeholder="Select Time Zone" onChange={e => console.log(e.target.value)}>
      {map(([key, val]) => {
        return <option value={val}>{key}</option>
      })(Object.entries(defaultTimeZones))}
    </Select>
  )
}

export default TimeZone
