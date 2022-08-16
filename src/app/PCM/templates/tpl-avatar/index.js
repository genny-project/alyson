import Avatar from 'app/layouts/navigation/Avatar'
const TemplateAvatar = ({ mappedPcm }) => {
  const { PRI_QUESTION_CODE } = mappedPcm

  return <Avatar code={PRI_QUESTION_CODE} />
}

export default TemplateAvatar
