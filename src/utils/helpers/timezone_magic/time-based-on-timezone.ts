// import timeZone from 'utils/helpers/timezone_magic/time-zone-from-browser'

import { format } from 'date-fns'

// const userLocale = navigator.language || navigator.languages[0]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const timeBasedOnTimeZone = (
  date: Date,
  {
    // locale,
    includeTime,
    onlyYear,
    month,
    timeZone,
  }: {
    // locale: string
    includeTime?: Boolean
    onlyYear: Boolean | undefined
    month?: Boolean
    timeZone?: string
  } = {
    // locale: userLocale,
    includeTime: false,
    onlyYear: false,
    month: false,
  },
) => {
  try {
    return onlyYear
      ? new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
      : month
      ? `${months[date.getMonth()]}, ${date.getFullYear()}`
      : includeTime
      ? format(new Date(date), 'dd MMM yyyy, EEE, K:I aa')
      : format(new Date(date), 'dd MMM yyyy')
  } catch (_) {
    return new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date())
  }
}

export default timeBasedOnTimeZone
