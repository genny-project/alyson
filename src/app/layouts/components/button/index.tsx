import { ReactChildren } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'

const styles = {
  special: {
    variant: 'solid',
    colorScheme: 'gradient',
    transition: 'all 0.2s',
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
    },
  },
  primary: {
    variant: 'solid',
    colorScheme: 'primary',
  },
  secondary: {
    variant: 'outline',
    colorScheme: 'primary',
  },
  positive: {
    variant: 'solid',
    colorScheme: 'green',
  },
  negative: {
    variant: 'solid',
    colorScheme: 'red',
  },
} as Styles

type ButtonProps = {
  onClick: any
  variant: variant
  rest: []
  children: ReactChildren
}

const Button = ({ onClick, variant, children, ...rest }: ButtonProps) => {
  const stylesConfig = styles[variant]
  return (
    <ChakraButton onClick={onClick} {...stylesConfig} {...rest}>
      {children}
    </ChakraButton>
  )
}

interface Styles {
  primary: any
  secondary: any
  special: any
  positive: any
  negative: any
}
type variant = 'primary' | 'secondary' | 'special' | 'positive' | 'negative'

export default Button
