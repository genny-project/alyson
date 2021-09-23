import { useRef, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Pins from './Pins'
import { useIsMobile } from 'utils/hooks'

const Map = ({ parentCode }) => {
  const mapRef = useRef(null)
  const [gMap, setGMap] = useState(null)

  const isMobile = useIsMobile()

  useEffect(() => {
    if (!gMap) {
      setGMap(
        new window.google.maps.Map(mapRef.current, {
          zoom: 5,
          center: { lat: -34.397, lng: 150.644 },
        }),
      )

      if (navigator.geolocation && gMap) {
        navigator.geolocation.getCurrentPosition(position => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          if (gMap && gMap.setCenter) gMap.setCenter(geolocation)
        })
      }
    }
  }, [gMap, parentCode])

  return (
    <Box left={isMobile ? '1vw' : '30vw'} bottom="1" width="inherit">
      <div style={{ width: 'auto', height: '100vh' }} ref={mapRef} id="map" />
      <Pins gMap={gMap} parentCode={parentCode} />
    </Box>
  )
}

export default Map
