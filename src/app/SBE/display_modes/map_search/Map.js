import { useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCodes } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

let gMap

const Map = ({ rows, parentCode }) => {
  const mapRef = useRef(null)

  const lats = useSelector(selectCodes(rows, 'PRI_ADDRESS_LATITUDE'))
  const lngs = useSelector(selectCodes(rows, 'PRI_ADDRESS_LONGITUDE'))
  const assocs = useSelector(selectCodes(rows, 'PRI_ASSOC_HC'))
  const names = useSelector(selectCodes(rows, 'PRI_NAME'))

  useEffect(() => {
    gMap = new window.google.maps.Map(mapRef.current, {
      zoom: 5,
      center: { lat: -34.397, lng: 150.644 },
    })

    lats.forEach((lat, idx) => {
      if (lat?.value) {
        const lng = lngs[idx]
        const targetCode = lat.baseEntityCode

        const marker = new window.google.maps.Marker({
          position: { lat: lat.value, lng: lng.value },
          map: gMap,
        })

        marker.addListener('click', () => {
          onSendMessage({
            code: 'ACT_PRI_EVENT_VIEW',
            targetCode,
            parentCode,
          })
        })
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          gMap.setCenter(geolocation)
        })
      }
    })
  }, [assocs, lats, lngs, names, parentCode])

  return (
    <Box w="100%" h="40rem">
      <div style={{ borderRadius: '1rem', width: '100%', height: '100%' }} ref={mapRef} id="map" />
    </Box>
  )
}

export default Map
