import { Box, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import Chip from 'app/layouts/components/chip'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import bestTitleAttribute from 'utils/helpers/best-title-attribute'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import NotePanel from '../panel'

const MobileNotes = () => {
  const tabs = safelyParseJson(useSelector(selectNotes), [])

  const [tab, setTab] = useState(0)

  return (
    <VStack m="5">
      <Card w="full">
        <VStack align="start" w="full">
          <Text textStyle="tail2">See notes on</Text>
          <Wrap w="full">
            {tabs.map((code, idx) => (
              <WrapItem key={code}>
                <Chip leftIcon={null} onClick={() => setTab(idx)}>
                  <Attribute code={code} attribute={bestTitleAttribute(code)} />
                </Chip>
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
      </Card>
      {tabs.map((code, idx) => (
        <Box w="full" display={tab === idx ? 'block' : 'none'}>
          <NotePanel code={code} />
        </Box>
      ))}
    </VStack>
  )
}

export default MobileNotes
