import { useColorModeValue } from '@chakra-ui/color-mode'
import { ReactChildren } from 'react'
import { Box } from '@chakra-ui/layout'

const styles = {
  lg: {
    shadow: 'lg',
    borderRadius: 'lg',
  },
} as Styles // Barad to build

type CardProps = {
  variant: variant
  rest: []
  children: ReactChildren
}

const Card = ({ variant, children, ...rest }: CardProps) => {
  const bg = useColorModeValue('white', '')
  const stylesConfig = styles[variant]

  return (
    <Box bg={bg} {...stylesConfig} {...rest}>
      {children}
    </Box>
  )
}

interface Styles {
  sm: any
  md: any
  lg: any
}
type variant = 'sm' | 'md' | 'lg'

export default Card
