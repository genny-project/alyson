const { Button, CircularProgress } = require('@chakra-ui/react')
const { faFileDownload } = require('@fortawesome/free-solid-svg-icons')
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome')
const { useSelector } = require('react-redux')
const { selectDownloadFile } = require('redux/app/selectors')
const { selectCode } = require('redux/db/selectors')

const Download = ({ sbeCode }) => {
  const link = useSelector(selectDownloadFile)
  const hasDl = useSelector(selectCode(sbeCode, 'COL_PRI_HAS_DOWNLOAD_LINK'))

  if (!hasDl) return null

  return (
    <Button
      isDisabled={!link}
      leftIcon={
        link ? (
          <FontAwesomeIcon icon={faFileDownload} />
        ) : (
          <CircularProgress size="20px" isIndeterminate />
        )
      }
      onClick={() => window.open(link)}
    >
      Download
    </Button>
  )
}

export default Download
