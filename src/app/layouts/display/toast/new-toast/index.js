import { useToast, Button, HStack, Wrap, WrapItem, Text } from '@chakra-ui/react'

import { Iconly } from 'react-iconly'

const NewToast = () => {
  const toast = useToast()
  const toastsArray = [
    {
      status: 'success',
      value: 'Success alert',
      bgColor: '#55B748',
      borderColor: '#063231',
      icon: 'TickSquare',
      iconColor: '#063231',
    },
    {
      status: 'info',
      value: 'Information alert',
      bgColor: '#FFFFFF',
      borderColor: '#063231',
      icon: 'InfoCircle',
      iconColor: '#E4BAC8',
    },
    {
      status: 'error',
      value: 'Error alert',
      bgColor: '#F3E6EE',
      borderColor: '#EA5024',
      icon: 'Danger',
      iconColor: '#D8201E',
    },
  ]

  return (
    <>
      <Wrap>
        {toastsArray.map(({ status, value, bgColor, icon, borderColor, iconColor }, index) => (
          <WrapItem key={`${index}-${value}`}>
            <Button
              onClick={() =>
                toast({
                  title: `${status} toast`,
                  status: status,
                  isClosable: true,
                  duration: 1000,
                  render: () => (
                    <HStack
                      paddingBlock={5}
                      paddingInline={10}
                      bg={bgColor}
                      borderWidth={'1px'}
                      borderColor={borderColor}
                      borderRadius={'2.5rem'}
                      color={'black'}
                    >
                      {/* <FontAwesomeIcon icon={icon} size={'lg'} color={iconColor} /> */}
                      <Iconly name={icon} color={iconColor} size={'large'} bgColor={iconColor} />
                      <Text fontSize={'16px'}>{value}</Text>
                    </HStack>
                  ),
                })
              }
            >
              {value}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </>
  )
}

export default NewToast
