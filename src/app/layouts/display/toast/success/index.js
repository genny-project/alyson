import { useToast, HStack, Text } from '@chakra-ui/react'
import { Iconly } from 'react-iconly'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectToast } from 'redux/app/selectors'
import { includes } from 'ramda'

const SuccessToast = props => {
  const { onClick, status, description } = props

  const toast = useToast()
  const newToast = useSelector(selectToast)

  useEffect(() => {
    if (newToast && includes(status, 'SUCCESS'))
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
            bg={'#55B748'}
            justifyContent="space-between"
          >
            <HStack>
              <Iconly
                name={'TickSquare'}
                size={'large'}
                set={'bulk'}
                primaryColor={'white'}
                secondaryColor={'#063231'}
              />
              <Text fontSize={'16px'}>{description}</Text>
            </HStack>
            <Iconly
              name={'CloseSquare'}
              set={'two-tone'}
              primaryColor={'rgba(255,255,255,0'}
              secondaryColor={'#063231'}
              onClick={onClick}
              cursor={'pointer'}
              size={'xlarge'}
            />
          </HStack>
        ),
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newToast, toast])

  return null
}
export default SuccessToast
