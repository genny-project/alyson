import { ReactChildren } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import { Keyable } from 'utils/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const styles = {
  default: {
    variant: 'solid',
    colorScheme: 'gray',
    borderRadius: '3xl',
    size: 'xs',
  },
  primary: {
    variant: 'solid',
    colorScheme: 'primary',
    borderRadius: '3xl',
    size: 'xs',
  },
  secondary: {
    variant: 'outline',
    colorScheme: 'primary',
    borderRadius: '3xl',
    size: 'xs',
  },
  positive: {
    variant: 'solid',
    colorScheme: 'green',
    borderRadius: '3xl',
    size: 'xs',
  },
  negative: {
    variant: 'solid',
    colorScheme: 'red',
    borderRadius: '3xl',
    size: 'xs',
  },
} as Styles

type ChipProps = {
  onClick: function
  variant?: variant
  rest: []
  children: ReactChildren
}

const Chip = ({ onClick, variant = 'default', children, ...rest }: ChipProps) => {
  const stylesConfig = styles[variant]
  return (
    <ChakraButton
      leftIcon={<FontAwesomeIcon icon={faTimesCircle} />}
      onClick={onClick}
      {...stylesConfig}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}

interface Styles {
  default: Keyable
  primary: Keyable
  secondary: Keyable
  positive: Keyable
  negative: Keyable
}
type variant = 'default' | 'primary' | 'secondary' | 'positive' | 'negative'

export default Chip
