import { Flex, Spacer } from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'

const topHeight = '40vh'

let map = {}
let pano = {}
let geocoder = {}

const DetailHeader = ({ address }) => {
  geocoder = new window.google.maps.Geocoder()

  const [geo, setGeo] = useState(null)

  const panoRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    geocoder.geocode({ address }, res => {
      setGeo(res[0]?.geometry.location)
    })
  }, [address])

  useEffect(() => {
    if (geo && panoRef?.current && mapRef?.current) {
      map = new window.google.maps.Map(mapRef.current, {
        center: geo,
        zoom: 12,
        disableDefaultUI: true,
      })

      pano = new window.google.maps.StreetViewPanorama(panoRef.current, {
        position: geo,
        pov: {
          heading: 34,
          pitch: 10,
        },
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      })

      new window.google.maps.Marker({
        position: geo,
        map,
      })

      map.setStreetView(pano)
    }
  }, [geo])
  return (
    <Flex>
      <div
        ref={panoRef}
        style={{
          width: '100%',
          borderTopLeftRadius: '0.5rem',
          height: topHeight,
          marginRight: '2px',
        }}
      />
      <Spacer />
      <div
        ref={mapRef}
        style={{
          borderTopRightRadius: '0.5rem',
          width: '100%',
          height: topHeight,
          marginLeft: '2px',
        }}
      />
    </Flex>
  )
}

export default DetailHeader
