import AskMenu from 'app/ASKS/menu'
import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { addItemBackgroundColourInternmatch, addItemIconColourInternmatch } from 'utils/constants'
import { useIsProductInternmatch, useIsProductLojing } from 'utils/helpers/check-product-name'

const TemplateAddItems = ({ mappedPcm }) => {
  const isProductInternmatch = useIsProductInternmatch()
  const isProductLojing = useIsProductLojing()

  const { PRI_QUESTION_CODE } = mappedPcm
  return (
    <AskMenu
      questionCode={PRI_QUESTION_CODE}
      icon={
        <Button colorScheme="primary" leftIcon={<FontAwesomeIcon icon={faPlus} />}>
          {`Add`}
        </Button>
      }
      hideLabel={true}
      productSpecificIconBackgroundColour={
        isProductInternmatch ? addItemBackgroundColourInternmatch : null
      }
      productSpecificIconColour={isProductInternmatch ? addItemIconColourInternmatch : null}
    />
  )
}

export default TemplateAddItems
