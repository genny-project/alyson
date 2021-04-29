import { ReactChildren } from 'react'
import { Box } from '@chakra-ui/layout'

const styles = {
  card0: {
    shadow: 'inner',
    borderRadius: 'md',
    bg: 'gray.100',
  },
  card1: {
    shadow: 'xs',
    borderRadius: 'md',
  },
  card2: {
    shadow: 'base',
    borderRadius: 'md',
  },
  card3: {
    shadow: 'lg',
    borderRadius: 'md',
  },
} as Styles

type CardProps = {
  variant: variant
  rest: []
  children: ReactChildren
}

const Card = ({ variant, children, ...rest }: CardProps) => {
  const stylesConfig = styles[variant]
  return (
    <Box {...stylesConfig} {...rest}>
      {children}
    </Box>
  )
}

interface Styles {
  card0: any
  card1: any
  card2: any
  card3: any
}
type variant = 'card0' | 'card1' | 'card2' | 'card3'

export default Card
