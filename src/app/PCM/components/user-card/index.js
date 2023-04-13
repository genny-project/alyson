import { Avatar, Box, HStack, VStack, Text, Divider } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Iconly } from 'react-iconly'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { lt } from 'ramda'

const UserCard = () => {
  const arrayOfIcons = ['Star', 'Star', 'Star', 'Star', 'Star']
  const name = 'Pascal Satori'
  const data = [
    { icon: 'Work', dataValue: 'Design & Margeting' },
    { icon: 'People', dataValue: 'pascalsatori.com' },
    { icon: 'Location', dataValue: 'Melbourne, Australiag' },
  ]

  return (
    <Box width={'33rem'} height={'18rem'} borderRadius={'2.5rem'} bg={'#FFFFFF'}>
      <VStack>
        <Avatar size={'2xl'} src="https://bit.ly/dan-abramov" marginTop={'-3.75rem'} />
        <HStack>
          {arrayOfIcons.map(icon => (
            <Iconly name={icon} set={'bold'} primaryColor={'#96D5D3'} size={'small'} />
          ))}
        </HStack>

        <HStack>
          <Text fontFamily={'almarai'} fontWeight={'bold'} fontSize={'16px'}>
            {name}{' '}
          </Text>
          <Divider orientation={'horizontal'} borderColor={'#06323161'} width={'10px'} />
          <FontAwesomeIcon icon={faLinkedin} color={'#EA5024'} />
        </HStack>

        <HStack>
          {data.map(({ icon, dataValue }, index) => (
            <HStack
              key={`${icon}-${index}`}
              justifyContent={'flex-start'}
              h={'3rem'}
              marginTop={'1.5rem'}
              paddingInline={'1rem'}
            >
              <Box>
                <Iconly name={icon} set={'two-tone'} />
                <Text
                  fontSize={'0.75rem'}
                  maxW={'6.5rem'}
                  textAlign={'center'}
                  marginLeft={'0.5rem'}
                >
                  {dataValue}
                </Text>
              </Box>
              {lt(index, data.length - 1) ? (
                <Divider
                  orientation={'vertical'}
                  h={'3.1rem'}
                  borderColor={'#06323161'}
                  marginInlineStart={'1.5rem'}
                />
              ) : null}
            </HStack>
          ))}
        </HStack>
      </VStack>
    </Box>
  )
}

export default UserCard
