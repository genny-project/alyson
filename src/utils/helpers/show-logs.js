const showLogs = process.env.NODE_ENV !== 'production' || localStorage.getItem('useDev')

export default showLogs
