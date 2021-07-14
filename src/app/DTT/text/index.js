import { Input, Text as ChakraText, HStack, Tag, Wrap, WrapItem } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useMobileValue } from 'utils/hooks'
import { map, splitAt, head, last, length } from 'ramda'
import getArrayFromStringValue from 'utils/helpers/get-array-from-string.js'

export const Write = ({ questionCode, data, onSendAnswer }) => {
  const debouncedSendAnswer = debounce(onSendAnswer, 500)
  const maxW = useMobileValue(['', '25vw'])

  return (
    <Input
      test-id={questionCode}
      onChange={e => debouncedSendAnswer(e.target.value)}
      defaultValue={data?.value}
      w="full"
      maxW={maxW}
    />
  )
}

export const Read = ({ data, config = {} }) => {
  const { detilViewTags } = config

  if (detilViewTags) {
    const allValues = getArrayFromStringValue(data?.value)

    const splittedTags = splitAt(2)(allValues)
    const splittedTagsToDisplay = head(splittedTags)
    const splittedTagsToShowAsMore = last(splittedTags)

    return (
      <Wrap align="start">
        {map(value => (
          <Tag borderRadius={15} align="center">
            <ChakraText textStyle="body.2" isTruncated width="5rem">
              {value}
            </ChakraText>
          </Tag>
        ))(splittedTagsToDisplay)}
        {length(splittedTagsToShowAsMore) >= 1 && (
          <Tag
            w="5rem"
            borderRadius={15}
            cursor="pointer"
            _hover={{ color: 'red' }}
            onClick={() => console.log('tag clicked')}
          >
            <ChakraText textStyle="body.2">
              {`+ ${length(splittedTagsToShowAsMore)} more`}
            </ChakraText>
          </Tag>
        )}
      </Wrap>
    )
  }
  return (
    <ChakraText noOfLines={3} {...config}>
      {data?.value || config.defaultValue}
    </ChakraText>
  )
}

const Text = {
  Write,
  Read,
}

export default Text
