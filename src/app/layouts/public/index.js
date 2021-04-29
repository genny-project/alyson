import { useEffect, useRef } from 'react'
import { Box, Heading, HStack, VStack, Image, Text, Center } from '@chakra-ui/react'
import Map from './public_search/Map'
import Search from './public_search/PublicSearch'
// import Filters from 'app/SBE/filters'
import { Button } from '@chakra-ui/button'

let gMap

const Public = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    gMap = new window.google.maps.Map(mapRef.current, {
      zoom: 3,
      center: { lat: -10, lng: 140 },
      disableDefaultUI: true,
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        gMap.setCenter(geolocation)
      })
    }
  }, [])

  return (
    <Box pt="5">
      <VStack
        style={{ left: '10vw', right: '10vw', top: 30 }}
        position="fixed"
        borderRadius="3xl"
        bg="rgba(0, 51, 102,0.3)"
        p="5"
        spacing="5"
      >
        <Image src="logo512.png" htmlWidth="512px" />
        <Heading color="blackAlpha.800">The worlds number 1 internship platform</Heading>
        <Search />
        {/* <Filters /> */}
        <HStack>
          <a href="https://internmatch.io/sign-up/">
            <Button variant="solid" colorScheme="teal">
              Sign up
            </Button>
          </a>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              window.location.pathname = '/home'
              localStorage.removeItem('state')
            }}
          >
            Login
          </Button>
        </HStack>
      </VStack>

      <VStack
        style={{ left: '10vw', right: '10vw', bottom: 30 }}
        position="fixed"
        borderRadius="3xl"
        bg="rgba(0, 51, 102,0.3)"
        p="5"
        spacing="5"
      >
        <Text fontSize="2xl" fontWeight="medium">
          Proudly supported by
        </Text>
        <Center w="full">
          <HStack>
            {[
              'mandela.png',
              'study_nsw.png',
              'study_melbourne.png',
              'launchvic.png',
              'nsw_government.png',
              'rotary.png',
            ].map(src => (
              <Image src={`logos/${src}`} maxH="7vw" borderRadius="lg" mb="3" />
            ))}
          </HStack>
        </Center>
      </VStack>

      {/* <Cards parentCode={table} /> */}
      <Map map={gMap} />
      <Box position="fixed" w="100vw" h="100vh" style={{ left: 0, top: 0, zIndex: -1 }}>
        <div style={{ width: '100%', height: '100%' }} ref={mapRef} id="map" />
      </Box>
    </Box>
  )
}

export default Public
