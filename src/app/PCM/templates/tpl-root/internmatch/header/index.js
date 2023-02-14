import { IconButton } from '@chakra-ui/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PcmField from 'app/PCM/components/pcm-field'

const Header = ({ isMobile, color, PRI_LOC1, mappedPcm, depth, btnRef, onOpen }) => {
  return (
    <header
      style={{
        gridArea: isMobile ? 'header/nav' : 'header',
        color,
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 32px -16px rgba(0, 0, 0, 0.25)',
        position: 'relative',
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