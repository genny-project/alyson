import { ReactChildren } from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { Keyable } from 'utils/types'

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

type CustomButtonProps = ButtonProps & {
  onClick: any
  variant?: variant
  rest: []
  children: ReactChildren
}

const Button = ({ onClick, variant = 'primary', children, ...rest }: CustomButtonProps) => {
  const stylesConfig = styles[variant]
  return (
    <ChakraButton onClick={onClick} {...stylesConfig} {...rest}>
      {children}
    </ChakraButton>
  )
}

interface Styles {
  primary: Keyable
  secondary: Keyable
  special: Keyable
  positive: Keyable
  negative: Keyable
  [key: string]: any
}
type variant = 'primary' | 'secondary' | 'special' | 'positive' | 'negative'

export default Button
