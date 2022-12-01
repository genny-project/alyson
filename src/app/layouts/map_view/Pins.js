import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import useGetMarkers from 'app/SBE/display_modes/map_view/useGetMarkers'

const Pins = ({ parentCode, gMap }) => {
  const rows = useSelector(selectRows(parentCode))
  const lats = useSelector(selectCodes(rows, 'PRI_ADDRESS_LATITUDE'))
  const lngs = useSelector(selectCodes(rows, 'PRI_ADDRESS_LONGITUDE'))
  const assocs = useSelector(selectCodes(rows, 'PRI_ASSOC_HC'))
  const names = useSelector(selectCodes(rows, 'PRI_NAME'))

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
        map: gMap,
      })

      currentMarkers.push(marker)

      marker.addListener('click', () => {
        onSendMessage({
          code: 'ACT_PRI_EVENT_VIEW',
          targetCode,
          parentCode,
        })
      })
      gMap?.setCenter(position)
    })
    markerRef.current = currentMarkers
  }, [assocs, gMap, lats, lngs, names, parentCode, pins])

  return null
}

export default Pins
