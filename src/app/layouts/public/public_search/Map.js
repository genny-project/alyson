import { useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCodes } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import { selectRows } from 'redux/db/selectors'

let gMap

const Map = ({ parentCode }) => {
  const mapRef = useRef(null)

  const rows = useSelector(selectRows(parentCode))

  const lats = useSelector(selectCodes(rows, 'PRI_ADDRESS_LATITUDE'))
  const lngs = useSelector(selectCodes(rows, 'PRI_ADDRESS_LONGITUDE'))
  const assocs = useSelector(selectCodes(rows, 'PRI_ASSOC_HC'))
  const names = useSelector(selectCodes(rows, 'PRI_NAME'))

  useEffect(() => {
    gMap = new window.google.maps.Map(mapRef.current, {
      zoom: 5,
      center: { lat: -34, lng: 150 },
      disableDefaultUI: true,
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        gMap.setCenter(geolocation)
      })
    }

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
    <Box position="fixed" w="100vw" h="100vh" style={{ left: 0, top: 0, zIndex: -1 }}>
      <div style={{ width: '100%', height: '100%' }} ref={mapRef} id="map" />
    </Box>
  )
}

export default Map
