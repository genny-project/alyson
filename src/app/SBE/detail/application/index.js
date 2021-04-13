import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'

let map = {}
let pano = {}
let geocoder = {}

const Application = ({ sbeCode, targetCode }) => {
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
  const actions = getActions(sbe)

  const [geo, setGeo] = useState(null)
  const [topHeight, setTopHeight] = useState('40vh')

  const handleScroll = () => {
    if (topHeight !== '5vh') setTopHeight('5vh')
  }

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
      h="90vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
    >
      <Flex onClick={() => setTopHeight('40vh')}>
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
        onClick={() => setTopHeight(topHeight => (topHeight === '40vh' ? '0' : '40vh'))}
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
      <VStack pt="5rem" onScroll={handleScroll} overflow="scroll" h={`calc(90vh - ${topHeight})`}>
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
        <HStack align="start" pt="1rem">
          <VStack align="start">
            <Text textStyle="body1">Internship Supervisor</Text>
            <Attribute code={beCode} attribute={'PRI_SUPER_NAME'} />
            <Attribute code={beCode} attribute={'PRI_SUPER_JOB_TITLE'} />
            <Attribute code={beCode} attribute={'PRI_SUPER_EMAIL'} />
            <Attribute code={beCode} attribute={'PRI_SUPER_MOBILE'} />
          </VStack>
          <VStack align="start">
            <HStack>
              <Text>Internship Hosted By</Text>
              <Attribute config={{ textStyle: 'body1' }} code={beCode} attribute={'PRI_ASSOC_HC'} />
            </HStack>
            <HStack>
              <Text>Intern Applying</Text>
              <Attribute
                config={{ textStyle: 'body1' }}
                code={beCode}
                attribute={'PRI_INTERN_NAME'}
              />
            </HStack>
            <HStack>
              <Text>Start Date</Text>
              <Attribute
                config={{ textStyle: 'body1' }}
                code={beCode}
                attribute={'PRI_START_DATE'}
              />
            </HStack>
            <HStack>
              <Text>Days</Text>
              <Attribute
                config={{ textStyle: 'body1' }}
                code={beCode}
                attribute={'PRI_WHICH_DAYS_STRIPPED'}
              />
            </HStack>
          </VStack>
        </HStack>
        <Divider w="90%" pt="5" />
        <VStack w="full" align="start" p="5" pl="10">
          <VStack align="start">
            <Text textStyle="body1">Roles and Responsibilities</Text>
            <Box>
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
        </VStack>
      </VStack>
    </Box>
  )
}

export default Application
