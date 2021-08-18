import { Box, HStack, VStack } from '@chakra-ui/react'
import Ask from 'app/ASKS/ask'
import Lane from 'app/SBE/lane'
import { Stack } from 'immutable'
import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import Search from '../navigation/Search'

const MobileView = () => {
  const processCodes = useSelector(selectProcess, (prev, next) => prev.length === next.length)

  const bucketSearch = useSelector(selectCode('QUE_BUCKET_INTERNS_GRP')) || []

  if (!processCodes) return null
  return (
    <Box>
      <VStack mb="5">
        {bucketSearch &&
          bucketSearch.map(childAsk => (
            <Box width={'20rem'}>
              <Ask noLabel questionCode={childAsk} parentCode={'QUE_BUCKET_INTERNS_GRP'} />
            </Box>
          ))}
      </VStack>
      <Swiper>
        {processCodes.map(sbeCode => (
          <SwiperSlide key={sbeCode}>
            <Lane key={sbeCode} sbeCode={sbeCode} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default MobileView
