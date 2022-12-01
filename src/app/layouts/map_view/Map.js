import { useRef, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Pins from 'app/layouts/map_view/Pins.js'

const Map = ({ parentCode }) => {
  const mapRef = useRef(null)
  const [googleMap, setGoogleMap] = useState(null)

  useEffect(() => {
    if (!googleMap) {
      setGoogleMap(
        new window.google.maps.Map(mapRef.current, {
          zoom: 5,
          center: { lat: -34.397, lng: 150.644 },
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
  }, [googleMap, parentCode])

  return (
    <Box w="inherit" h="inherit">
      <div style={{ width: 'auto', height: 'inherit' }} ref={mapRef} id="map" />
      <Pins googleMap={googleMap} parentCode={parentCode} />
    </Box>
  )
}

export default Map
