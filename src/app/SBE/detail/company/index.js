import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Avatar, Box, Flex, HStack, IconButton, Link, Spacer, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import Status from 'app/DTT/status'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import Lane from 'app/SBE/lane'
import { replace } from 'ramda'
import { useIsMobile } from 'utils/hooks'
import CompanyMobile from './mobile_view'

let map = {}
let pano = {}
let geocoder = {}
const topHeight = '40vh'

const Company = ({ sbeCode, targetCode }) => {
  geocoder = new window.google.maps.Geocoder()

  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const addressData = useSelector(selectCode(beCode, 'PRI_ADDRESS_FULL'))
  const address = addressData?.value
  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const { getImageSrc } = useApi()
  const src = getImageSrc(image?.value)
  const url = useSelector(selectCode(beCode, 'PRI_COMPANY_WEBSITE_URL'))
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))
  const status = useSelector(selectCode(beCode, 'PRI_STATUS'))
  const actions = getActions(sbe)

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

  const isMobile = useIsMobile()

  if (!beCode) return null
  if (isMobile)
    return (
      <CompanyMobile
        name={name}
        status={status}
        url={url}
        panoRef={panoRef}
        mapRef={mapRef}
        topHeight={topHeight}
        onClose={onClose}
        actions={actions}
        sbeCode={sbeCode}
        beCode={beCode}
        src={src}
      />
    )

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
        <HStack>
          {actions.map(action => (
            <Action
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
          <VStack align="start" w="50%">
            <HStack spacing="10" align="start">
              <FontAwesomeIcon icon={faUser} />
              <VStack align="start">
                <Text fontWeight="semibold">Contact details</Text>
                <Status.Read data={status} />
                <Attribute code={beCode} attribute={'PRI_MOBILE'} />
                <Attribute code={beCode} attribute={'PRI_LEGAL_NAME'} />
                <Attribute code={beCode} attribute={'PRI_ABN'} />
                <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
              </VStack>
            </HStack>
            <HStack spacing="10" align="start">
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              <VStack align="start">
                <Text fontWeight="semibold">Description</Text>
                <Attribute
                  code={beCode}
                  attribute={'PRI_COMPANY_DESCRIPTION'}
                  fallback={<Text>No company description</Text>}
                />
              </VStack>
            </HStack>
          </VStack>
          <Lane sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)} />
        </HStack>
      </VStack>
    </Box>
  )
}

export default Company
