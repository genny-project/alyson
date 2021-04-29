import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { VStack, useColorModeValue } from '@chakra-ui/react'
import BECard from 'app/BE/card'
import Title from './Title'
import Footer from './Footer'
import './lane.css'

const Lane = ({ sbeCode, dashboard }) => {
  const rows = useSelector(selectRows(sbeCode), (prev, next) => prev.length === next.length)

  const color = useColorModeValue('gray.100', 'gray.900')

  if (dashboard && !rows.length) return null

  return (
    <VStack bg={color} p="3" borderRadius="md" shadow="inner">
      <Title sbeCode={sbeCode} />
      <VStack className="nobar" maxH="100vh" overflowY="scroll">
        {rows.map(row => (
          <BECard key={row} code={row} parentCode={sbeCode} />
        ))}
      </VStack>

      <Footer sbeCode={sbeCode} rows={rows} />
    </VStack>
  )
}

export default Lane
