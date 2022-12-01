import { useSelector } from 'react-redux'
import { selectCodes, selectRows } from 'redux/db/selectors'

const useGetMarkers = (parentCode: string): Array<object> => {
  let pins: Array<object> = []
  const rows: Array<string> = useSelector(selectRows(parentCode))
  const lats = useSelector(selectCodes(rows, 'PRI_ADDRESS_LATITUDE'))
  const lngs = useSelector(selectCodes(rows, 'PRI_ADDRESS_LONGITUDE'))

  lats.forEach((lat, idx) => {
    let individualPinObject: object
    if (lat?.value) {
      const lng = lngs[idx]
      const targetCode = lat.baseEntityCode
      individualPinObject = { lat: lat?.value, lng: lng?.value, targetCode }
      pins?.push(individualPinObject)
    }
  })
  return pins
}

export default useGetMarkers
