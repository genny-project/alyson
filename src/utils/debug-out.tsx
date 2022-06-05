import showLogs from 'utils/helpers/show-logs'

const out = (fn: (message?: any) => void) => (message?: any) => {
  if (showLogs()) {
    fn(message)
  }
}

/**
 * Preforms console.log as long as `showLogs()` is `true`
 */
const log = (message?: any) => out(console.log)

/**
 * Preforms console.info as long as `showLogs()` is `true`
 */
const info = (message?: any) => out(console.info)

/**
 * Preforms console.warn as long as `showLogs()` is `true`
 */
const warn = (message?: any) => out(console.warn)

/**
 * Preforms console.error as long as `showLogs()` is `true`
 */
const error = (message?: any) => out(console.error)

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
