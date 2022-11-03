import Select from 'app/DTT/select'
import makeStoryOptions from './make-story-options'

export default {
  title: 'Components/Select',
  component: Select,
}

const TemplateWrite = args => {
  const { placeholderName, mandatory, noOptions, dataOptions } = args

  return (
    <Select.Write
      questionCode={''}
      attributeCode={''}
      onSendAnswer={() => {}}
      data={''}
      dataType={''}
      targetCode={''}
      parentCode={''}
      component={''}
      mandatory={mandatory}
      placeholderName={placeholderName}
      noOptions={noOptions}
      passedDropdownData={makeStoryOptions(dataOptions)}
    />
  )
}
export const Write = TemplateWrite.bind({})
Write.args = {
  placeholderName: 'Select any',
  mandatory: true,
  openOptionAlways: false,
  noOptions: false,
  dataOptions: [
    {
      label: 'Australia',
      value: 'SEL_AUSTRALIA',
    },
    {
      label: 'Nepal',
      value: 'SEL_NEPAL',
    },
    {
      label: 'India',
      value: 'SEL_INDIA',
    },
    {
      label: 'Indonesia',
      value: 'SEL_INDONESIA',
    },
    {
      label: 'Canada',
      value: 'SEL_CANADA',
    },
  ],
}
Write.argTypes = {
  DropdownHoverBackground: {
    control: 'color',
  },
}

const TemplateRead = args => {
  const { dataOptions } = args
  return <Select.Read data={dataOptions} />
}
export const Read = TemplateRead.bind({})
Read.args = {
  dataOptions: [
    {
      label: 'Australia',
      value: 'SEL_AUSTRALIA',
    },
    {
      label: 'Nepal',
      value: 'SEL_NEPAL',
    },
    {
      label: 'India',
      value: 'SEL_INDIA',
    },
    {
      label: 'Indonesia',
      value: 'SEL_INDONESIA',
    },
    {
      label: 'Canada',
      value: 'SEL_CANADA',
    },
  ],
}
