import { faPlus } from '@fortawesome/free-solid-svg-icons'

import {
  Button,
  Box,
  Text,
  VStack,
  Center,
  HStack,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import Rating from 'app/DTT/rating'
import Attribute from 'app/BE/attribute'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { find, includes, reduce } from 'ramda'
import IndividualAction from 'app/SBE/detail/helpers/individual-action.js'
import GetIconstBasedOnAttributes from 'app/SBE/detail/helpers/get-icons-based-on-attributes.js'

const InternProfileTemplateOne = ({ parentCode, targetCode, mappedPcm }) => {
  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC5,
    PRI_LOC6,
    PRI_LOC7,
    PRI_LOC8,
    PRI_LOC9,
  } = mappedPcm
  return (
    <Center>
      <VStack w="1166px">
        <HStack w="100%" h="227px" bg="#F6F6F6" p="2" spacing="5">
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
              attribute={PRI_LOC4}
            />
            <Rating.Write />
            <HStack>
              <IndividualAction
                parentCode={parentCode}
                targetCode={targetCode}
                code={PRI_LOC9}
                noMenu
                customAction
              />
              <Button borderRadius="32px" variant="outline" colorScheme="primary">
                {`Download CV`}
              </Button>
            </HStack>
          </VStack>
          <Spacer />
          <VStack alignItems="start" spacing="5">
            <HStack spacing="2">
              <GetIconstBasedOnAttributes
                code={targetCode}
                attributeCode={PRI_LOC5}
                config={{ color: '#1A3B64' }}
              />
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
              <GetIconstBasedOnAttributes
                code={targetCode}
                attributeCode={PRI_LOC6}
                config={{ color: '#1A3B64' }}
              />
              <Attribute
                config={{
                  fontSize: '16px',
                  color: '#3182CE',
                }}
                code={targetCode}
                attribute={PRI_LOC6}
              />
            </HStack>
            <HStack>
              <GetIconstBasedOnAttributes
                code={targetCode}
                attributeCode={PRI_LOC7}
                config={{ color: '#1A3B64' }}
              />
              <Attribute
                config={{
                  fontSize: '16px',
                  color: '#3182CE',
                  hideIcon: true,
                }}
                code={targetCode}
                attribute={PRI_LOC7}
              />
            </HStack>
            <HStack>
              <GetIconstBasedOnAttributes
                code={targetCode}
                attributeCode={PRI_LOC8}
                config={{ color: '#1A3B64' }}
              />
              <Attribute
                config={{
                  fontSize: '16px',
                  color: '#3182CE',
                }}
                code={targetCode}
                attribute={PRI_LOC8}
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Center>
  )
}

const InternProfileTemplateTwo = ({ parentCode, targetCode, mappedPcm }) => {
  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC5,
    PRI_LOC6,
    PRI_LOC7,
    PRI_LOC8,
    PRI_LOC9,
  } = mappedPcm
  return (
    <Box h="90vh">
      <VStack w="1166px">
        <HStack w="100%" h="227px" bg="#F6F6F6" p="2" spacing="5">
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
              attribute={PRI_LOC4}
            />
            <Rating.Write />
            <HStack>
              <IndividualAction
                parentCode={parentCode}
                targetCode={targetCode}
                code={PRI_LOC9}
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
          <VStack alignItems="start" spacing="5">
            <HStack spacing="2">
              <GetIconstBasedOnAttributes attributeCode={PRI_LOC5} config={{ color: '#1A3B64' }} />
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
              <GetIconstBasedOnAttributes attributeCode={PRI_LOC6} config={{ color: '#1A3B64' }} />
              <Attribute
                config={{
                  fontSize: '16px',
                  color: '#3182CE',
                }}
                code={targetCode}
                attribute={PRI_LOC6}
              />
            </HStack>
            <HStack>
              <GetIconstBasedOnAttributes attributeCode={PRI_LOC7} config={{ color: '#1A3B64' }} />
              <Attribute
                config={{
                  fontSize: '16px',
                  color: '#3182CE',
                  hideIcon: true,
                }}
                code={targetCode}
                attribute={PRI_LOC7}
              />
            </HStack>
            <HStack>
              <GetIconstBasedOnAttributes attributeCode={PRI_LOC8} config={{ color: '#1A3B64' }} />
              <Attribute
                config={{
                  fontSize: '16px',
                  color: '#3182CE',
                }}
                code={targetCode}
                attribute={PRI_LOC8}
              />
            </HStack>
          </VStack>
        </HStack>

        <Text>{`  `}</Text>
      </VStack>
    </Box>
  )
}

