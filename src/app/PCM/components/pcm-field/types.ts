export interface AttributeProps {
  size?: any
  mini?: any
  parentCode?: string
  variant?: any
  config?: {}
  styles?: any
  hasIndicatorIcon?: any
  readonly?: boolean
  answerCallback?: any
}

export interface PcmFieldParameters {
  fieldCode: string
  ask: any
  question: any
  props?: AttributeProps
}

export interface PcmFieldProps {
  code: string
  mappedPcm: { [x: string]: string }
  config?: AttributeProps
  properties?: any
  depth: number
  evtValue?: string
  isSidebarCollapsed: boolean
  child: (parameters: PcmFieldParameters) => JSX.Element
}

export interface NonPcmPcmFieldProps {
  code: string
  mappedPcm: { [x: string]: string }
  config?: AttributeProps
  properties?: any
  prefix: string
  evtValue?: string
  child: (parameters: PcmFieldParameters) => JSX.Element
}
