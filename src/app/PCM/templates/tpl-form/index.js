import { Center, CircularProgress } from '@chakra-ui/react'
import AsksForm from 'app/ASKS/form'

const TemplateForm = ({ mappedPcm }) => {
  const { PRI_QUESTION_CODE } = mappedPcm

  if (PRI_QUESTION_CODE) {
    return <AsksForm layout="full" questionCode={PRI_QUESTION_CODE} />
  } else {
    console.error('Attempting to display a TPL_FORM for a PCM without a question code!')
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    )
  }
}

export default TemplateForm
