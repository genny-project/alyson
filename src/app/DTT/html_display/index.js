import { Box } from '@chakra-ui/react'

const Read = ({ data }) => {
  if (!data?.value) return null

  return (
    <Box>
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
