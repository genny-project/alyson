import { Box, Grid, Tooltip } from '@chakra-ui/react'
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_SM } from 'utils/constants'

import Content from 'app/PCM/templates/tpl-root/internmatch/content'
import Header from 'app/PCM/templates/tpl-root/internmatch/header'
import Sidebar from 'app/PCM/templates/tpl-root/internmatch/sidebar'
import { useState } from 'react'
import { Iconly } from 'react-iconly'

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const gridColWidth = isSidebarCollapsed ? SIDEBAR_WIDTH_SM : SIDEBAR_WIDTH

  return (
    <Grid
      h={'100vh'}
      templateAreas={`"nav header"
    "nav main"`}
      gridTemplateColumns={isMobile ? '1fr' : `${gridColWidth} 1fr`}
      gridTemplateRows={'auto 1fr'}
      bg={'internmatch.primary300'}
      transition={'all 0.25s ease'}
      fontFamily={'internmatchBody'}
    >
      {!isMobile && (
        <Tooltip label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
          <Box
            as="button"
            position={'absolute'}
            left={isSidebarCollapsed ? '5.75rem' : '14.69rem'}
            top={'2.4rem'}
            zIndex={'10000'}
            onClick={() => {
              setIsSidebarCollapsed(!isSidebarCollapsed)
            }}
            marginInlineStart={'-1.25rem'}
            borderRadius={'full'}
            paddingBlock={1}
            paddingInline={1}
            border={`2px solid`}
            borderColor={'internmatch.lightAlpha40'}
            bg={'internmatch.primary'}
            color={'internmatch.light'}
            transition={'all 0.25s ease'}
          >
            <Iconly
              name={isSidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              set="two-tone"
              size="small"
              primaryColor="white"
              secondaryColor="rgb(255 255 255 / .5)"
            />
          </Box>
        </Tooltip>
      )}

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
        isSidebarCollapsed={isSidebarCollapsed}
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
