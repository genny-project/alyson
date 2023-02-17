import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { slice } from 'ramda'
import { INTERNMATCH_LOGO_WIDTH } from 'utils/constants'
import { onSendMessage } from 'vertx'

const InternmatchSidebar = ({
  mappedPcm,
  maxItems,
  evtButtons,
  collapseSidebar,
  toggleSidebar,
}) => {
  return collapseSidebar ? (
    <Grid
      test-id={mappedPcm.PRI_QUESTION_CODE}
      placeItems="center"
      gap={7}
      paddingInline={4}
      maxH={'full'}
      wordBreak={'break-word'}
    >
      <HStack marginY="10" spacing={5} justifyContent="space-between">
        <FontAwesomeIcon icon={faBars} color="#FFFFFF" onClick={toggleSidebar} cursor="pointer" />
      </HStack>

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
  ) : (
    <Grid
      test-id={mappedPcm.PRI_QUESTION_CODE}
      placeItems="center"
      gap={7}
      paddingInline={4}
      maxH={'full'}
      wordBreak={'break-word'}
    >
      <HStack marginY="10" spacing={5} justifyContent="space-between">
        <Box
          onClick={() =>
            onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
          }
        >
          <Image src={'/internmatch.png'} w={INTERNMATCH_LOGO_WIDTH} cursor="pointer" />
        </Box>
        <FontAwesomeIcon icon={faBars} color="#FFFFFF" onClick={toggleSidebar} cursor="pointer" />
      </HStack>

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
