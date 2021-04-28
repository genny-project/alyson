const sameValue = (prev: DbOject | undefined, next: DbOject | undefined) =>
  prev?.value === next?.value

interface DbOject {
  value?: string
}

export default sameValue
