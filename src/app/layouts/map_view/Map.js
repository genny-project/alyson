import { useEffect, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react'
import Pins from 'app/layouts/map_view/Pins.js'
import { compose, not, isEmpty } from 'ramda'

const Map = ({ parentCode, coordinates }) => {
  const mapRef = useRef(null)
  const [googleMap, setGoogleMap] = useState(null)
  const { latitude, longitude } = coordinates || {}
  const coordinatesArr = [coordinates]
  const notEmpty = compose(not, isEmpty)
  const showPinsInMap = notEmpty(latitude) && notEmpty(longitude)

  useEffect(() => {
    if (!googleMap) {
      setGoogleMap(
        new window.google.maps.Map(mapRef.current, {
          zoom: 15,
          center: { lat: Number(latitude) || -37.82097, lng: Number(longitude) || 144.94179 },
        }),
      )

      if (navigator.geolocation && googleMap) {
        navigator.geolocation.getCurrentPosition(position => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          if (googleMap && googleMap.setCenter) googleMap.setCenter(geolocation)
        })
      }
    }
  }, [googleMap, parentCode, latitude, longitude])

  return (
    <Box w="full" h="full">
      <Box w="full" h="full" ref={mapRef} id="map" />
      {showPinsInMap && <Pins googleMap={googleMap} coordinatesArr={coordinatesArr} />}
    </Box>
  )
}

export default Map
