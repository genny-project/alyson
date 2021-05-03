import { ReactChildren } from 'react'
import { Box } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import { Keyable } from 'utils/types'

const lightStyles = {
  card0: {
    shadow: 'inner',
    borderRadius: 'md',
    bg: 'gray.100',
  },
  card1: {
    shadow: 'xs',
    borderRadius: 'md',
    bg: 'white',
  },
  card2: {
    shadow: 'base',
    borderRadius: 'md',
    bg: 'white',
  },
  card3: {
    shadow: 'lg',
    borderRadius: 'md',
    bg: 'white',
  },
} as Styles

const darkStyles = {
  card0: {
    shadow: 'inner',
    borderRadius: 'md',
    bg: 'gray.900',
  },
  card1: {
    shadow: 'xs',
    borderRadius: 'md',
    bg: 'gray.700',
  },
  card2: {
    shadow: 'base',
    borderRadius: 'md',
    bg: 'gray.700',
  },
  card3: {
    shadow: 'lg',
    borderRadius: 'md',
    bg: 'gray.700',
  },
} as Styles

type CardProps = {
  variant?: variant
  rest: []
  children: ReactChildren
}

const Card = ({ variant = 'card2', children, ...rest }: CardProps) => {
  const currentStyle = useColorModeValue(lightStyles, darkStyles)
  const stylesConfig = currentStyle[variant]
  return (
    <Box p={8} {...stylesConfig} {...rest}>
      {children}
    </Box>
  )
}

interface Styles {
  card0: Keyable
  card1: Keyable
  card2: Keyable
  card3: Keyable
}
type variant = 'card0' | 'card1' | 'card2' | 'card3'

export default Card
