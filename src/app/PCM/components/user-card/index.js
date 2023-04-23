import { Avatar, Box, Divider, Grid, HStack, Text, VStack } from '@chakra-ui/react'

import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useApi from 'api'
import Attribute from 'app/BE/attribute/index.js'
import { lt } from 'ramda'
import { useState } from 'react'
import { Iconly } from 'react-iconly'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const UserCard = ({ targetCode }) => {
  const imageSrc = useSelector(selectCode(targetCode, 'PRI_IMAGE'))?.value || ''
  const name = useSelector(selectCode(targetCode, 'PRI_NAME'))?.value || ''
  const companyUrl = useSelector(selectCode(targetCode, 'PRI_COMPANY_WEBSITE_URL'))?.value || ''
  const companyAddress = useSelector(selectCode(targetCode, 'PRI_BUSINESS_LOCATIONS'))?.value || ''
  const companyWork = useSelector(selectCode(targetCode, 'LNK_BEST_KEYWORD'))?.value || ''
  const { getImageSrc } = useApi

  const data = [
    { icon: 'Work', dataValue: companyWork },
    { icon: 'People', dataValue: companyUrl },
    { icon: 'Location', dataValue: companyAddress },
  ]

  const [rating, setRating] = useState(0)
  const handleStarRating = index => {
    setRating(index + 1)
  }

  return (
    <Box
      width={'33rem'}
      height={'18rem'}
      borderRadius={'2.5rem'}
      bg={'#FFFFFF'}
      justifyContent={'center'}
      paddingInline={'1rem'}
      fontFamily={'Almarai'}
    >
      <VStack>
        <Avatar size={'2xl'} name={name} src={imageSrc} marginTop={'-3.5rem'} />
        <HStack>
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              onClick={() => handleStarRating(index)}
              size={'xs'}
              style={{
                cursor: 'pointer',
                color: index < rating ? '#96D5D3' : '#C4C4C4',
              }}
            />
          ))}
        </HStack>

        <HStack>
          {!!name && (
            <>
              <Text fontWeight={'bold'} fontSize={'16px'}>
                {name}
              </Text>
              <Divider orientation={'horizontal'} borderColor={'#06323161'} width={'1rem'} />
            </>
          )}

          <Attribute
            code={targetCode}
            attribute={'PRI_LINKEDIN_URL'}
            config={{ icon: faLinkedin, color: '#EA5024' }}
          />
        </HStack>

        <Grid
          spacing={0}
          w={'full'}
          templateColumns={'repeat(auto-fit, minmax(2rem, 1fr))'}
          gap="1rem"
          paddingInline={2}
        >
          {data.map(({ icon, dataValue }, index) => (
            <>
              {!!dataValue && (
                <Grid
                  key={`${dataValue}-${index}`}
                  templateColumns={'1fr 1px'}
                  placeItems={'center'}
                  h={'full'}
                  w={'full'}
                >
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    flexDirection={'column'}
                    h={'full'}
                    paddingInline={'1.5rem'}
                    paddingBlock={'1rem'}
                  >
                    <Iconly name={icon} set={'two-tone'} />
                    <Text
                      noOfLines={2}
                      fontSize={'14px'}
                      maxW={'6.5rem'}
                      textAlign={'center'}
                      color={'#829998'}
                    >
                      {dataValue}
                    </Text>
                  </Box>
                  {lt(index, data.length - 1) ? (
                    <Divider orientation={'vertical'} h={'4.2rem'} borderColor={'#06323161'} />
                  ) : null}
                </Grid>
              )}
            </>
          ))}
        </Grid>
      </VStack>
    </Box>
  )
}

export default UserCard
