import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  useTheme,
  Box,
} from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import { useState } from 'react'
import useProductColors from 'utils/productColors'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TemplatePopup = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2 } = mappedPcm

  const [isOpen, setIsOpen] = useState(false)

  const theme = useTheme()
  const { buttonBackgroundColor } = useProductColors()
  return (
    <Popover closeOnBlur={false}>
      <PopoverTrigger>
        <Button
          id={`${mappedPcm.code}-trigger`}
          test-id={`${mappedPcm.code}-trigger`}
          variant="solid"
          minW={`6.5rem`}
          paddingBlock="0.38rem"
          paddingInline="1.25rem"
          mr={2}
          mb="5"
          onClick={() => setIsOpen(!isOpen)}
          background={buttonBackgroundColor}
          borderRadius={'0.5rem'}
          fontSize={'sm'}
          color={theme.colors.text.dark}
          _hover={{
            background: theme.colors.background.light,
            color: buttonBackgroundColor,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: buttonBackgroundColor,
            variant: 'outline',
          }}
        >
          {!!PRI_LOC1 ? (
            <PcmField code={PRI_LOC1} mappedPcm={mappedPcm} depth={depth} />
          ) : (
            mappedPcm.code
          )}
          <Box paddingX={1} />
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </Button>
      </PopoverTrigger>
      <PopoverContent width="auto" paddingX={2}>
        <PopoverArrow />
        <PcmField code={PRI_LOC2} mappedPcm={mappedPcm} depth={depth} />
      </PopoverContent>
    </Popover>
  )
}

export default TemplatePopup
