import { IconButton } from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PcmField from 'app/PCM/components/pcm-field'

const Header = ({ isMobile, color, PRI_LOC1, mappedPcm, depth, btnRef, onOpen }) => {
  const theme = useTheme()
  return (
    <header
      style={{
        gridArea: isMobile ? 'header/nav' : 'header',
        color,
        position: 'relative',
        zIndex: theme.zIndices.overlay,
        paddingInlineStart: 'clamp(1rem, 5vw, 6.69rem)',
        paddingInlineEnd: '1rem',
        paddingBlock: '1.75rem',
        backgroundColor: isMobile ? theme.colors.internmatch.primary : 'transparent',
      }}
    >
      {/* Header PCM*/}
      <PcmField
        code={PRI_LOC1}
        mappedPcm={mappedPcm}
        depth={depth}
        properties={{ bg: 'lightColor', color: color }}
      />

      {isMobile && (
        <IconButton
          ref={btnRef}
          aria-label="Toggle Side Navigation Bar"
          aria-controls="sideNav"
          icon={<FontAwesomeIcon icon={faBars} />}
          position="absolute"
          top="1.25rem"
          left="0.75rem"
          color="product.secondary"
          bg="transparent"
          onClick={onOpen}
        />
      )}
    </header>
  )
}

export default Header
