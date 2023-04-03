import { Box, Grid } from '@chakra-ui/react'

import PcmField from 'app/PCM/components/pcm-field'
import useGetMappedPcm from 'app/PCM/helpers/get-mapped-pcm'
import FormAsk from 'app/PCM/templates/tpl-form/form-ask'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'

const TemplateSubmitApplication = ({ mappedPcm, depth, ...rest }) => {
  const isMobile = useIsMobile()
  const pcmCode = mappedPcm?.PRI_LOC1

  const applicationFormCode = useSelector(selectCode(pcmCode, 'PRI_LOC1'))?.value || ''
  const applicationQuestionCode =
    useSelector(selectCode(applicationFormCode, 'PRI_QUESTION_CODE'))?.value || ''

  const signaturePcmCode = useSelector(selectCode(pcmCode, 'PRI_LOC2'))?.value || ''
  const signatureMappedPcm = useGetMappedPcm(signaturePcmCode)

  const { PRI_LOC1, PRI_LOC2 } = signatureMappedPcm

  return (
    <Grid templateColumns={isMobile ? '1fr' : '1fr 1fr'} placeItems={'center'} gap={'1rem'}>
      <Box
        w={'full'}
        position={'relative'}
        isolation={'isolate'}
        bg={'#FFF6F0'}
        paddingInlineEnd={4}
        _after={{
          content: '""',
          position: 'absolute',
          top: '-2.25rem',
          left: isMobile ? '-2.5rem' : 'auto',
          right: '0',
          w: isMobile ? '100vw' : 'calc(100% + clamp(1.25rem, 5vw, 7.5rem))',
          h: 'calc(100% + 5rem)',
          bg: '#FFF6F0',
          zIndex: '-1',
        }}
      >
        <FormAsk
          first={true}
          questionCode={applicationQuestionCode}
          parentCode={applicationQuestionCode}
          level={0}
          properties={rest}
          config={{
            customBgColor: 'white',
            submitApplication: true,
          }}
        />
      </Box>

      <Box
        position={'relative'}
        zIndex={2}
        bg={'white'}
        w={'full'}
        h={'full'}
        paddingInlineEnd={4}
        display={'flex'}
        justifyContent={'center'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        flexDirection={'column'}
        isolation={'isolate'}
        _after={{
          content: '""',
          position: 'absolute',
          top: isMobile ? '0' : '-2.25rem',
          left: isMobile ? '-2.5rem' : 'auto',
          right: '0',
          w: isMobile ? '100vw' : '100%',
          h: 'calc(100% + 5rem)',
          bg: '#fff',
          zIndex: '-1',
        }}
      >
        <PcmField code={PRI_LOC1} mappedPcm={signatureMappedPcm} />
        <PcmField
          code={PRI_LOC2}
          mappedPcm={signatureMappedPcm}
          config={{ customBgColor: '#f4f5f6', fontWeight: '700' }}
        />

        <FormAsk
          first={true}
          questionCode={'QUE_SUBMIT'}
          parentCode={'QUE_SUBMIT'}
          level={0}
          properties={rest}
        />
      </Box>
    </Grid>
  )
}

export default TemplateSubmitApplication
