import Drafts from 'app/layouts/navigation/drafts/Drafts'
const TemplateBell = ({ mappedPcm }) => {
  const { PRI_QUESTION_CODE } = mappedPcm

  return <Drafts code={PRI_QUESTION_CODE} />
}

export default TemplateBell
