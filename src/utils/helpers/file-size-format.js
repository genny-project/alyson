import { reduce } from 'ramda'

export const fileSizeFormat = fileSize => {
  const magnitudes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  let i = 0
  let magnitude = magnitudes[i]

  const size = reduce((acc, elem) => {
    const divided = fileSize / Math.pow(10, i * 3)

    if (divided >= 1) {
      magnitude = elem
      acc = divided.toFixed(1)
    }
    i++

    return acc
  })(fileSize, magnitudes)

  return `${size} ${magnitude}`
}
