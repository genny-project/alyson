import timeZone from 'utils/helpers/timezone_magic/time-zone-from-browser'

const userLocale = navigator.language || navigator.languages[0]

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec']

const timeBasedOnTimeZone = (
  date: Date,
  {
    locale,
    includeTime,
    onlyYear,
    month,
  }: { locale: string; includeTime?: Boolean; onlyYear: Boolean | undefined; month?: Boolean } = {
    locale: userLocale,
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
      ? date
          .toLocaleString(locale, {
            timeZone,
            hour12: true,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
          .replace(':00', '')
      : date.toLocaleDateString(locale, {
          timeZone,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
  } catch (_) {
    return new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date())
  }
}

export default timeBasedOnTimeZone
