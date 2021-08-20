import { map } from 'ramda'
import { Grid, GridItem } from '@chakra-ui/react'
import { Center, VStack, HStack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'

import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import {
  prefs,
  internshipDetails,
  recentEmployment,
} from 'app/SBE/detail-profile/detail-layout/intern/templates/AttributesList.js'

export const InternshipPreferenceSection = ({ beCode }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')
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
                  attribute={`_LNK_INTERN_PREV_INDUSTRY__PRI_NAME`}
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

export const InternshipSection = ({ beCode }) => {
  const cardBg = useColorModeValue('blue.200', 'gray.600')
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
                <VStack align="start" justify="start">
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

export const ExperienceSection = ({ beCode }) => {
  const cardBg = useColorModeValue('blue.200', 'gray.600')
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
                <Attribute code={beCode} attribute={`PRI_PREV_DURATION`} />
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
