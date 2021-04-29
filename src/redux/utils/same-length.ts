const sameLength = (prev: Array<string> | undefined, next: Array<string> | undefined) =>
  prev?.length === next?.length

export default sameLength
