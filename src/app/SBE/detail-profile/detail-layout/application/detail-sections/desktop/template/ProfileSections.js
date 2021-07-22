import { Grid, GridItem } from '@chakra-ui/react'
import { Center, VStack, HStack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'

import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import {
  internshipDetails,
  companyDetails,
} from 'app/SBE/detail-profile/detail-layout/application/templates/AttributesList.js'

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
            maxH="40rem"
            w="100%"
            templateRows="repeat(9, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={6}
          >
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Internship Specialisation`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__LNK_OCCUPATION__PRI_NAME`}
                  config={{ detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Internship Overview`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__PRI_INTERNSHIP_DETAILS`}
                  config={{ px: '0px', noOfLines: 4 }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Industry`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__LNK_INDUSTRY__PRI_NAME`}
                  config={{ noOfLines: 1, detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Internship Type`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__LNK_WORKSITE_SELECT_PRI_NAME`}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Roles & Responsibilities`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__PRI_ROLES_AND_RESPONSIBILITIES`}
                  config={{ px: '0px', noOfLines: 4 }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Internship Active from`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__PRI_INTERNSHIP_START_DATE`}
                  config={{ noOfLines: 1, detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Days available to Intern`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__PRI_WHICH_DAYS_STRIPPED`}
                  config={{ detailViewTags: true }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Expected Interpersonal Learning Outcomes`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__PRI_BASE_LEARNING_OUTCOMES`}
                  config={{ px: '0px', noOfLines: 4 }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Company Business Hours`}</Text>
                <Attribute code={beCode} attribute={`_LNK_INTERNSHIP__PRI_BUSINESS_HOURS`} />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Dress Code`}</Text>
                <Attribute code={beCode} attribute={`_LNK_INTERNSHIP__PRI_DRESS_CODE`} />
              </VStack>
            </GridItem>
            <GridItem rowSpan={2} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Expected Technical & Industry Specefic Learning Outcomes`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__PRI_SPECIFIC_LEARNING_OUTCOMES`}
                  config={{ px: '0px', noOfLines: 4 }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Available Positions`}</Text>
                <Attribute code={beCode} attribute={`_LNK_INTERNSHIP__PRI_NO_OF_INTERNS`} />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={3}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Software used during the internship`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__PRI_SOFTWARE`}
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
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__LNK_HOST_COMPANY__PRI_NAME`}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={3} colSpan={2}>
              <VStack align="start">
                <Text textStyle="tail.2">{`About the Company`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__LNK_HOST_COMPANY__PRI_COMPANY_DESCRIPTION`}
                  config={{ px: '0px', noOfLines: 8 }}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Industry`}</Text>
                <Attribute
                  code={beCode}
                  attribute={`_LNK_INTERNSHIP__LNK_HOST_COMPANY__LNK_COMPANY_INDUSTRY__PRI_NAME`}
                />
              </VStack>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <VStack align="start">
                <Text textStyle="tail.2">{`Location`}</Text>
                <Attribute code={beCode} attribute={`_LNK_INTERNSHIP__PRI_ADDRESS_FULL`} />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Card>
    </Center>
  )
}
