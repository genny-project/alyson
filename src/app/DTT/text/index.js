import { Input, Text as ChakraText } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useMobileValue } from 'utils/hooks'
import DetailViewTags from 'app/DTT/text/detailview_tags'
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
  const { detailViewTags } = config

  if (detailViewTags) {
    return <DetailViewTags data={data} />
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
