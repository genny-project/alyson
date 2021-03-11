export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (err) {
    console.error('error loading local state', err)
    return undefined
  }
}

export const saveState = (state: Object) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {}
}
