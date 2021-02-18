const Read = ({ data }) => {
  if (!data?.value) return null

  return (
    <iframe
      style={{ borderRadius: '10px', border: '1px solid grey', width: '50vw', height: '70vh' }}
      title={data?.attributeName}
      srcDoc={data?.value}
    ></iframe>
  )
}

const HtmlDisplay = {
  Read,
}

export default HtmlDisplay
