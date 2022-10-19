import { equals } from 'ramda'
import Pcm from 'app/PCM'
import NonPcmPcmField from 'app/PCM/components/pcm-field/non-pcm-field'
import { PcmFieldProps } from 'app/PCM/components/pcm-field/types'

import getPrefixFromCode from 'app/PCM/helpers/get-prefix-from-code'

const PcmField: React.FC<PcmFieldProps> = ({
  code,
  mappedPcm,
  properties,
  child,
  config,
  depth,
}): JSX.Element => {
  let prefixCode
  prefixCode = code ?? ''
  const pcm = 'PCM'
  const prefix: any = getPrefixFromCode(prefixCode) || 'NONE'
  const isPrefixPcm = equals(prefix)(pcm)

  return isPrefixPcm ? (
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
