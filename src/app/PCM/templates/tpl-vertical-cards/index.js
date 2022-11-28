import Lane from 'app/SBE/lane'

const TemplateVerticalCards = ({ mappedPcm }) => {
  console.log(mappedPcm)
  if (!mappedPcm.PRI_LOC1) return null

  return <Lane sbeCode={mappedPcm.PRI_LOC1} />
}

export default TemplateVerticalCards
