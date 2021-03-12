import { find, includes, keys, prop, split, head, compose } from 'ramda'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCodes } from 'redux/db/selectors'
import { selectRows } from 'redux/db/selectors'

const Map = ({ map }) => {
  const parentCode = useSelector(
    compose(head, a => split('@', a || ''), find(includes('SBE_INTERNSHIPS_')), keys, prop('db')),
  )

  const rows = useSelector(selectRows(parentCode))

  const lats = useSelector(selectCodes(rows, 'PRI_ADDRESS_LATITUDE'))
  const lngs = useSelector(selectCodes(rows, 'PRI_ADDRESS_LONGITUDE'))
  const assocs = useSelector(selectCodes(rows, 'PRI_ASSOC_HC'))
  const names = useSelector(selectCodes(rows, 'PRI_NAME'))

  useEffect(() => {
    lats.forEach((lat, idx) => {
      if (lat?.value) {
        const lng = lngs[idx]
        // const targetCode = lat.baseEntityCode

        const marker = new window.google.maps.Marker({
          position: { lat: lat.value, lng: lng.value },
          map,
        })

        marker.addListener('click', () => {
          window.open('https://internmatch.io/sign-up/')
        })
      }
    })
  }, [assocs, lats, lngs, map, names, parentCode])

  return null
}

export default Map
