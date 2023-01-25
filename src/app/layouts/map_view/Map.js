import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { compose, isEmpty, not } from 'ramda'
import { useRef, useState } from 'react'

import { Box } from '@chakra-ui/react'

const Map = ({ parentCode, coordinates }) => {
  const mapRef = useRef(null)
  const [googleMap, setGoogleMap] = useState(null)
  const { latitude, longitude } = coordinates || {}
  const coordinatesArr = [coordinates]
  const notEmpty = compose(not, isEmpty)
  const showPinsInMap = notEmpty(latitude) && notEmpty(longitude)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })

  console.log('first')

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
        <GoogleMap zoom={15} center={{ lat: -37.82097, lng: 144.94179 }}>
          <Marker position={{ lat: -37.82097, lng: 144.94179 }} />
          {/* <Box w="full" h="full" ref={mapRef} id="map" />
          {showPinsInMap && <Pins googleMap={googleMap} coordinatesArr={coordinatesArr} />} */}
        </GoogleMap>
      ) : (
        <Box hidden />
      )}
    </>
  )
}

export default Map
