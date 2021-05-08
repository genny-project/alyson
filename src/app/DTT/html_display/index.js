import { Box } from '@chakra-ui/layout'

const Read = ({ data }) => {
  if (!data?.value) return null

  return (
    <Box
      style={{
        borderRadius: '10px',
        border: '1px solid grey',
        height: '70vh',
      }}
      w="70vw"
    >
      <iframe
        style={{ borderRadius: '10px', width: '100%', height: '100%' }}
        title={data?.attributeName}
        srcDoc={data?.value}
      />
    </Box>
  )
}

const HtmlDisplay = {
  Read,
}

export default HtmlDisplay
