import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faCalendarAlt,
  faCog,
  faFile,
  faGraduationCap,
  faUser,
  faPlus,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'

import { Button, Box, Text, VStack, Center, HStack, Spacer } from '@chakra-ui/react'
import Rating from 'app/DTT/rating'
import Attribute from 'app/BE/attribute'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { find, includes, reduce } from 'ramda'
import Action from 'app/BE/context/Action'

const DefaultTemplate = ({ sbeCode, targetCode, mappedPcm }) => {
  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC5,
    PRI_LOC6,
    PRI_LOC7,
    PRI_LOC8,
  } = mappedPcm
  return (
    <Box h="90vh" bg="tomato">
      <Center>
        <VStack w="1166px" bg="silver">
          <HStack w="100%" h="227px" bg="white" p="2" spacing="5">
            <Attribute
              config={{
                width: '189px',
                height: '190px',
              }}
              code={targetCode}
              attribute={PRI_LOC1}
            />
            <VStack spacing="1" alignItems="flex-start">
              <Attribute
                config={{
                  alignSelf: 'start',
                  fontSize: '24px',
                  fontWeight: '700',
                  fontStyle: 'normal',
                }}
                code={targetCode}
                attribute={PRI_LOC2}
              />

              <Attribute
                config={{
                  alignSelf: 'start',
                  fontSize: '18px',
                  fontWeight: 400,
                  fontStyle: 'normal',
                }}
                code={targetCode}
                attribute={PRI_LOC3}
              />
              <Attribute
                config={{
                  alignSelf: 'start',
                  fontSize: '16px',
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  opacity: '0.5',
                }}
                code={targetCode}
                attribute={PRI_LOC3}
              />
              <Rating.Write />
              <HStack>
                <Action
                  parentCode={sbeCode}
                  code={PRI_LOC8}
                  targetCode={targetCode}
                  noMenu
                  icon={faPlus}
                  customAction
                />
                <Button borderRadius="32px" variant="outline" colorScheme="primary">
                  {`Download CV`}
                </Button>
              </HStack>
            </VStack>
            <Spacer />
            <VStack alignItems="start" background="red" spacing="5">
              <HStack spacing="2">
                <FontAwesomeIcon icon={faPhoneAlt} fixedWidth color="#1A3B64" />

                <Attribute
                  config={{
                    fontSize: '16px',
                    color: '#3182CE',
                  }}
                  code={targetCode}
                  attribute={PRI_LOC5}
                />
              </HStack>
              <HStack>
                <FontAwesomeIcon icon={faEnvelope} fixedWidth color="#1A3B64" />
                <Attribute
                  config={{
                    fontSize: '16px',
                    color: '#3182CE',
                  }}
                  code={targetCode}
                  attribute={PRI_LOC5}
                />
              </HStack>
              <HStack>
                <FontAwesomeIcon icon={faMapMarkerAlt} fixedWidth color="#1A3B64" />
                <Attribute
                  config={{
                    fontSize: '16px',
                    color: '#3182CE',
                    hideIcon: true,
                  }}
                  code={targetCode}
                  attribute={PRI_LOC6}
                />
              </HStack>
              <HStack>
                <FontAwesomeIcon icon={faGraduationCap} fixedWidth color="#1A3B64" />
                <Attribute
                  config={{
                    fontSize: '16px',
                    color: '#3182CE',
                  }}
                  code={targetCode}
                  attribute={PRI_LOC7}
                />
              </HStack>
            </VStack>
          </HStack>

          <Text>{` 2nd paragraph `}</Text>
        </VStack>
      </Center>
    </Box>
  )
}

const Intern = ({ sbeCode, targetCode }) => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const internProfile = find(includes('_INTERN_PROFILE'))(allPcmCode)
  const internProfilePCM = useSelector(selectCode(internProfile, 'allAttributes'))
  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(internProfilePCM || [])

  const { PRI_TEMPLATE_CODE: code } = mappedPcm

  console.log('mappd pcm ====>', { sbeCode, targetCode, mappedPcm })

  if (internProfilePCM) {
    if (code === 'TPL_WEST')
      return <DefaultTemplate targetCode={targetCode} mappedPcm={mappedPcm} />

    if (code === 'TPL_WEST_TWO')
      return <DefaultTemplate targetCode={targetCode} mappedPcm={mappedPcm} />
  }

  return <DefaultTemplate sbeCode={sbeCode} targetCode={targetCode} mappedPcm={mappedPcm} />
}

export default Intern
