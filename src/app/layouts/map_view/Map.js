import './styles.css'

import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'

import { Box } from '@chakra-ui/react'
import { useRef } from 'react'

// import { compose, isEmpty, not } from 'ramda'

const Map = ({ parentCode, coordinates }) => {
  const mapRef = useRef(null)
  const { latitude, longitude } = coordinates || {}
  // const [googleMap, setGoogleMap] = useState(null)

  // const coordinatesArr = [coordinates]
  // const notEmpty = compose(not, isEmpty)
  // const showPinsInMap = notEmpty(latitude) && notEmpty(longitude)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })

  // THE CODES HAVE BEEN COMMENTED OUT FOR NOW. A SEPARATE PLUGIN HAS BEEN USED FOR MAPS. IF EVERYTHING WORKS, THE COMMENTED CODEDS WILL BE DELETED.

  // useEffect(() => {
  //   if (!googleMap) {
  //     setGoogleMap(
  //       new window.google.maps.Map(mapRef.current, {
  //         zoom: 15,
  //         center: { lat: Number(latitude) || -37.82097, lng: Number(longitude) || 144.94179 },
  //       }),
  //     )

  //     if (navigator.geolocation && googleMap) {
  //       navigator.geolocation.getCurrentPosition(position => {
  //         const geolocation = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         }

  //         if (googleMap && googleMap.setCenter) googleMap.setCenter(geolocation)
  //       })
  //     }
  //   }
  // }, [googleMap, parentCode, latitude, longitude])

  return (
    <>
      {isLoaded ? (
        <Box ref={mapRef}>
          <GoogleMap
            zoom={15}
            center={{ lat: latitude, lng: longitude }}
            mapContainerClassName={'map-container'}
          >
            <MarkerF position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </Box>
      ) : (
        <Box hidden />
      )}
    </>
  )
}

export default Map
