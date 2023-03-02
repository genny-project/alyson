import { useToast, HStack, Text } from '@chakra-ui/react'
import { Iconly } from 'react-iconly'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectToast } from 'redux/app/selectors'

const status = 'error'
const description = 'Error alert'
const bgColor = '#F3E6EE'
const borderColor = '#EA5024'
const icon = 'Danger'
const iconColor = '#D8201E'

const ErrorToast = props => {
  const { onClick } = props

  const toast = useToast()
  const newToast = useSelector(selectToast)

  useEffect(() => {
    if (newToast)
      toast({
        duration: 5000,
        status,
        render: () => (
          <HStack
            paddingBlock={'5'}
            paddingInline={'10'}
            borderWidth={'1px'}
            borderColor={borderColor}
            borderRadius={'2.5rem'}
            color={'black'}
            bg={bgColor}
            justifyContent="space-between"
          >
            <HStack>
              <Iconly
                name={icon}
                size={'large'}
                set={'bulk'}
                primaryColor={'white'}
                secondaryColor={iconColor}
              />
              <Text fontSize={'16px'}>{description}</Text>
            </HStack>
            <Iconly
              name={'CloseSquare'}
              set={'two-tone'}
              primaryColor={'rgba(255,255,255,0'}
              secondaryColor={iconColor}
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
export default ErrorToast
