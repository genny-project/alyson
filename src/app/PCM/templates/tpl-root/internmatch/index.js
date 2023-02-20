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
    >
      {!isMobile && (
        <Tooltip label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
          <Box
            as="button"
            position={'absolute'}
            left={gridColWidth}
            top={5}
            zIndex={'10000'}
            onClick={() => {
              setIsSidebarCollapsed(!isSidebarCollapsed)
            }}
            marginInlineStart={'-1.25rem'}
            borderRadius={'full'}
            paddingBlock={3}
            paddingInline={3}
            border={`1px solid`}
            borderColor={'internmatch.primary300'}
            bg={'internmatch.primary'}
            color={'internmatch.light'}
            transition={'all 0.25s ease'}
          >
            <Iconly
              name={isSidebarCollapsed ? 'ArrowRight' : 'ArrowLeft'}
              set="light"
              size="small"
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
