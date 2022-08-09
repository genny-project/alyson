import React from 'react'
import { equals, split } from 'ramda'
import Pcm from 'app/PCM'
import NonPcmPcmField from 'app/PCM/components/pcm-field/non-pcm-field'
import { PcmFieldProps } from 'app/PCM/components/pcm-field/types'
import { VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const PcmField: React.FC<PcmFieldProps> = ({
  code,
  mappedPcm,
  properties,
  child,
  config,
  depth,
}): JSX.Element => {
  const splitArr: string[] = split('_')(code) || ''
  const prefix: string = splitArr.length === 0 ? 'NONE' : splitArr[0]

  if (depth > 50) {
    return (
      <VStack>
        <FontAwesomeIcon color="red" icon={faExclamationTriangle} />
        Maxiumum Recursive Depth Exceeded!
      </VStack>
    )
  }

  return equals(prefix)('PCM') ? (
    <Pcm code={code} properties={properties} depth={depth} />
  ) : (
    <NonPcmPcmField
      code={code}
      mappedPcm={mappedPcm}
      config={config}
      properties={properties}
      prefix={prefix}
      child={child}
    />
  )
}

export default PcmField
