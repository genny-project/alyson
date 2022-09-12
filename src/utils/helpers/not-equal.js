import { compose, not, equals } from 'ramda'

const notEqual = argOne => argTwo => compose(not, equals(argOne))(argTwo)

export default notEqual
