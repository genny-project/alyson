import { Grid } from '@chakra-ui/react'
import Content from 'app/PCM/templates/tpl-root/internmatch/content'
import Header from 'app/PCM/templates/tpl-root/internmatch/header'
import Sidebar from 'app/PCM/templates/tpl-root/internmatch/sidebar'
import { SIDEBAR_WIDTH } from 'utils/constants'

const InternmatchRoot = ({
  isMobile,
  color,
  lightColor,
  theme,
  btnRef,
  PRI_LOC1,
  mappedPcm,
  depth,
  onOpen,
  isOpen,
  onClose,
  PRI_LOC2,
  showTemplateNames,
  PRI_LOC3,
}) => {
  return (
    <Grid
      h={'100vh'}
      templateAreas={`"nav header"
    "nav main"`}
      gridTemplateColumns={isMobile ? '1fr' : `${SIDEBAR_WIDTH} 1fr`}
      gridTemplateRows={'auto 1fr'}
      fontFamily={'product.bodyFont'}
    >
      {/* HEADER WRAPPER */}
      <Header
        isMobile={isMobile}
        color={color}
        PRI_LOC1={PRI_LOC1}
        mappedPcm={mappedPcm}
        depth={depth}
        btnRef={btnRef}
        onOpen={onOpen}
      />

      {/* SIDEBAR WRAPPER */}

      <Sidebar
        isMobile={isMobile}
        isOpen={isOpen}
        onClose={onClose}
        theme={theme}
        PRI_LOC2={PRI_LOC2}
        mappedPcm={mappedPcm}
        depth={depth}
        lightColor={lightColor}
      />

      {/* MAIN CONTENT WRAPPER */}
      <Content
        isMobile={isMobile}
        lightColor={lightColor}
        showTemplateNames={showTemplateNames}
        PRI_LOC3={PRI_LOC3}
        mappedPcm={mappedPcm}
        depth={depth}
      />
    </Grid>
  )
}

export default InternmatchRoot
