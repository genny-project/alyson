import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { VStack } from '@chakra-ui/react'
import BECard from 'app/BE/card'
import Title from './Title'
import Footer from './Footer'
import './lane.css'
import Card from 'app/layouts/components/card'

const Lane = ({ sbeCode, dashboard }) => {
  const rows = useSelector(selectRows(sbeCode), (prev, next) => prev.length === next.length)

  if (dashboard && !rows.length) return null

  return (
    <Card variant="card0" p={5}>
      <VStack>
        <Title sbeCode={sbeCode} />
        <VStack
          className="nobar"
          maxH="100vh"
          overflowY="scroll"
          p="3"
          borderTop="1px solid lightgrey"
        >
          {rows.map(row => (
            <BECard key={row} code={row} parentCode={sbeCode} />
          ))}
        </VStack>

        <Footer sbeCode={sbeCode} rows={rows} />
      </VStack>
    </Card>
  )
}

export default Lane
