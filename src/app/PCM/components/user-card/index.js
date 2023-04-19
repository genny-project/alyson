import { Avatar, Box, Divider, Grid, HStack, Text, VStack } from '@chakra-ui/react'

import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lt } from 'ramda'
import { useState } from 'react'
import { Iconly } from 'react-iconly'

const UserCard = () => {
  const name = 'Pascal Satori'
  const data = [
    { icon: 'Work', dataValue: 'Design & Margeting' },
    { icon: 'People', dataValue: 'pascalsatori.com' },
    { icon: 'Location', dataValue: 'Melbourne, Australia' },
  ]
  const imageSrc = 'https://bit.ly/dan-abramov'

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
        <Avatar size={'2xl'} src={imageSrc} marginTop={'-3.75rem'} />
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
          <Text fontWeight={'bold'} fontSize={'16px'}>
            {name}
          </Text>
          <Divider orientation={'horizontal'} borderColor={'#06323161'} width={'1rem'} />
          <FontAwesomeIcon icon={faLinkedin} color={'#EA5024'} cursor={'pointer'} />
        </HStack>

        <Grid spacing={0} templateColumns={'repeat(3, 1fr)'} gap="1rem" paddingInline={2}>
          {data.map(({ icon, dataValue }, index) => (
            <HStack key={`${dataValue}-${index}`} h={'full'}>
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
                <Text fontSize={'14px'} maxW={'6.5rem'} textAlign={'center'} color={'#829998'}>
                  {dataValue}
                </Text>
              </Box>
              {lt(index, data.length - 1) ? (
                <Divider orientation={'vertical'} h={'4.2rem'} borderColor={'#06323161'} />
              ) : null}
            </HStack>
          ))}
        </Grid>
      </VStack>
    </Box>
  )
}

export default UserCard
