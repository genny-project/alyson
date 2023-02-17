import {
  Box,
  Button,
  Grid,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { slice } from 'ramda'
import { INTERNMATCH_LOGO_WIDTH } from 'utils/constants'
import { onSendMessage } from 'vertx'

const InternmatchSidebar = ({ mappedPcm, maxItems, evtButtons }) => {
  return (
    <Grid
      test-id={mappedPcm.PRI_QUESTION_CODE}
      placeItems="center"
      gap={7}
      paddingInline={4}
      maxH={'full'}
      wordBreak={'break-word'}
    >
      <Box
        onClick={() =>
          onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
        }
      >
        <Image marginY="10" src={'/internmatch.png'} w={INTERNMATCH_LOGO_WIDTH} cursor="pointer" />
      </Box>

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

export default InternmatchSidebar
