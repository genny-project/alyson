import timeZone from 'utils/helpers/timezone_magic/time-zone-from-browser'

const userLocale = navigator.language || navigator.languages[0]

const timeBasedOnTimeZone = (
  date: Date,
  { locale, includeTime }: { locale: string; includeTime: Boolean | undefined } = {
    locale: userLocale,
    includeTime: false,
  },
) =>
  includeTime
    ? date.toLocaleString(locale, { timeZone, hour12: true }).replace(':00', '')
    : date.toLocaleDateString(locale, { timeZone })

export default timeBasedOnTimeZone
