import { Divider, HStack, Text, WrapItem } from '@chakra-ui/layout'
import { filter, flatten, identity, remove } from 'ramda'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'

const TimelineItem = ({
  questionCode,
  idx,
  groups,
  curGroup,
  disableNext,
  setGroup,
  textStyle,
  group,
  setAdjGroups,
}) => {
  const askData = filter(
    identity,
    useSelector(selectAttributes(questionCode, flatten(group.questions || []))),
  )

  useEffect(() => {
    if (!askData.length) {
      setAdjGroups(remove(idx, 1, groups))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!askData.length) return null

  return (
    <WrapItem key={idx}>
      {idx === groups.length - 1 ? (
        <Text
          cursor={idx > curGroup && disableNext ? '' : 'pointer'}
          onClick={() => (idx > curGroup && disableNext ? null : setGroup(idx))}
          textStyle={textStyle(idx)}
        >
          {group.label}
        </Text>
      ) : (
        <HStack>
          <Text
            cursor={idx > curGroup && disableNext ? '' : 'pointer'}
            onClick={() => (idx > curGroup && disableNext ? null : setGroup(idx))}
            textStyle={textStyle(idx)}
          >
            {group.label}
          </Text>
          <Divider orientation="horizontal" w="2rem" />
        </HStack>
      )}
    </WrapItem>
  )
}
export default TimelineItem
