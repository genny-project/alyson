import { last, length } from 'ramda'
import { getMagnitude } from 'utils/helpers/get-magnitude'

export const fileSizeFormat = fileSize => {
  const magnitudes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  const magnitude = getMagnitude(fileSize)
  const p = Math.floor(magnitude / 3)
  const unit = p < length(magnitudes) ? magnitudes[p] : last(magnitudes)
  const value = (fileSize / Math.pow(10, p * 3)).toFixed(1)

  return `${value} ${unit}`
}
