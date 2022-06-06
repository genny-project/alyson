import showLogs from 'utils/helpers/show-logs'

const out = (fn: (message?: any) => void) => (message?: any) => {
  if (showLogs()) {
    fn(message)
  }
}

const log = out(console.log)
const info = out(console.info)
const warn = out(console.warn)
const error = out(console.error)

/**
 * Provides logging functions from `console`, but only if `showLogs()` returns true
 */
const debugOut = {
  log,
  info,
  warn,
  error,
}

export default debugOut
