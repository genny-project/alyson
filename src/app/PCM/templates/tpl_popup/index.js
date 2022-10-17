import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  useTheme,
} from '@chakra-ui/react'
import PcmField from 'app/PCM/components/pcm-field'
import useProductColors from 'utils/productColors'

const TemplatePopup = ({ mappedPcm, depth }) => {
  const { PRI_LOC1, PRI_LOC2 } = mappedPcm

  const theme = useTheme()
  const { buttonBackgroundColor } = useProductColors()

  return (
    <Popover>
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
