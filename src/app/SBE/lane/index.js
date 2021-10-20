import './lane.css'

import { Box, VStack, useColorModeValue } from '@chakra-ui/react'

import BECard from 'app/BE/card'
import Card from 'app/layouts/components/card'
import Footer from './Footer'
import Title from './Title'
import { selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'

const Lane = ({ sbeCode, dashboard, width }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')

  const rows = useSelector(selectRows(sbeCode), (prev, next) => prev.length === next.length)

  const isMobile = useIsMobile()

  return (
    <Box>
      <Box width={width} bg={bg} mb="2" p="1">
        <Title sbeCode={sbeCode} />
      </Box>
      <Card
        variant="card0"
        p={[2, 2, 2, 3]}
        width={width}
        maxH={isMobile ? '73vh' : '78vh'}
        className="nobar"
        h="full"
        overflowY="scroll"
        minW="14vw"
      >
        <VStack p={2}>
          {rows.map((row, index) => (
            <BECard key={`${index}-${row}`} code={row} parentCode={sbeCode} />
          ))}
        </VStack>

        <Footer sbeCode={sbeCode} rows={rows} />
      </Card>
    </Box>
  )
}

export default Lane
