import {
  Box,
  Button,
  Grid,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import EvtButton from 'app/PCM/components/evt-button'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import { slice } from 'ramda'
import { INTERNMATCH_LOGO_WIDTH } from 'utils/constants'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import { onSendMessage } from 'vertx'
import DefaultSidebar from 'app/PCM/templates/tpl-sidebar-one/default'
import InternmatchSidebar from 'app/PCM/templates/tpl-sidebar-one/internmatch'

const TemplateSidebarOne = ({ mappedPcm, maxItemCount }) => {
  const isProductInternmatch = useIsProductInternmatch()

  const [maxItems, setMaxItems] = useState(maxItemCount || 6)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMaxItems = () => {
    const maxItemCount = Math.floor(window.innerHeight - 150) / 70
    setMaxItems(maxItemCount)
  }

  useEffect(() => {
    const resizeHeight = () => {
      setTimeout(() => {
        loadMaxItems()
      }, 100)
    }
    window.addEventListener('resize', resizeHeight)

    return () => {
      window.removeEventListener('resize', resizeHeight)
    }
  }, [loadMaxItems])

  const evtButtons = mapQuestionGroup((ask, question) => {
    return (
      <EvtButton
        key={ask?.attributeCode || ''}
        questionCode={mappedPcm.PRI_QUESTION_CODE}
        childCode={ask?.questionCode || ''}
        iconId={question?.icon || ''}
        vert={true}
        sidebarItem={true}
      />
    )
  })(mappedPcm.PRI_QUESTION_CODE)

  if (isProductInternmatch)
    return <InternmatchSidebar mappedPcm={mappedPcm} maxItems={maxItems} evtButtons={evtButtons} />
  return <DefaultSidebar mappedPcm={mappedPcm} maxItems={maxItems} evtButtons={evtButtons} />
}

export default TemplateSidebarOne
