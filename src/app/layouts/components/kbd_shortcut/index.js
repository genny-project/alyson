import { Kbd } from '@chakra-ui/react'
import { includes } from 'ramda'

const mac = includes('Mac', navigator.platform || '')

const KeyboardShortcut = () => (mac ? <Kbd>⌘</Kbd> : <Kbd>CTL</Kbd>)

export default KeyboardShortcut
