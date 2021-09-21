import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const Pins = ({ parentCode, gMap }) => {
  const rows = useSelector(selectRows(parentCode))
  const lats = useSelector(selectCodes(rows, 'PRI_ADDRESS_LATITUDE'))
  const lngs = useSelector(selectCodes(rows, 'PRI_ADDRESS_LONGITUDE'))
  const assocs = useSelector(selectCodes(rows, 'PRI_ASSOC_HC'))
  const names = useSelector(selectCodes(rows, 'PRI_NAME'))

  useEffect(() => {
    lats.forEach((lat, idx) => {
      if (lat?.value) {
        const lng = lngs[idx]
        const targetCode = lat.baseEntityCode

        const position = { lat: lat.value, lng: lng.value }

        const marker = new window.google.maps.Marker({
          position,
          map: gMap,
        })

        marker.addListener('click', () => {
          onSendMessage({
            code: 'ACT_PRI_EVENT_VIEW',
            targetCode,
            parentCode,
          })
        })

        if (idx === 0) gMap?.setCenter(position)
      }
    })
  }, [assocs, gMap, lats, lngs, names, parentCode])

  return null
}

export default Pins
