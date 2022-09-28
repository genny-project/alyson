import showVerbose from 'utils/helpers/show-verbose'

const out = (fn: (message?: any) => void) => (message?: any) => {
  if (showVerbose) {
    fn(message)
  }
}

const log = out(console.log)
const info = out(console.info)
const warn = out(console.warn)
const error = out(console.error)

/**
 * Provides logging functions from `console`, but only if `showVerbose()` returns true
 */
const debugOut = {
  log,
  info,
  warn,
  error,
}

export default debugOut
