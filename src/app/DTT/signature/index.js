import { Box, VStack, Badge, Input, IconButton, Text } from '@chakra-ui/react'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'

const Write = ({ questionCode, data, onSendAnswer }) => {
  const signatureRef = useRef(null)
  const canvasRef = useRef(null)
  const [text, setText] = useState('')

  const handleClear = () => {
    setText('')
    const sigCanvas = signatureRef.current.getCanvas()
    if (sigCanvas && sigCanvas.getContext) {
      const ctx = sigCanvas.getContext('2d')
      ctx.clearRect(0, 0, sigCanvas.width, sigCanvas.height)
    }
    onSendAnswer(null)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${text.length > 20 ? 40 / (text.length / 18) : 40}px Homemade Apple`
      ctx.fillText(text, canvas.width / 12, canvas.height / 1.8)
    }
  }, [text])

  useEffect(() => {
    if (data?.value) {
      const sigCanvas = signatureRef.current.getCanvas()
      const img = new window.Image()
      img.addEventListener('load', function () {
        sigCanvas.getContext('2d').drawImage(img, 0, 0)
      })
      img.setAttribute('src', data.value)
    }
  }, [data.value])

  return (
    <VStack>
      <Text>Start typing your name, or draw on the pad</Text>
      <Input
        onBlur={() => {
          const canvas = canvasRef.current
          onSendAnswer(canvas.toDataURL())
        }}
        w="500px"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <Box hidden={!text} boxShadow="md">
        <canvas ref={canvasRef} width="500" height="200" />
      </Box>
      <Box hidden={!!text} boxShadow="md">
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
