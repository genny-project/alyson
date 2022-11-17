import DateRange from 'app/DTT/date_range'

export default {
  title: 'Components/Date Range',
  component: DateRange,
}

const DateRangeWriteTemplate = args => {
  const { Placeholder, Mandatory, Granularity, MaxDate } = args
  return (
    <DateRange.Write
      questionCode={''}
      onSendAnswer={() => {}}
      data={''}
      regexPattern={''}
      placeholder={Placeholder}
      mandatory={Mandatory}
      html={{ granularity: Granularity, maxDate: MaxDate }}
    />
  )
}

export const Write = DateRangeWriteTemplate.bind({})
Write.args = {
  Placeholder: 'Enter a date',
  Mandatory: true,
  Granularity: 'year',
  MaxDate: '10/12/2022',
}
Write.argTypes = {
  Granularity: {
    control: 'inline-radio',
    options: ['year', 'month', 'day'],
  },
  MaxDate: {
    control: 'date',
  },
}
