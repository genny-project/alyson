import { Box, Button } from '@chakra-ui/react'
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const DownloadButton = ({ urlLink = 'https://internmatch.io/' }) => {
  const [downloading, setDownloading] = useState(false)
  let newFileName

  function download(url, filename) {
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    // the filename you want
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const onClick = () => {
    setDownloading(true)
    fetch(urlLink)
      .then(response => {
        const respHeaders = response.headers.get('Content-Disposition')
        newFileName = respHeaders.replace('attachment; filename= ', '')
        const reader = response.body.getReader()
        return new ReadableStream({
          start(controller) {
            return pump()
            function pump() {
              return reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close()
                  return
                }
                controller.enqueue(value)
                return pump()
              })
            }
          },
        })
      })
      .then(stream => new Response(stream))
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => {
        download(url, newFileName)
        setDownloading(false)
      })
      .catch(err => {
        console.error(err)
        setDownloading(false)
      })
  }

  return (
    <Box>
      <Button
        onClick={onClick}
        leftIcon={
          <FontAwesomeIcon
            className={downloading ? 'fa-spin' : ''}
            icon={downloading ? faSpinner : faDownload}
          />
        }
        colorScheme="primary"
        variant="solid"
      ></Button>
    </Box>
  )
}

export default DownloadButton
