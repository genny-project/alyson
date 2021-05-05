import { Center, Divider, HStack, Text, Wrap, WrapItem } from '@chakra-ui/layout'
import { dec, inc } from 'ramda'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@chakra-ui/button'

const Timeline = ({ groups, group, setGroup }) => {
  const textStyle = idx => (idx === group ? 'body.1' : 'body.3')
  return (
    <HStack my="4" w="full">
      <IconButton
        visibility={group === 0 ? 'hidden' : 'visible'}
        variant="ghost"
        size="lg"
        color="blue.600"
        onClick={() => setGroup(dec)}
        icon={<FontAwesomeIcon size="lg" icon={faArrowAltCircleLeft} />}
      />
      <Center w="full">
        <Wrap w="80%" align="center" justify="center">
          {groups.map((group, idx) => (
            <WrapItem key={idx}>
              {idx === groups.length - 1 ? (
                <Text cursor="pointer" onClick={() => setGroup(idx)} textStyle={textStyle(idx)}>
                  {group.label}
                </Text>
              ) : (
                <HStack>
                  <Text cursor="pointer" onClick={() => setGroup(idx)} textStyle={textStyle(idx)}>
                    {group.label}
                  </Text>
                  <Divider orientation="horizontal" w="2rem" />
                </HStack>
              )}
            </WrapItem>
          ))}
        </Wrap>
      </Center>

      <IconButton
        visibility={group === groups.length - 1 ? 'hidden' : 'visible'}
        variant="ghost"
        size="lg"
        color="blue.600"
        onClick={() => setGroup(inc)}
        icon={<FontAwesomeIcon size="lg" icon={faArrowAltCircleRight} />}
      />
    </HStack>
  )
}

export default Timeline
