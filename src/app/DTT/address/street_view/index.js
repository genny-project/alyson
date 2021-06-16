import { useRef, useEffect } from 'react'
import { Stack } from '@chakra-ui/react'
import { useIsMobile } from 'utils/hooks'

const StreetView = ({ address, style = { width: '45rem', height: '35rem' } }) => {
  const panoRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder()

    geocoder.geocode({ address }, res => {
      const geo = res[0]?.geometry.location

      const map = new window.google.maps.Map(mapRef.current, {
        center: geo,
        zoom: 14,
      })

      const svService = new window.google.maps.StreetViewService()
      const panoRequest = {
        location: geo,
        preference: window.google.maps.StreetViewPreference.BEST,
        radius: 100,
        source: window.google.maps.StreetViewSource.OUTDOOR,
      }

      svService.getPanorama(panoRequest, panoData => {
        map.setStreetView(
          new window.google.maps.StreetViewPanorama(panoRef.current, {
            pano: panoData?.location?.pano,
          }),
        )
      })
    })
  }, [address])

  const isMobile = useIsMobile()

  return (
    <Stack direction={['column', 'column', 'row']} style={style}>
      <div
        ref={panoRef}
        style={{ borderRadius: '0.5rem', width: isMobile ? '100%' : '50%', height: '100%' }}
      />
      <div
        ref={mapRef}
        style={{ borderRadius: '0.5rem', width: isMobile ? '100%' : '50%', height: '100%' }}
      />
    </Stack>
  )
}

export default StreetView
