import { useRef, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Pins from 'app/layouts/map_view/Pins.js'
import { split, pathOr } from 'ramda'

const getLatitudeAndLongitude = addressCoordinates => {
  const splittedAddress = split(',')(addressCoordinates || '')
  const latitude = pathOr('', [0])(splittedAddress)
  const longitude = pathOr('', [1])(splittedAddress)
  return { latitude, longitude }
}

const Map = ({ parentCode, addressCoordinates }) => {
  const mapRef = useRef(null)
  const [googleMap, setGoogleMap] = useState(null)

  const { latitude, longitude } = getLatitudeAndLongitude(addressCoordinates)

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
    <Box w="inherit" h="inherit">
      <div style={{ width: 'auto', height: 'inherit' }} ref={mapRef} id="map" />
      <Pins googleMap={googleMap} />
    </Box>
  )
}

export default Map
