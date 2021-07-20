import { Grid, GridItem } from '@chakra-ui/react'
import { Center, VStack, HStack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'

import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import {
  internshipDetails,
  companyDetails,
} from 'app/SBE/detail-profile/detail-layout/internship/templates/AttributesList.js'

export const InternshipDetailsSection = ({ beCode }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')
  return (
    <Center w="full">
      <Card p={6} w="full" bg={cardBg} overflow="hidden" borderRadius="2rem">
        <VStack align="start" spacing={7}>
          <HStack spacing={5} w="full">
            {internshipDetails?.icon}
            <Text textStyle="body.1">{internshipDetails?.header}</Text>
          </HStack>
          <Grid
            h="16rem"
            w="100%"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={6}
          >
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Industry`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`PRI_ASSOC_INDUSTRY`}
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
                  attribute={`PRI_ASSOC_OCCUPATION`}
                  config={{ noOfLines: 1, detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Proficient Software`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`PRI_ASSOC_CURRENT_SOFTWARE`}
                  config={{ detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Software would like experience in`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`PRI_ASSOC_FUTURE_SOFTWARE`}
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

export const CompanyDetailsSection = ({ beCode }) => {
  const cardBg = useColorModeValue('blue.200', 'gray.600')
  return (
    <Center w="full">
      <Card minH="13rem" p={6} w="full" bg={cardBg} overflow="hidden" borderRadius="2rem">
        <VStack align="start" spacing={7}>
          <HStack spacing={5} w="full">
            {companyDetails?.icon}
            <Text textStyle="body.1">{companyDetails?.header}</Text>
          </HStack>
          <Grid h="15rem" w="100%" templateRows="repeat(3, 1fr)" templateColumns="repeat(3, 1fr)">
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Company Name`}</Text>
                <Attribute code={beCode} attribute={`_LNK_HOST_COMPANY__PRI_NAME`} />
              </VStack>
            </GridItem>
            <GridItem rowSpan={3} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`About the Company`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_HOST_COMPANY__PRI_COMPANY_DESCRIPTION`}
                  config={{ px: '0px', noOfLines: 8 }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Industry`}</Text>
                <Attribute code={beCode} attribute={`PRI_ASSOC_INDUSTRY`} />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Location`}</Text>
                <Attribute code={beCode} attribute={`PRI_ADDRESS_FULL`} />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Card>
    </Center>
  )
}
