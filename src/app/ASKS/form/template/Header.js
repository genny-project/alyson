import Card from 'app/layouts/components/card'
import { Text } from '@chakra-ui/react'

const Header = ({ title, subHeader, config }) => (
  <Card shadow={'md'} w="full">
    <Text textStyle="head.1" w="100%" mb="2">
      {title}
    </Text>
    {config ? (
      <Text textStyle="body.3" w="100%">
        {subHeader}
      </Text>
    ) : null}
  </Card>
)

export default Header
