import { Box, VStack, Badge, Input, IconButton, Text } from '@chakra-ui/react'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

const Write = ({ questionCode, data, onSendAnswer }) => {
  const signatureRef = useRef(null)
  const canvasRef = useRef(null)
  const [text, setText] = useState('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = '40px Homemade Apple'
      ctx.fillText(text, canvas.width / 6, canvas.height / 1.8)
      onSendAnswer(canvas.toDataURL())
    }
  }, [onSendAnswer, text])

  const handleClear = () => {
    setText('')
    const sigCanvas = signatureRef.current.getCanvas()
    if (sigCanvas && sigCanvas.getContext) {
      const ctx = sigCanvas.getContext('2d')
      ctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height)
    }
    onSendAnswer(null)
  }

  return (
    <VStack>
      <Text>Start typing your name, or draw on the pad</Text>
      <Input w="500px" value={text} onChange={e => setText(e.target.value)} />

      <Box
        hidden={!text}
        style={{
          boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
          borderRadius: '50px',
        }}
      >
        <canvas ref={canvasRef} width="500" height="200" />
      </Box>
      <Box
        hidden={!!text}
        style={{
          boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
          borderRadius: '50px',
        }}
      >
        <IconButton
          position="absolute"
          variant="unstyled"
          ml="10"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
          onClick={handleClear}
        />
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
