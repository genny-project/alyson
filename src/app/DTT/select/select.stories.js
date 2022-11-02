import Select from 'app/DTT/select'

export default {
  title: 'Components/Select',
  component: Select,
}

const TemplateWrite = args => {
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
      {...args}
    />
  )
}
export const Write = TemplateWrite.bind({})
Write.args = {
  placeholderName: 'Select any',
  mandatory: true,
  openOptionAlways: true,
  options: [
    {
      label: 'SEL_AUSTRALIA',
      value: 'SEL_AUSTRALIA',
    },
    {
      label: 'SEL_AUSTRALIA',
      value: 'SEL_AUSTRALIA',
    },
    {
      label: 'SEL_AUSTRALIA',
      value: 'SEL_AUSTRALIA',
    },
    {
      label: 'SEL_AUSTRALIA',
      value: 'SEL_AUSTRALIA',
    },
    {
      label: 'SEL_AUSTRALIA',
      value: 'SEL_AUSTRALIA',
    },
    {
      label: 'SEL_AUSTRALIA',
      value: 'SEL_AUSTRALIA',
    },
    {
      label: 'SEL_AUSTRALIA',
      value: 'SEL_AUSTRALIA',
    },
  ],
}
