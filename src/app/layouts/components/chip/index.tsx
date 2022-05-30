import { Button as ChakraButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Keyable } from 'utils/types'
import { ReactChildren } from 'react'
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
  onClick?: any
  variant?: variant
  rest: []
  children: ReactChildren
  leftIcon?: any
}

const Chip = ({
  onClick,
  leftIcon = <FontAwesomeIcon icon={faTimesCircle} />,
  variant = 'default',
  children,
  ...rest
}: ChipProps) => {
  const stylesConfig = styles[variant]

  if (typeof onClick === 'function')
    return (
      <ChakraButton
        whiteSpace={'normal'}
        h={'auto'}
        alignItems={'start'}
        textAlign={'left'}
        leftIcon={leftIcon}
        onClick={onClick}
        {...stylesConfig}
        {...rest}
      >
        {children}
      </ChakraButton>
    )

  return (
    <ChakraButton
      whiteSpace={'normal'}
      h={'auto'}
      alignItems={'start'}
      textAlign={'left'}
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
