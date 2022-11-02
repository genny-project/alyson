import Select from 'app/DTT/select'

export default {
  title: 'Components/Select',
  component: Select,
}

const TemplateWrite = args => {
  return (
    <Select.Write
      questionCode={'QUE_SELECT_COUNTRY'}
      attributeCode={'LNK_SELECT_COUNTRY'}
      onSendAnswer={() => {}}
      data={''}
      dataType={''}
      targetCode={'PER_1F543240-C312-4CC8-829D-6BF0D3CEDA0D'}
      parentCode={'QUE_QA_INTERN_GRP'}
      component={''}
      {...args}
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
