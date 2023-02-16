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
  Box,
  Image,
} from '@chakra-ui/react'
import { slice } from 'ramda'

import EvtButton from 'app/PCM/components/evt-button'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'

import { onSendMessage } from 'vertx'
import { INTERNMATCH_LOGO_WIDTH } from 'utils/constants'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'

const TemplateSidebarOne = ({ mappedPcm, maxItemCount }) => {
  const maxItems = maxItemCount || Math.floor((window.innerHeight - 86) / 130)
  const isProductInternmatch = useIsProductInternmatch()

  const evtButtons = mapQuestionGroup((ask, question) => {
    return (
      <EvtButton
        key={ask?.attributeCode || ''}
        questionCode={mappedPcm.PRI_QUESTION_CODE}
        childCode={ask?.questionCode || ''}
        iconId={question?.icon || ''}
        vert={true}
        sidebarItem={true}
      />
    )
  })(mappedPcm.PRI_QUESTION_CODE)

  return (
    <Grid
      test-id={mappedPcm.PRI_QUESTION_CODE}
      placeItems="center"
      gap={7}
      paddingInline={4}
      maxH={'full'}
      wordBreak={'break-word'}
    >
      {isProductInternmatch && (
        <Box
          onClick={() =>
            onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
          }
        >
          <Image
            marginY="10"
            src={'/internmatch.png'}
            w={INTERNMATCH_LOGO_WIDTH}
            cursor="pointer"
          />
        </Box>
      )}
      {slice(0)(maxItems)(evtButtons).map(button => button)}
      {evtButtons.length > maxItems && (
        <Popover placement="auto" isLazy offset={[0, 25]}>
          <PopoverTrigger>
            <Button color="#FFFFFF" variant="outline" w="full">
              {`More`}
            </Button>
          </PopoverTrigger>
          <PopoverContent bg="sidebar.background" borderRadius={'2xl'}>
            <PopoverBody>
              <Wrap spacing={5} padding={5} justify={'center'}>
                {slice(maxItems)(evtButtons.length)(evtButtons).map((button, index) => (
                  <WrapItem w={'1100px'} key={`SIDEBAR-WRAP-${index}`}>
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
