import ProgressComponent from 'app/DTT/progress'
export default {
  title: 'Components/Progress',
  component: ProgressComponent,
}

const ProgressTemplate = args => {
  const { placeholder, colorScheme, size } = args
  return (
    <ProgressComponent.Write
      data={''}
      placeholderName={placeholder}
      colorScheme={colorScheme}
      size={size}
    />
  )
}

export const Write = ProgressTemplate.bind({})
Write.args = {
  placeholder: 'Label',
}
Write.argTypes = {
  colorScheme: {
    control: {
      type: 'inline-radio',
      options: ['primary', 'secondary', 'green', 'red', 'orange', 'teal', 'purple', 'blue'],
    },
  },
  size: {
    control: {
      type: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
}
