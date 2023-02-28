import { addItemBackgroundColourInternmatch, addItemIconColourInternmatch } from 'utils/constants'

import { Button } from '@chakra-ui/react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AskMenu from 'app/ASKS/menu'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import { useIsMobile } from 'utils/hooks'

const TemplateAddItems = ({ mappedPcm }) => {
  const isMobile = useIsMobile()
  const isProductInternmatch = useIsProductInternmatch()

  const { PRI_QUESTION_CODE } = mappedPcm

  return (
    <AskMenu
      questionCode={PRI_QUESTION_CODE}
      icon={
        <Button
          colorScheme="primary"
          border={`1px solid red`}
          leftIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          {`Add`}
        </Button>
      }
      hideLabel={true}
      productSpecificIconBackgroundColour={
        isProductInternmatch ? addItemBackgroundColourInternmatch : null
      }
      productSpecificIconColour={
        isMobile && isProductInternmatch
          ? 'white'
          : isProductInternmatch
          ? addItemIconColourInternmatch
          : null
      }
      iconBorder={
        isMobile && isProductInternmatch
          ? `1px solid white`
          : isProductInternmatch
          ? `2px solid ${addItemIconColourInternmatch}`
          : '0 none'
      }
      iconShadow={isProductInternmatch ? 'drop-shadow(0px 2px 6px rgb(0 0 0 / 0.14))' : 'initial'}
    />
  )
}

export default TemplateAddItems
