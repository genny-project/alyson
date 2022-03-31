import 'app/layouts/components/css/hide-scroll.css'
import { Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { Grid, GridItem } from '@chakra-ui/react'
import {
  internshipDetails,
  prefs,
  recentEmployment,
} from 'app/SBE/detail-profile/detail-layout/intern/templates/AttributesList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { map } from 'ramda'
import { useColorModeValue } from '@chakra-ui/color-mode'
import GetAttributeName from 'utils/helpers/get-attribute-name'

export const InternshipPreferenceSection = ({ beCode, pcm, mappedPcm }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')
  if (pcm) {
    const { PRI_LOC12, PRI_LOC13, PRI_LOC14, PRI_LOC15, PRI_LOC16 } = mappedPcm

    return (
      <Center w="full">
        <Card p={6} w="full" bg={cardBg} overflow="hidden" borderRadius="2rem">
          <VStack align="start" spacing={7}>
            <HStack spacing={5} w="full">
              {prefs?.icon}
              <Text textStyle="body.1">{prefs?.header}</Text>
            </HStack>
            <Grid w="100%" templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)" gap={6}>
              <GridItem rowSpan={1} colSpan={1}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC12} config={{ textStyle: 'tail.2' }} />
                  <Attribute
                    code={beCode}
                    attribute={PRI_LOC12}
                    config={{ detailViewTags: true }}
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={2} colSpan={4}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC13} config={{ textStyle: 'tail.2' }} />
                  <Attribute
                    code={beCode}
                    attribute={PRI_LOC13}
                    config={{ px: '0px', noOfLines: 5 }}
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC14} config={{ textStyle: 'tail.2' }} />
                  <Attribute
                    code={beCode}
                    attribute={PRI_LOC14}
                    config={{ noOfLines: 1, detailViewTags: true }}
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC15} config={{ textStyle: 'tail.2' }} />
                  <Attribute
                    code={beCode}
                    attribute={PRI_LOC15}
                    config={{ detailViewTags: true }}
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC16} config={{ textStyle: 'tail.2' }} />
                  <Attribute
                    code={beCode}
                    attribute={PRI_LOC16}
                    config={{ detailViewTags: true }}
                  />
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Card>
      </Center>
    )
  }
  return (
    <Center w="full">
      <Card p={6} w="full" bg={cardBg} overflow="hidden" borderRadius="2rem">
        <VStack align="start" spacing={7}>
          <HStack spacing={5} w="full">
            {prefs?.icon}
            <Text textStyle="body.1">{prefs?.header}</Text>
          </HStack>
          <Grid w="100%" templateRows="repeat(3, 1fr)" templateColumns="repeat(5, 1fr)" gap={6}>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Industry`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INDUSTRY__PRI_NAME`}
                  config={{ detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={4}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Career Objectives`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`PRI_CAREER_OBJ`}
                  config={{ px: '0px', noOfLines: 5 }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Specialisation`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_OCCUPATION__PRI_NAME`}
                  config={{ noOfLines: 1, detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Proficient Software`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_CURRENT_SOFTWARE__PRI_NAME`}
                  config={{ detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Software would like experience in`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_FUTURE_SOFTWARE__PRI_NAME`}
                  config={{ detailViewTags: true }}
                />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Card>
    </Center>
  )
}

export const InternshipSection = ({ beCode, pcm, mappedPcm }) => {
  const cardBg = useColorModeValue('blue.200', 'gray.600')

  if (pcm) {
    const { PRI_LOC17, PRI_LOC18, PRI_LOC19, PRI_LOC20 } = mappedPcm

    const internshipDetails = {
      header: 'Internship Specifications',
      icon: <FontAwesomeIcon size="lg" icon={faCalendarAlt} />,
      attributes: [
        { attr: PRI_LOC17 },
        { attr: PRI_LOC18 },
        { attr: PRI_LOC19 },
        { attr: PRI_LOC20, config: { detailViewTags: true } },
      ],
    }
    return (
      <Center w="full">
        <Card minH="9rem" p={6} w="full" bg={cardBg} overflow="hidden" borderRadius="2rem">
          <VStack align="start" spacing={7}>
            <HStack spacing={5} w="full">
              {internshipDetails?.icon}
              <Text textStyle="body.1">{internshipDetails?.header}</Text>
            </HStack>
            <HStack w="full" justifyContent="space-between" align="start">
              {map(({ label, attr, config }) => {
                return (
                  <VStack key={`${beCode}-${attr}`} align="start" justify="start">
                    <GetAttributeName attribute={attr} config={config} textStyle="tail.2" />

                    <Attribute code={beCode} attribute={attr} config={config} />
                  </VStack>
                )
              })(internshipDetails.attributes)}
            </HStack>
          </VStack>
        </Card>
      </Center>
    )
  }

  return (
    <Center w="full">
      <Card minH="9rem" p={6} w="full" bg={cardBg} overflow="hidden" borderRadius="2rem">
        <VStack align="start" spacing={7}>
          <HStack spacing={5} w="full">
            {internshipDetails?.icon}
            <Text textStyle="body.1">{internshipDetails?.header}</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between" align="start">
            {map(({ label, attr, config }) => {
              return (
                <VStack key={`${beCode}-${attr}`} align="start" justify="start">
                  <Text textStyle="tail.2">{label}</Text>
                  <Attribute code={beCode} attribute={attr} config={config} />
                </VStack>
              )
            })(internshipDetails.attributes)}
          </HStack>
        </VStack>
      </Card>
    </Center>
  )
}

export const ExperienceSection = ({ beCode, pcm, mappedPcm }) => {
  const cardBg = useColorModeValue('blue.200', 'gray.600')

  if (pcm) {
    const { PRI_LOC21, PRI_LOC22, PRI_LOC23, PRI_LOC24, PRI_LOC25 } = mappedPcm

    return (
      <Center w="full">
        <Card minH="13rem" p={6} w="full" bg={cardBg} overflow="hidden" borderRadius="2rem">
          <VStack align="start" spacing={7}>
            <HStack spacing={5} w="full">
              {recentEmployment?.icon}
              <Text textStyle="body.1">{recentEmployment?.header}</Text>
            </HStack>
            <Grid w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={6}>
              <GridItem rowSpan={1} colSpan={1}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC21} config={{ textStyle: 'tail.2' }} />
                  <Attribute code={beCode} attribute={PRI_LOC21} />
                </VStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC22} config={{ textStyle: 'tail.2' }} />
                  <Attribute code={beCode} attribute={PRI_LOC22} />
                </VStack>
              </GridItem>
              <GridItem rowSpan={2} colSpan={2}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC23} config={{ textStyle: 'tail.2' }} />
                  <Attribute
                    code={beCode}
                    attribute={PRI_LOC23}
                    config={{ px: '0px', noOfLines: 6 }}
                  />
                </VStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC24} config={{ textStyle: 'tail.2' }} />
                  <Attribute code={beCode} attribute={PRI_LOC24} />
                </VStack>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <VStack align="start">
                  <GetAttributeName attribute={PRI_LOC25} config={{ textStyle: 'tail.2' }} />
                  <Attribute
                    code={beCode}
                    attribute={PRI_LOC25}
                    config={{ noOfLines: 2, detailViewTags: true }}
                  />
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Card>
      </Center>
    )
  }

  return (
    <Center w="full">
      <Card minH="13rem" p={6} w="full" bg={cardBg} overflow="hidden" borderRadius="2rem">
        <VStack align="start" spacing={7}>
          <HStack spacing={5} w="full">
            {recentEmployment?.icon}
            <Text textStyle="body.1">{recentEmployment?.header}</Text>
          </HStack>
          <Grid w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(4, 1fr)" gap={6}>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Job Title`}</Text>
                <Attribute code={beCode} attribute={`PRI_PREV_JOB_TITLE`} />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Tenure`}</Text>
                <Attribute code={beCode} attribute={`PRI_PREV_PERIOD`} />
              </VStack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Description`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`PRI_PREV_DESCRIPTION`}
                  config={{ px: '0px', noOfLines: 6 }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Company Name`}</Text>
                <Attribute code={beCode} attribute={`PRI_PREV_EMPLOYER`} />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Industry`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERN_PREV_INDUSTRY__PRI_NAME`}
                  config={{ noOfLines: 2, detailViewTags: true }}
                />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Card>
    </Center>
  )
}
