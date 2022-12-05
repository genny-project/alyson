import { useEffect, useRef } from 'react'

const Pins = ({ googleMap, coordinatesArr }) => {
  const markerRef = useRef([])
  let markers = markerRef?.current

  useEffect(() => {
    if (markers) {
      markers.forEach(marker => marker.setMap(null))
    }
  }, [markers])

  useEffect(() => {
    let currentMarkers = []
    coordinatesArr?.forEach(({ latitude, longitude }) => {
      const position = { lat: latitude, lng: longitude }

      const marker = new window.google.maps.Marker({
        position,
        map: googleMap,
      })

      currentMarkers.push(marker)

      googleMap?.setCenter(position)
    })
    markerRef.current = currentMarkers
  }, [coordinatesArr, googleMap])

  return null
}

export default Pins
