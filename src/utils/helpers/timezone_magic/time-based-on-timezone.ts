import timeZone from 'utils/helpers/timezone_magic/time-zone-from-browser'

const userLocale = navigator.language || navigator.languages[0]

const timeBasedOnTimeZone = (
  date: Date,
  { locale = userLocale, includeTime }: { locale: string; includeTime: Boolean | undefined },
) =>
  includeTime
    ? date.toLocaleString(locale, { timeZone })
    : date.toLocaleDateString(locale, { timeZone })

export default timeBasedOnTimeZone
