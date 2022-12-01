import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import useGetMarkers from 'app/SBE/display_modes/map_view/useGetMarkers'

const Pins = ({ parentCode, googleMap }) => {
  const rows = useSelector(selectRows(parentCode))
  const lats = useSelector(selectCodes(rows, 'PRI_ADDRESS_LATITUDE'))
  const lngs = useSelector(selectCodes(rows, 'PRI_ADDRESS_LONGITUDE'))

  const pins = useGetMarkers(parentCode)

  const markerRef = useRef([])
  let markers = markerRef?.current

  useEffect(() => {
    if (markers) {
      markers.forEach(marker => marker.setMap(null))
    }
  }, [markers])

  useEffect(() => {
    let currentMarkers = []
    pins?.forEach(({ lat, lng, targetCode }) => {
      const position = { lat, lng }

      const marker = new window.google.maps.Marker({
        position,
        map: googleMap,
      })

      currentMarkers.push(marker)

      marker.addListener('click', () => {
        onSendMessage({
          code: 'ACT_PRI_EVENT_VIEW',
          targetCode,
          parentCode,
        })
      })
      googleMap?.setCenter(position)
    })
    markerRef.current = currentMarkers
  }, [googleMap, lats, lngs, parentCode, pins])

  return null
}

export default Pins
