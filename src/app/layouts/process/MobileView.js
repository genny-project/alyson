import 'swiper/swiper.min.css'

import { Box, VStack } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import Ask from 'app/ASKS/ask'
import Lane from 'app/SBE/lane'
import getUserType from 'utils/helpers/get-user'
import { selectCode } from 'redux/db/selectors'
import { selectProcess } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const MobileView = () => {
  const userType = getUserType()
  const processCodes = useSelector(selectProcess, (prev, next) => prev.length === next.length)

  const bucketSearch = useSelector(selectCode('QUE_BUCKET_INTERNS_GRP')) || []

  if (!processCodes) return null
  return (
    <Box>
      {userType !== 'INTERN' && (
        <VStack w={'full'} mb="5">
          {bucketSearch &&
            bucketSearch.map(childAsk => (
              <Box width={'20rem'}>
                <Ask noLabel questionCode={childAsk} parentCode={'QUE_BUCKET_INTERNS_GRP'} />
              </Box>
            ))}
        </VStack>
      )}

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
