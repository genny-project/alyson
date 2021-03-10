import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Avatar, Box, Circle, HStack, Link, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import Status from 'app/DTT/status'

const geocoder = new window.google.maps.Geocoder()

let map = {}
let pano = {}

const Company = ({ sbeCode, targetCode }) => {
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
        zoom: 14,
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

      map.setStreetView(pano)
    }
  }, [geo])

  if (!beCode) return null

  return (
    <Box w="70vw" h="90vh">
      <div
        ref={mapRef}
        style={{
          position: 'absolute',
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
          width: '100%',
          height: '30vh',
        }}
      />
      <div
        ref={panoRef}
        style={{
          borderTopLeftRadius: '0.5rem',
          width: '20rem',
          height: '30vh',
        }}
      />
      <Box mt="-10" ml="5">
        <Circle
          w="10rem"
          h="10rem"
          p="4px"
          style={{
            background: '-webkit-linear-gradient(left top, teal 0%, crimson 100%)',
          }}
        >
          <Avatar bg="white" p="8px" src={src} w="9.5rem" h="9.5rem" zIndex="modal" />
        </Circle>
      </Box>
      <VStack mt="-24" h="60vh" overflow="scroll">
        <Link href={url?.value}>
          <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
            {name?.value}
            <Status.Read data={status} config={{ ml: '3' }} />
          </Text>
        </Link>
        <Attribute code={beCode} attribute={'PRI_MOBILE'} />
        <Text>
          <Attribute code={beCode} attribute={'PRI_LEGAL_NAME'} />
        </Text>
        <Text>
          <Attribute code={beCode} attribute={'PRI_ABN'} />
        </Text>
        <HStack>
          <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
          <Attribute code={beCode} attribute={'PRI_ASSOC_INDUSTRY'} />
        </HStack>
        <HStack>
          {actions.map(action => (
            <Action key={action} parentCode={sbeCode} targetCode={beCode} code={action} />
          ))}
        </HStack>
        <Box p="10">
          <Attribute
            code={beCode}
            attribute={'PRI_COMPANY_DESCRIPTION'}
            fallback={<Text>No company description</Text>}
          />
        </Box>
      </VStack>
    </Box>
  )
}

export default Company
