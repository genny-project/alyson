import { Box, Center, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Chip from 'app/layouts/components/chip'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'
import bestTitleAttribute from 'utils/helpers/best-title-attribute'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import nameOfColumn from '../helpers/name-of-column'
import NotePanel from '../panel'
import Selection from '../selection'

const MobileNotes = () => {
  const tabs = safelyParseJson(useSelector(selectNotes), [])

  const [tab, setTab] = useState(0)

  return (
    <VStack m="3">
      {tabs.length > 1 ? (
        <Wrap mx="5" justify="center">
          {tabs.map((code, idx) => (
            <WrapItem key={code}>
              <Chip colorScheme="primary" size="sm" leftIcon={null} onClick={() => setTab(idx)}>
                <Text textStyle="tail.3" mr="0.5rem">
                  {nameOfColumn(idx)}
                </Text>
                <Attribute code={code} attribute={bestTitleAttribute(code)} />
              </Chip>
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Selection />
      )}
      {tabs.map((code, idx) => (
        <Center display={tab === idx ? 'block' : 'none'}>
          <Box>
            <NotePanel code={code} length={tabs.length} />
          </Box>
        </Center>
      ))}
    </VStack>
  )
}

export default MobileNotes
