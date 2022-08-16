import { Button } from '@chakra-ui/react'

import AskMenu from 'app/ASKS/menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const TemplateAddItems = ({ mappedPcm }) => {
  const { PRI_QUESTION_CODE } = mappedPcm

  return (
    <AskMenu
      questionCode={PRI_QUESTION_CODE}
      icon={<Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>{`Add`}</Button>}
      hideLabel={true}
    />
  )
}

export default TemplateAddItems
