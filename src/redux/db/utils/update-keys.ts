export const removeKey: (items: Array<string>, code: string) => Array<string> = (items, code) =>
  items.filter((item: string) => item !== code)
export const addKey: (items: Array<string>, code: string) => Array<string> = (items = [], code) => [
  code,
  ...items,
]
