import { compose, last, split, toUpper } from 'ramda'

export const fileTypeFormat = compose(toUpper, last, split('/'))
