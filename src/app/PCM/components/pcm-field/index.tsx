import { equals } from 'ramda'
import Pcm from 'app/PCM'
import NonPcmPcmField from 'app/PCM/components/pcm-field/non-pcm-field'
import { PcmFieldProps } from 'app/PCM/components/pcm-field/types'

import getPrefixFromCode from 'app/PCM/helpers/get-prefix-from-code'
import debugOut from 'utils/debug-out'

const PcmField: React.FC<PcmFieldProps> = ({
  code,
  mappedPcm,
  properties,
  child,
  config,
  depth,
  evtValue,
}): JSX.Element => {
  let prefixCode
  if (!code) {
    debugOut.warn('PCM field got empty code!')
  }
  prefixCode = code ?? ''
  const pcm = 'PCM'
  const prefix: any = getPrefixFromCode(prefixCode) || 'NONE'
  const isPrefixPcm = equals(prefix)(pcm)
  return isPrefixPcm ? (
    <Pcm code={code} properties={properties} depth={depth} config={config} />
  ) : (
    <NonPcmPcmField
      code={code}
      mappedPcm={mappedPcm}
      config={config}
      properties={properties}
      prefix={prefix}
      child={child}
      evtValue={evtValue}
    />
  )
}

export default PcmField
