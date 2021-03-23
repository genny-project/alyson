const pushUniqueString = (list: Array<string>, string: string) => {
  if (list.indexOf(string) === -1) list.push(string)
}

export default pushUniqueString
