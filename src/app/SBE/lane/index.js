import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { VStack } from '@chakra-ui/react'
import BECard from 'app/BE/card'
import Title from './Title'
import Footer from './Footer'
import './lane.css'
import Card from 'app/layouts/components/card'

const Lane = ({ sbeCode, dashboard, width }) => {
  const rows = useSelector(selectRows(sbeCode), (prev, next) => prev.length === next.length)

  if (dashboard && !rows.length) return null

  return (
    <Card
      variant="card0"
      p={[2, 2, 2, 3]}
      width={width}
      maxH="78vh"
      className="nobar"
      h="full"
      overflowY="scroll"
      minW="14vw"
    >
      <VStack>
        <Title sbeCode={sbeCode} />
        <VStack p={2}>
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
