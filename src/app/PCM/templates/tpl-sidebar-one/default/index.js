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

import { slice } from 'ramda'

const DefaultSidebar = ({ mappedPcm, maxItems, evtButtons }) => {
  return (
    <Grid
      test-id={mappedPcm.PRI_QUESTION_CODE}
      placeItems="center"
      gap={7}
      paddingInline={4}
      maxH={'full'}
      wordBreak={'break-word'}
    >
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

export default DefaultSidebar
