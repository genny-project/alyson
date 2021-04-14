import { ReactChildren } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'

const styles = {
  special: {
    variant: 'solid',
    colorScheme: 'gradient',
  },
  primary: {
    variant: 'solid',
    colorScheme: 'primary',
  },
  secondary: {
    variant: 'outline',
    colorScheme: 'primary',
  },
  tertiary: {
    variant: 'link',
    colorScheme: 'primary',
  },
} as Styles

type ButtonProps = {
  custom: custom
  rest: []
  children: ReactChildren
}

const Button = ({ custom, children, ...rest }: ButtonProps) => {
  const stylesConfig = styles[custom]

  return (
    <ChakraButton {...stylesConfig} {...rest}>
      {children}
    </ChakraButton>
  )
}

interface Styles {
  primary: any
  secondary: any
  special: any
  tertiary: any
}
type custom = 'primary' | 'secondary' | 'special' | 'tertiary'

export default Button
