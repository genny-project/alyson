import { Center, HStack, Wrap } from '@chakra-ui/layout'
import { dec, inc } from 'ramda'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@chakra-ui/button'
import TimelineItem from './TimelineItem'

const Timeline = ({
  groups,
  group: curGroup,
  setGroup,
  disableNext,
  questionCode,
  setAdjGroups,
}) => {
  const textStyle = idx => (idx === curGroup ? 'body.1' : 'body.3')
  return (
    <HStack my="4" w="full">
      <IconButton
        visibility={curGroup === 0 ? 'hidden' : 'visible'}
        variant="ghost"
        size="lg"
        color="blue.600"
        onClick={() => setGroup(dec)}
        icon={<FontAwesomeIcon size="lg" icon={faArrowAltCircleLeft} />}
      />
      <Center w="full">
        <Wrap w="80%" align="center" justify="center">
          {groups.map((group, idx) => (
            <TimelineItem
              key={idx}
              {...{
                setAdjGroups,
                questionCode,
                idx,
                groups,
                curGroup,
                disableNext,
                setGroup,
                textStyle,
                group,
              }}
            />
          ))}
        </Wrap>
      </Center>

      <IconButton
        disabled={disableNext}
        visibility={curGroup === groups.length - 1 ? 'hidden' : 'visible'}
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
