import { useEffect, useRef, createRef } from 'react'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
const GoogleMaps = ({ addressRef, setAllOptions, allOptions }) => {
  const googleMapRef = createRef()
  const googleMap = useRef(null)
  let map

  const initMap = () => {
    map = new window.google.maps.Map(googleMapRef.current, {
      zoom: 13,
      mapTypeId: 'roadmap',
    })

    const input = document.getElementById('address-input')
    const options = {
      fields: ['formatted_address', 'geometry', 'name'],
      origin: map.getCenter(),
      strictBounds: false,
    }
    const autocomplete = new window.google.maps.places.Autocomplete(input, options)
    const infowindow = new window.google.maps.InfoWindow()
    const infowindowContent = document.getElementById('infowindow-content')
    infowindow.setContent(infowindowContent)
    autocomplete.addListener('place_changed', () => {
      infowindow.close()
      const place = autocomplete.getPlace()
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'")
        return
      }
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport)
      } else {
        map.setCenter(place.geometry.location)
        map.setZoom(17)
      }
    })

    const displaySuggestions = (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        alert(status)
        return
      }
      if (!equals(allOptions, predictions)) {
        setAllOptions(predictions)
      }
    }

    const initService = (() => {
      const service = new window.google.maps.places.AutocompleteService()
      service.getQueryPredictions({ input: addressRef.current.value }, displaySuggestions)
    })()
  }

  useEffect(() => {
    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiConfig.ENV_GOOGLE_MAPS_APIKEY}&libraries=places`
    window.document.body.appendChild(googleMapScript)
    googleMapScript.addEventListener('load', () => {
      googleMap.current = initMap()
    })
  })

  return <div id="google-map" ref={googleMapRef} />
}
export default GoogleMaps
