import './style.css'

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
  useTheme,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { slice } from 'ramda'
import { INTERNMATCH_LOGO_WIDTH } from 'utils/constants'
import { onSendMessage } from 'vertx'

const InternmatchSidebar = ({ mappedPcm, maxItems, evtButtons, isSidebarCollapsed }) => {
  const theme = useTheme()
  return (
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
          <Image
            src={'/internmatch.png'}
            w={isSidebarCollapsed ? INTERNMATCH_LOGO_WIDTH : INTERNMATCH_LOGO_WIDTH}
            cursor="pointer"
            transition={'all 0.25s ease'}
          />
        </Box>
      </HStack>

      {slice(0)(maxItems)(evtButtons).map(button => button)}

      {evtButtons.length > maxItems && (
        <Popover placement="auto" isLazy offset={[0, 25]}>
          <PopoverTrigger>
            <Button
              color="#FFFFFF"
              variant="outline"
              w="full"
              _hover={{
                bg: theme.colors.internmatch.primary400,
                borderColor: theme.colors.internmatch.primary400,
                color: theme.colors.internmatch.primary,
              }}
            >
              {`More`}
            </Button>
          </PopoverTrigger>
          <PopoverContent bg="sidebar.background" borderRadius={'2xl'}>
            <PopoverBody
              className={
                isSidebarCollapsed ? 'sidebar-popover-body-collapsed' : 'sidebar-popover-body'
              }
            >
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
