import React from 'react'
import { equals, split } from 'ramda'
import Pcm from 'app/PCM'
import NonPcmPcmField from 'app/PCM/components/pcm-field/non-pcm-field'
import { PcmFieldProps } from 'app/PCM/components/pcm-field/types'

const PcmField: React.FC<PcmFieldProps> = ({
  code,
  mappedPcm,
  properties,
  child,
  config,
}): JSX.Element => {
  const splitArr: string[] = split('_')(code) || ''
  const prefix: string = splitArr.length === 0 ? 'NONE' : splitArr[0]

  return equals(prefix)('PCM') ? (
    <Pcm code={code} properties={properties} />
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
