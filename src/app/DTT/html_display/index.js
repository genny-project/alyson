import { Box } from '@chakra-ui/react'

const Read = ({ data }) => {
  if (!data?.value) return null

  return (
    <Box maxW="70vw">
      <div
        style={{ borderRadius: '10px', border: '1px solid grey' }}
        dangerouslySetInnerHTML={{ __html: data?.value }}
      />
    </Box>
  )
}

const HtmlDisplay = {
  Read,
}

export default HtmlDisplay
