import AlysonDate from 'app/DTT/date'
import { isEmpty } from 'ramda'

export default {
  title: 'Components/Date',
  component: Date,
}

const typeNameControls = {
  options: ['Date', 'LocalDateTime', 'year'],
  mapping: { LocalDateTime: 'LocalDateTime', Date: 'Date', year: 'year' },
  control: {
    type: 'inline-radio',
  },
}

const WriteTemplate = args => {
  const { mandatory, placeholderName, typeName } = args
  return (
    <AlysonDate.Write
      questionCode={''}
      data={''}
      onSendAnswer={() => {}}
      parentCode={''}
      mandatory={mandatory}
      placeholderName={placeholderName}
      typeName={typeName}
    />
  )
}

export const Write = WriteTemplate.bind({})
Write.args = {
  mandatory: false,
  placeholderName: 'Enter a value',
  typeName: 'Date',
}
Write.argTypes = {
  typeName: typeNameControls,
}

const ReadTemplate = args => {
  const { typeName, value } = args
  const formattedValue = isEmpty(value) ? undefined : new Date(value).toISOString()
  const data = {
    value: formattedValue,
  }

  return <AlysonDate.Read data={data} typeName={typeName} />
}

export const Read = ReadTemplate.bind({})
Read.args = {
  typeName: 'Date',
  value: '',
}
Read.argTypes = {
  typeName: typeNameControls,
  value: {
    control: {
      type: 'date',
    },
  },
}
