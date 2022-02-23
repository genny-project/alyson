import ChildButton from 'app/layouts/display/sidebar/buttons/ChildButton'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { VStack } from '@chakra-ui/react'

const SidebarButtons = ({ questionCode, onClick, sideBarButtons }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <VStack test-id={questionCode} justifyContent="center" h="60%" bg="red">
      {data.map(childCode => (
        <ChildButton
          onClick={onClick}
          key={childCode}
          questionCode={questionCode}
          childCode={childCode}
          sideBarButtons={sideBarButtons}
        />
      ))}
    </VStack>
  )
}

export default SidebarButtons
