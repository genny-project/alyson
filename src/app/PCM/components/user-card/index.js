import { Avatar, Box, HStack, VStack, Text, Divider } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Iconly } from 'react-iconly'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { lt } from 'ramda'
import { useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons'

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
    <Box width={'33rem'} height={'18rem'} borderRadius={'2.5rem'} bg={'#FFFFFF'}>
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
          <Text fontFamily={'Almarai'} fontWeight={'bold'} fontSize={'16px'}>
            {name}
          </Text>
          <Divider orientation={'horizontal'} borderColor={'#06323161'} width={'1rem'} />
          <FontAwesomeIcon icon={faLinkedin} color={'#EA5024'} cursor={'pointer'} />
        </HStack>

        <HStack alignItems={'baseline'} justifyContent={'center'}>
          {data.map(({ icon, dataValue }, index) => (
            <HStack
              key={`${dataValue}-${index}`}
              h={'3rem'}
              marginTop={'2.5rem'}
              paddingInline={'1.5rem'}
            >
              <Box>
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
        </HStack>
      </VStack>
    </Box>
  )
}

export default UserCard
