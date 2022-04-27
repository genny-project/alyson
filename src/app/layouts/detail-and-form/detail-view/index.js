import { Grid, Spacer, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { find, includes, reduce } from 'ramda'

import Attribute from 'app/BE/attribute'
import Details from './Details'
import { selectCode } from 'redux/db/selectors'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

const DefaultTemplate = ({ beCode, name, video, bg, mappedPcm, miniCard, cardsbg }) => {
  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC7,
    PRI_LOC8,
    PRI_LOC9,
    PRI_LOC10,
  } = mappedPcm

  return (
    <Grid bg={bg} spacing={4} p="5" overflowY="auto" top="10vh" gap={'1em'} rounded={'md'}>
      {video ? (
        <Grid
          justifyContent="space-between"
          bg="gradient.900"
          mb={2}
          templateColumns={'200px 2fr'}
          gap={'1rem'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <VStack justifyContent="center" spacing={5} m="auto" paddingX={'0.5rem'}>
            <Attribute config={{ size: 'xl', name: name }} code={beCode} attribute={PRI_LOC1} />
            <Attribute config={{ textStyle: 'head.3' }} code={beCode} attribute={PRI_LOC3} />
          </VStack>
          <VStack>
            <Attribute code={beCode} attribute={PRI_LOC2} />
          </VStack>
        </Grid>
      ) : (
        <VStack mb={5}>
          <Attribute config={{ size: 'xl', name: name }} code={beCode} attribute={PRI_LOC1} />
          <Spacer />
          <Attribute config={{ textStyle: 'head.3' }} code={beCode} attribute={PRI_LOC3} />
        </VStack>
      )}
      <Grid
        w={'100%'}
        alignItems="flex-start"
        templateColumns={'repeat(auto-fit, minmax(10rem, 1fr))'}
        gap={'1em'}
      >
        <VStack
          boxShadow="base"
          rounded="md"
          p="5"
          w={'100%'}
          alignItems="flex-start"
          bg={cardsbg}
          minH={miniCard ? '17rem' : 'inherit'}
          flex="1 1 10rem"
          height={'100%'}
        >
          <Text textStyle="head.2" mb={5}>
            {'Personal Details'}
          </Text>
          <Details label="First Name" locationCode={PRI_LOC3} currentMentor={beCode} miniCard />
          <Details label="Last Name" locationCode={PRI_LOC4} currentMentor={beCode} miniCard />
          <Details label="Gender" locationCode={PRI_LOC9} currentMentor={beCode} miniCard />
        </VStack>

        <VStack
          boxShadow="base"
          rounded="md"
          p="5"
          w={'100%'}
          alignItems="flex-start"
          bg={cardsbg}
          minH={miniCard ? '17rem' : 'inherit'}
          flex="1 1 10rem"
          height={'100%'}
        >
          <Text textStyle="head.2" mb={5}>
            {'Professional Details'}
          </Text>

          <Details label="LinkedIn" locationCode={PRI_LOC7} currentMentor={beCode} miniCard />
          <Details label="Hobbies" locationCode={PRI_LOC10} currentMentor={beCode} miniCard />
        </VStack>
      </Grid>
      <VStack
        boxShadow="base"
        rounded="md"
        p="5"
        w={'100%'}
        alignItems="flex-start"
        bg={cardsbg}
        minH={miniCard ? '17rem' : 'inherit'}
        flex="1 1 10rem"
        height={'100%'}
      >
        <Text textStyle="head.2" mb={5}>
          {'What I am interested from the mentorship'}
        </Text>

        <Details label="" locationCode={PRI_LOC8} currentMentor={beCode} miniCard />
      </VStack>
    </Grid>
  )
}

const TemplateOne = ({ beCode, name, video, bg, mappedPcm, miniCard, cardsbg }) => {
  const {
    PRI_LOC1,
    PRI_LOC2,
    PRI_LOC3,
    PRI_LOC4,
    PRI_LOC7,
    PRI_LOC8,
    PRI_LOC9,
    PRI_LOC10,
  } = mappedPcm

  const templateColumns = useMobileValue(['1fr', '200px 2fr'])

  return (
    <Grid bg={bg} spacing={4} p="5" overflowY="auto" top="10vh" gap={'1em'} rounded={'md'}>
      {video ? (
        <Grid
          justifyContent="space-between"
          bg="gradient.900"
          mb={2}
          templateColumns={templateColumns}
          gap={'1rem'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <VStack justifyContent="center" spacing={5} m="auto" paddingX={'0.5rem'}>
            <Attribute config={{ size: 'xl', name: name }} code={beCode} attribute={PRI_LOC1} />
            <Attribute config={{ textStyle: 'head.3' }} code={beCode} attribute={PRI_LOC3} />
          </VStack>
          <VStack>
            <Attribute code={beCode} attribute={PRI_LOC2} />
          </VStack>
        </Grid>
      ) : (
        <VStack mb={5}>
          <Attribute config={{ size: 'xl', name: name }} code={beCode} attribute={PRI_LOC1} />
          <Spacer />
          <Attribute config={{ textStyle: 'head.3' }} code={beCode} attribute={PRI_LOC3} />
        </VStack>
      )}
      <Grid
        w={'100%'}
        alignItems="flex-start"
        templateColumns={'repeat(auto-fit, minmax(10rem, 1fr))'}
        gap={'1em'}
      >
        <VStack
          boxShadow="base"
          rounded="md"
          p="5"
          w={'100%'}
          alignItems="flex-start"
          bg={cardsbg}
          minH={miniCard ? '17rem' : 'inherit'}
          flex="1 1 10rem"
          height={'100%'}
        >
          <Text textStyle="head.2" mb={5}>
            {'Personal Details'}
          </Text>
          <Details label="First Name" locationCode={PRI_LOC3} currentMentor={beCode} />
          <Details label="Last Name" locationCode={PRI_LOC4} currentMentor={beCode} />
          <Details label="Gender" locationCode={PRI_LOC9} currentMentor={beCode} />
        </VStack>

        <VStack
          boxShadow="base"
          rounded="md"
          p="5"
          w={'100%'}
          alignItems="flex-start"
          bg={cardsbg}
          minH={miniCard ? '17rem' : 'inherit'}
          flex="1 1 10rem"
          height={'100%'}
        >
          <Text textStyle="head.2" mb={5}>
            {'Professional Details'}
          </Text>

          <Details label="LinkedIn" locationCode={PRI_LOC7} currentMentor={beCode} />
          <Details label="Hobbies" locationCode={PRI_LOC10} currentMentor={beCode} />
        </VStack>
      </Grid>
      <VStack
        boxShadow="base"
        rounded="md"
        p="5"
        w={'100%'}
        alignItems="flex-start"
        bg={cardsbg}
        minH={miniCard ? '17rem' : 'inherit'}
        flex="1 1 10rem"
        height={'100%'}
      >
        <Text textStyle="head.2" mb={5}>
          {'What I am interested from the mentorship'}
        </Text>

        <Details label="" locationCode={PRI_LOC8} currentMentor={beCode} />
      </VStack>
    </Grid>
  )
}

const DetailView = ({ beCode }) => {
  const allPcmCode = useSelector(selectCode(`PCMINFORMATION`)) || []
  const detailViewPcmCode = find(includes('_MENTEE_DETAIL'))(allPcmCode)

  const detailViewPcm = useSelector(selectCode(detailViewPcmCode, 'allAttributes'))
  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(detailViewPcm || [])

  const { PRI_TEMPLATE_CODE: code } = mappedPcm

  const bg = useColorModeValue('gray.100', 'gray.700')
  const cardsbg = useColorModeValue('#ffffff', 'gray.800')
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))?.value
  const video = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))?.value

  if (detailViewPcm) {
    if (code === 'TPL_DETAIL_VIEW') {
      return (
        <TemplateOne
          name={name}
          cardsbg={cardsbg}
          video={video}
          beCode={beCode}
          bg={bg}
          mappedPcm={mappedPcm}
        />
      )
    }
  }

  return (
    <DefaultTemplate
      name={name}
      cardsbg={cardsbg}
      video={video}
      beCode={beCode}
      bg={bg}
      mappedPcm={mappedPcm}
    />
  )
}

export default DetailView
