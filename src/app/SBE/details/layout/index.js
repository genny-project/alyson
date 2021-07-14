import { useBoolean } from '@chakra-ui/hooks'
import { Box, Center, Stack, VStack, Flex, HStack, Text } from '@chakra-ui/layout'
import { add } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import DetailActions from 'app/SBE/details/template/layouts/Actions.js'
import DetailHeader from './Header'
import Tile from './Tile'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faUser,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faGraduationCap,
  faTimes,
  faCog,
  faCalendarAlt,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '@chakra-ui/react'
import LeftDetail from 'app/SBE/details/template/LeftDetail.js'
import Card from 'app/layouts/components/card'
import { closeDrawer } from 'redux/app'
import Header from 'app/SBE/details/template/layouts/Header.js'
import { Grid, GridItem } from '@chakra-ui/react'

import { map } from 'ramda'
const DetailLayout = ({ sbeCode, targetCode, details = [[], []] }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null
  const videoData = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))
  const isMobile = useIsMobile()
  const [mini, setMini] = useBoolean(isMobile)
  const [delta, setDelta] = useState(0)
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const onScroll = e => {
    setMini.on()
    setDelta(0)
  }
  const onWheel = e => setDelta(add(e.deltaY))
  useEffect(() => {
    if (delta < -300) {
      setMini.off()
      setDelta(0)
    }
  }, [delta, setMini])
  const tileWidth = isMobile ? '90vw' : '33vw'
  const pt = videoData?.value
    ? { true: '12rem', false: '24rem' }
    : { true: '12rem', false: '18rem' }
  const prefs = {
    header: 'Internship Preferences',
    icon: <FontAwesomeIcon size="lg" icon={faCog} />,
    attributes: [
      { attr: 'PRI_ASSOC_INDUSTRY', label: 'Industry' },
      { attr: 'PRI_ASSOC_OCCUPATION', label: 'Specialisation' },
      { attr: 'PRI_CAREER_OBJECTIVES', label: 'Career Objectives' },
      { attr: 'PRI_ASSOC_CURRENT_SOFTWARE', label: 'Proficient Software' },
      { attr: 'PRI_ASSOC_FUTURE_SOFTWARE', label: 'Software would like experience in' },
    ],
  }
  const internshipDetails = {
    header: 'Internship Specifications',
    icon: <FontAwesomeIcon size="lg" icon={faCalendarAlt} />,
    attributes: [
      { attr: 'PRI_START_DATE', label: 'Internship Start Date' },
      { attr: 'PRI_ASSOC_DURATION', label: 'Internship Duration' },
      { attr: 'PRI_DAYS_PER_WEEK', label: 'Days Per Week' },
      { attr: 'PRI_WHICH_DAYS_STRIPPED', label: 'Days Of Week' },
    ],
  }
  const recentEmployment = {
    header: 'Experience',
    icon: <FontAwesomeIcon size="lg" icon={faBriefcase} />,
    attributes: [
      { attr: 'PRI_PREV_JOB_TITLE', label: 'Job Title' },
      { attr: 'PRI_PREV_DURATION', label: 'Tenure' },
      { attr: 'PRI_PREV_EMPLOYER', label: 'Company Name' },
      { attr: 'PRI_ASSOC_OCCUPATION', label: 'Industry' },
      { attr: 'PRI_PREV_DESCRIPTION', label: 'Description' },
    ],
  }
  return (
    <Box className="nobar" minH="90vh" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <Box w="100%" alignItems="start" display="flex">
        <LeftDetail beCode={beCode} sbeCode={sbeCode} />
        <VStack flex="1" m={3} mb={8} spacing={6}>
          <Header beCode={beCode} />
          <Center w="full">
            <Card minH="17rem" p={6} w="full" bg="#F7FAFC" overflow="hidden" borderRadius="2rem">
              <VStack align="start" spacing={7}>
                <HStack spacing={5} w="full">
                  <FontAwesomeIcon size="lg" icon={faCog} />
                  <Text textStyle="body.1">{`Internship Preferences`}</Text>
                </HStack>
              </VStack>
            </Card>
          </Center>

          <Center w="full">
            <Card minH="9rem" p={6} w="full" bg="#F7FAFC" overflow="hidden" borderRadius="2rem">
              <VStack align="start" spacing={7}>
                <HStack spacing={5} w="full">
                  {internshipDetails?.icon}
                  <Text textStyle="body.1">{internshipDetails?.header}</Text>
                </HStack>
                <HStack w="full" justifyContent="space-between">
                  {map(({ label, attr }) => {
                    return (
                      <VStack align="start" justify="start">
                        <Text textStyle="tail.2">{label}</Text>
                        <Attribute code={beCode} attribute={attr} />
                      </VStack>
                    )
                  })(internshipDetails.attributes)}
                </HStack>
              </VStack>
            </Card>
          </Center>

          <Center w="full">
            <Card minH="13rem" p={6} w="full" bg="#F7FAFC" overflow="hidden" borderRadius="2rem">
              <VStack align="start" spacing={7}>
                <HStack spacing={5} w="full">
                  {recentEmployment?.icon}
                  <Text textStyle="body.1">{recentEmployment?.header}</Text>
                </HStack>
                <Grid
                  h="11rem"
                  w="100%"
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(4, 1fr)"
                  gap={4}
                >
                  <GridItem rowSpan={1} colSpan={1}>
                    <VStack align="start">
                      <Text textStyle="tail.2">{`Job Title`}</Text>
                      <Attribute code={beCode} attribute={`PRI_PREV_JOB_TITLE`} />
                    </VStack>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <VStack align="start">
                      <Text textStyle="tail.2">{`Tenure`}</Text>
                      <Attribute code={beCode} attribute={`PRI_PREV_DURATION`} />
                    </VStack>
                  </GridItem>
                  <GridItem rowSpan={2} colSpan={2}>
                    <VStack align="start">
                      <Text textStyle="tail.2">{`Description`}</Text>
                      <Attribute code={beCode} attribute={`PRI_PREV_DESCRIPTION`} />
                    </VStack>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <VStack align="start">
                      <Text textStyle="tail.2">{`Company Name`}</Text>
                      <Attribute code={beCode} attribute={`PRI_PREV_EMPLOYER`} />
                    </VStack>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <VStack align="start">
                      <Text textStyle="tail.2">{`Industry`}</Text>
                      <Attribute code={beCode} attribute={`PRI_ASSOC_OCCUPATION`} />
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            </Card>
          </Center>
        </VStack>
      </Box>
    </Box>
  )
}
export default DetailLayout
