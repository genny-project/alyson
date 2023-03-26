import { Badge, Box, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SignatureCanvas from 'react-signature-canvas'
import { useIsMobile } from 'utils/hooks'

const Write = ({ questionCode, data, onSendAnswer }) => {
  const signatureRef = useRef(null)
  const canvasRef = useRef(null)
  const [text, setText] = useState('')
  const isMobile = useIsMobile()

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
      img.setAttribute('crossOrigin', 'Anonymous')
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
        w="min(100%, 25rem)"
        value={text}
        test-id={`${questionCode}-text`}
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
          test-id={`${questionCode}-canvas`}
          ref={ref => (signatureRef.current = ref)}
          onEnd={() => onSendAnswer(signatureRef.current.toDataURL())}
          canvasProps={{
            width: '300',
            height: '200',
            allowTain: true,
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
