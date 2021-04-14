import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Avatar, Box, Flex, HStack, IconButton, Link, Spacer, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import { replace } from 'ramda'
import LinkedSupervisor from './templates/LinkedSupervisor'
import LinkedHostCpy from './templates/LinkedHostCpy'
import DetailSection from '../default-view/templates/detail-section'
import Software from './templates/Software'

const internshipDetail = {
  sectionIcon: faBriefcase,
  title: 'Internship Details',
  attributes: [
    'PRI_WORKSITE',
    'PRI_INTERNSHIP_START_DATE',
    'PRI_WHICH_DAYS_STRIPPED',
    'PRI_DRESS_CODE',
    'PRI_ASSOC_NUM_INTERNS',
  ],
}

let map = {}
let pano = {}
let geocoder = {}

const topHeight = '40vh'

const Internship = ({ sbeCode, targetCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  geocoder = new window.google.maps.Geocoder()

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const addressData = useSelector(selectCode(beCode, 'PRI_ADDRESS_FULL'))
  const address = addressData?.value
  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const { getImageSrc } = useApi()
  const src = getImageSrc(image?.value)
  const url = useSelector(selectCode(beCode, 'PRI_COMPANY_WEBSITE_URL'))
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))
  const software = useSelector(selectCode(beCode, 'PRI_SOFTWARE'))
  const actions = getActions(sbe)

  const linkedSupervisor = replace('SBE_INTERNSHIP_', 'SBE_LINKED_INTERN_SUPERVISOR_', sbeCode)
  const linkedHostCpy = replace('SBE_INTERNSHIP_', 'SBE_LINKED_HOST_CPY_', sbeCode)

  const [geo, setGeo] = useState(null)

  const panoRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    geocoder.geocode({ address }, res => {
      setGeo(res[0]?.geometry.location)
    })
  }, [address])

  useEffect(() => {
    if (geo && panoRef?.current && mapRef?.current) {
      map = new window.google.maps.Map(mapRef.current, {
        center: geo,
        zoom: 12,
        disableDefaultUI: true,
      })

      pano = new window.google.maps.StreetViewPanorama(panoRef.current, {
        position: geo,
        pov: {
          heading: 34,
          pitch: 10,
        },
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      })

      new window.google.maps.Marker({
        position: geo,
        map,
      })

      map.setStreetView(pano)
    }
  }, [geo])

  if (!sbe) return null

  if (!beCode) return null

  return (
    <Box
      w="70vw"
      h="100vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
    >
      <Flex>
        <div
          ref={panoRef}
          style={{
            width: '100%',
            borderTopLeftRadius: '0.5rem',
            height: topHeight,
            marginRight: '2px',
            transition: 'height 1s',
          }}
        />
        <Spacer />
        <div
          ref={mapRef}
          style={{
            borderTopRightRadius: '0.5rem',
            width: '100%',
            height: topHeight,
            marginLeft: '2px',
            transition: 'height 1s',
          }}
        />
      </Flex>
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          color="white"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <Avatar
        cursor="pointer"
        mt="-4.75rem"
        left="calc(35vw - 4.75rem)"
        bg="white"
        p="4px"
        src={src}
        w="9.5rem"
        h="9.5rem"
        zIndex="modal"
        position="absolute"
      />
      <VStack pt="5rem" overflow="scroll" h={`calc(100vh - ${topHeight})`}>
        <Link href={url?.value}>
          <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
            {name?.value}
          </Text>
        </Link>
        <Attribute code={beCode} attribute={'PRI_ASSOC_INDUSTRY'} />
        <Attribute code={beCode} attribute={'PRI_STATUS'} />
        <HStack>
          {actions.map(action => (
            <Action
              isFullWidth
              key={action}
              parentCode={sbeCode}
              targetCode={beCode}
              code={action}
              colorScheme="primary"
              size="md"
            />
          ))}
        </HStack>
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <VStack align="start">
            <LinkedSupervisor sbeCode={linkedSupervisor} />
            <DetailSection
              config={{ textStyle: 'body2' }}
              noTitle
              code={beCode}
              details={internshipDetail}
            />
            <Text textStyle="body1">Software to be Used</Text>
            <Software value={software?.value || ''} />
          </VStack>
          <VStack>
            <LinkedHostCpy sbeCode={linkedHostCpy} />
            <Box w="full">
              <VStack align="start">
                <Text textStyle="body1">Roles and Responsibilities</Text>
                <Box p="5">
                  <Attribute code={beCode} attribute={'PRI_ROLES_AND_RESPONSIBILITIES'} />
                </Box>
              </VStack>
              <VStack align="start">
                <Text textStyle="body1">Base Learning Outcomes</Text>
                <Box p="5">
                  <Attribute code={beCode} attribute={'PRI_BASE_LEARNING_OUTCOMES'} />
                </Box>
              </VStack>
              <VStack align="start">
                <Text textStyle="body1">Specific Learning Outcomes</Text>
                <Box p="5">
                  <Attribute code={beCode} attribute={'PRI_SPECIFIC_LEARNING_OUTCOMES'} />
                </Box>
              </VStack>
            </Box>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Internship
