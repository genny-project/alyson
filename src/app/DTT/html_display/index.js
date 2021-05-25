import { Box, Center } from '@chakra-ui/layout'
import Card from 'app/layouts/components/card'
import { useMobileValue } from 'utils/hooks'

const Read = ({ data }) => {
  const w = useMobileValue(['95vw', '70vw'])

  if (!data?.value) return null

  return (
    <Center>
      <Card variant="card3" p={0} h="70vh" w={w} overflow="none">
        <iframe
          style={{ width: '100%', height: '100%' }}
          title={data?.attributeName}
          srcDoc={data?.value}
        />
      </Card>
    </Center>
  )
}

const HtmlDisplay = {
  Read,
}

export default HtmlDisplay
