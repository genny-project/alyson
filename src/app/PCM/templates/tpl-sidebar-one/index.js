import {
  Button,
  Grid,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { equals, slice } from 'ramda'

import EvtButton from 'app/PCM/components/evt-button'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import { lojing } from 'utils/constants'
import useGetProductName from 'utils/helpers/get-product-name'

const TemplateSidebarOne = ({ mappedPcm, maxItemCount }) => {
  const maxItems = maxItemCount || Math.floor((window.innerHeight - 86) / 130)
  const productName = useGetProductName()

  const evtButtons = mapQuestionGroup((ask, question) => {
    return (
      <EvtButton
        key={ask?.attributeCode || ''}
        questionCode={mappedPcm.PRI_QUESTION_CODE}
        childCode={ask?.questionCode || ''}
        iconId={question?.icon || ''}
        vert={true}
      />
    )
  })(mappedPcm.PRI_QUESTION_CODE)

  return (
    <Grid
      test-id={mappedPcm.PRI_QUESTION_CODE}
      placeItems="center"
      gap={equals(productName)(lojing) ? 7 : 0}
      paddingInline={4}
      maxH={'full'}
      wordBreak={'break-word'}
    >
      {slice(0)(maxItems)(evtButtons).map(button => button)}
      {evtButtons.length > maxItems && (
        <Popover placement="auto" isLazy offset={[0, 25]}>
          <PopoverTrigger>
            <Button color="#AAE3E2" variant="outline" w="full">
              {`More`}
            </Button>
          </PopoverTrigger>
          <PopoverContent bg="product.primary" borderRadius={'2xl'}>
            <PopoverBody>
              <Wrap spacing={5} padding={5} justify={'center'}>
                {slice(maxItems)(evtButtons.length)(evtButtons).map((button, index) => (
                  <WrapItem w={'110px'} key={`SIDEBAR-WRAP-${index}`}>
                    {button}
                  </WrapItem>
                ))}
              </Wrap>
            </PopoverBody>
            <PopoverArrow />
          </PopoverContent>
        </Popover>
      )}
    </Grid>
  )
}

export default TemplateSidebarOne