const DefaultInternProfileTemplate = ({ parentCode, targetCode, mappedPcm }) => {
  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC5,
    PRI_LOC6,
    PRI_LOC7,
    PRI_LOC8,
    PRI_LOC9,
  } = mappedPcm
  return (
    <Box h="90vh">
      <Center>
        <VStack w="1166px">
          <HStack w="100%" h="227px" bg="#F6F6F6" p="2" spacing="5">
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
                attribute={PRI_LOC4}
              />
              <Rating.Write />
              <HStack>
                <IndividualAction
                  parentCode={parentCode}
                  targetCode={targetCode}
                  code={PRI_LOC9}
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
            <VStack alignItems="start" spacing="5">
              <HStack spacing="2">
                <GetIconstBasedOnAttributes
                  attributeCode={PRI_LOC5}
                  config={{ color: '#1A3B64' }}
                />
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
                <GetIconstBasedOnAttributes
                  attributeCode={PRI_LOC6}
                  config={{ color: '#1A3B64' }}
                />
                <Attribute
                  config={{
                    fontSize: '16px',
                    color: '#3182CE',
                  }}
                  code={targetCode}
                  attribute={PRI_LOC6}
                />
              </HStack>
              <HStack>
                <GetIconstBasedOnAttributes
                  attributeCode={PRI_LOC7}
                  config={{ color: '#1A3B64' }}
                />
                <Attribute
                  config={{
                    fontSize: '16px',
                    color: '#3182CE',
                    hideIcon: true,
                  }}
                  code={targetCode}
                  attribute={PRI_LOC7}
                />
              </HStack>
              <HStack>
                <GetIconstBasedOnAttributes
                  attributeCode={PRI_LOC8}
                  config={{ color: '#1A3B64' }}
                />
                <Attribute
                  config={{
                    fontSize: '16px',
                    color: '#3182CE',
                  }}
                  code={targetCode}
                  attribute={PRI_LOC8}
                />
              </HStack>
            </VStack>
          </HStack>

          <Text>{`  `}</Text>
        </VStack>
      </Center>
    </Box>
  )
}

const DefaultTemplateTwo = () => {
  return (
    <Tabs alignSelf="flex-start" w="100%" variant="line">
      <TabList>
        <Tab>{`Profile`}</Tab>
        <Tab>{`Applications`}</Tab>
        <Tab>{`Notes`}</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>{`Profile`}</p>
        </TabPanel>
        <TabPanel>
          <p>{`Applications`}</p>
        </TabPanel>
        <TabPanel>
          <p>{`Notes`}</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
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

  if (internProfilePCM) {
    if (code === 'TPL_INTERN')
      return (
        <Box h="90vh">
          <Center>
            <VStack>
              <InternProfileTemplateOne
                parentCode={sbeCode}
                targetCode={targetCode}
                mappedPcm={mappedPcm}
              />
              <DefaultTemplateTwo />
            </VStack>
          </Center>
        </Box>
      )

    if (code === 'TPL_INTERN_TWO')
      return (
        <InternProfileTemplateTwo
          parentCode={sbeCode}
          targetCode={targetCode}
          mappedPcm={mappedPcm}
        />
      )
  }

  return <DefaultInternProfileTemplate />
}

export default Intern
