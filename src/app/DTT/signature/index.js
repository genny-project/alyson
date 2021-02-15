import { Box, VStack, Badge } from '@chakra-ui/react'
import { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

const Write = ({ questionCode, data, onSendAnswer }) => {
  const signatureRef = useRef(null)

  return (
    <VStack>
      <Box style={{ border: '1px solid grey', borderRadius: '1rem' }}>
        <SignatureCanvas
          test-id={questionCode}
          ref={ref => (signatureRef.current = ref)}
          onEnd={() => onSendAnswer(signatureRef.current.toDataURL())}
          canvasProps={{
            width: '500',
            height: '200',
          }}
        />
      </Box>
      {data?.value && <Badge colorScheme="green">Saved!</Badge>}
    </VStack>
  )
}

const Signature = {
  Write,
}

export default Signature
