import { map } from 'ramda'

/**
 * Maps through a list of elements using a function that returns a promise object,
 * then returns a list of the resolved promises if no promises are rejected
 */
export const mapAsync = (fn: (elem: any) => Promise<any>) => async (list: readonly any[]) => {
  const promises = map(fn)(list)
  return await Promise.all(promises)
}

/**
 * Maps through a list of elements using a function that returns a promise object,
 * then returns a list of the resolved promises, regardless if any are rejected or not
 */
export const mapAsyncIgnoreRejected = (fn: (elem: any) => Promise<any>) => async (
  list: readonly [],
) => {
  const promises = map(fn)(list)
  return await Promise.allSettled(promises)
}
