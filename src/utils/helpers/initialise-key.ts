import { Keyable } from 'utils/types'

const initialiseKey = (object: Keyable, key: string, initialiser: any) => {
  if (!object[key]) object[key] = initialiser
}

export default initialiseKey
