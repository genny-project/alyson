import { append, filter, find, keys, propEq, reduce } from 'ramda'
import { selectAttributes, selectCode } from 'redux/db/selectors'

import { Text } from '@chakra-ui/react'
import getSpillLocs from 'app/PCM/helpers/get-spill-locs'
import mapText from './map-text'
import { useSelector } from 'react-redux'

const TemplateText = ({ mappedPcm }) => {
  const questionCode = mappedPcm.PRI_QUESTION_CODE || ''
  const mainString = mappedPcm.PRI_LOC1 || ''

  const spillLocs = getSpillLocs(mappedPcm)(['PRI_LOC1'])

  const targetCode = useSelector(selectCode(questionCode, 'targetCode'))
  const wholeData = useSelector(selectCode(questionCode, 'wholeData'))

  const attributeCodes = reduce((acc, elem) => {
    if (elem.attributeCode) acc = append(elem.attributeCode)(acc)
    return acc
  }, [])(wholeData)

  const attributes = useSelector(selectAttributes(targetCode, attributeCodes))
  const attributesFiltered = filter(elem => elem)(attributes)

  const attributeMap = reduce((acc, elem) => {
    const attrCode = spillLocs[elem]
    if (attrCode) {
      const attr = find(propEq('attributeCode', attrCode))(attributesFiltered)
      if (attr) acc = { ...acc, [attrCode]: attr.value }
    }

    return acc
  }, {})(keys(spillLocs))

  const fontSizes = {
    TPL_TEXT_BODY_1: 'md',
    TPL_TEXT_BODY_2: 'md',
    TPL_TEXT_HEADER_1: '6xl',
    TPL_TEXT_HEADER_2: '5xl',
    TPL_TEXT_HEADER_3: '4xl',
    TPL_TEXT_HEADER_4: '3xl',
    TPL_TEXT_HEADER_5: '2xl',
    TPL_TEXT_HEADER_6: 'xl',
  }

  const fontSize = fontSizes[mappedPcm.PRI_TEMPLATE_CODE] || 'md'

  return <Text fontSize={fontSize}>{mapText(mainString)(spillLocs)(attributeMap)}</Text>
}

export default TemplateText
