import { useToast, HStack, Text } from '@chakra-ui/react'
import { Iconly } from 'react-iconly'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectToast } from 'redux/app/selectors'
import { includes } from 'ramda'

const InfoToast = props => {
  const { onClick } = props

  const toast = useToast()
  const newToast = useSelector(selectToast)
  const status = newToast?.code
  const description = newToast?.message

  useEffect(() => {
    if (newToast && includes(status, 'INFO'))
      toast({
        duration: 5000,
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
          >
            <HStack>
              <Iconly
                name={'InfoCircle'}
                size={'large'}
                set={'bulk'}
                primaryColor={'white'}
                secondaryColor={'#E4BAC8'}
              />
              <Text fontSize={'16px'}>{description}</Text>
            </HStack>

            <Iconly
              name={'CloseSquare'}
              set={'two-tone'}
              primaryColor={'rgba(255,255,255,0'}
              secondaryColor={'#E4BAC8'}
              onClick={onClick}
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
