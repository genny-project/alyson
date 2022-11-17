import DownloadButton from 'app/DTT/download_button'
export default {
  title: 'Components/Download Button',
  component: DownloadButton,
}

const DownloadTemplate = args => {
  const { urlLink, colorScheme, variant } = args
  return <DownloadButton urlLink={urlLink} colorScheme={colorScheme} variant={variant} />
}
export const Button = DownloadTemplate.bind({})
Button.args = {
  urlLink: 'https://internmatch.io/',
  colorScheme: 'green',
  variant: 'solid',
}
Button.argTypes = {
  urlLink: {
    control: { type: 'text' },
  },
  colorScheme: {
    control: {
      type: 'inline-radio',
      options: ['primary', 'secondary', 'green', 'red', 'orange', 'teal', 'purple', 'blue'],
    },
  },
  variant: {
    control: {
      type: 'inline-radio',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
  },
}
