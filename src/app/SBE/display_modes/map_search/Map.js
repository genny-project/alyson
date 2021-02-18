import { useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCodes } from 'redux/db/selectors'
import { zip, filter, identity, compose } from 'ramda'

let gMap
const clear = compose(filter(identity))
const Map = ({ rows }) => {
  const mapRef = useRef(null)

  const lats = useSelector(selectCodes(rows, 'PRI_ADDRESS_LATITUDE'))
  const lngs = useSelector(selectCodes(rows, 'PRI_ADDRESS_LONGITUDE'))
  const assocs = useSelector(selectCodes(rows, 'PRI_ASSOC_HC'))
  const names = useSelector(selectCodes(rows, 'PRI_NAME'))

  useEffect(() => {
    gMap = new window.google.maps.Map(mapRef.current, { zoom: 10 })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        gMap.setCenter(geolocation)

        lats.forEach((lat, idx) => {
          if (lat?.value) {
            const lng = lngs[idx]
            const assoc = assocs[idx]
            const name = names[idx]

            const marker = new window.google.maps.Marker({
              position: { lat: lat.value, lng: lng.value },
              map: gMap,
            })
            const infowindow = new window.google.maps.InfoWindow({
              content: `<div>
                <div style="color: black; font-size: 2rem;">${assoc.value}</div>
                <div style="color: black; font-size: 1rem;">${name.value}</div>
              </div>`,
            })

            marker.addListener('click', () => {
              infowindow.open(gMap, marker)
            })
          }
        })
      })
    }
  }, [assocs, lats, lngs, names])

  return (
    <Box w="100%" h="40rem">
      <div style={{ borderRadius: '1rem', width: '100%', height: '100%' }} ref={mapRef} id="map" />
    </Box>
  )
}

export default Map
