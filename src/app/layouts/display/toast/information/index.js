import { useToast, HStack, Text } from '@chakra-ui/react'
import { Iconly } from 'react-iconly'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectToast } from 'redux/app/selectors'
import { includes } from 'ramda'

const InfoToast = props => {
  const { onClick, status, description } = props

  const toast = useToast()
  const newToast = useSelector(selectToast)

  useEffect(() => {
    if (newToast && includes(status, 'INFO'))
      toast({
        duration: 30000,
        status,
        position: 'top-right',
        render: () => (
          <HStack
            paddingBlock={'5'}
            paddingInline={'10'}
            borderWidth={'1px'}
            borderColor={'#063231'}
            borderRadius={'2.5rem'}
            color={'black'}
            bg={'#FFFFFF'}
            justifyContent="space-between"
            fontFamily={'almarai'}
          >
            <Iconly
              name={'InfoCircle'}
              size={'large'}
              set={'bulk'}
              primaryColor={'white'}
              secondaryColor={'#E4BAC8'}
            />
            <Text fontSize={'16px'}>{description}</Text>

            <Iconly
              name={'CloseSquare'}
              set={'two-tone'}
              primaryColor={'rgba(255,255,255,0'}
              secondaryColor={'#E4BAC8'}
              onClick={onClick}
              size={'xlarge'}
              cursor={'pointer'}
            />
          </HStack>
        ),
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newToast, toast])
  return null
}
export default InfoToast
