import { Flex, Spacer, Box } from '@chakra-ui/react'
import { map } from 'ramda'
import { useBreakpointValue, HStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import HeaderActions from './mobile-actions'
import { selectCode } from 'redux/db/selectors'

const Header = ({ beCode, sbeCode, imageSrc, headerAttribute, actions, videoAttribute }) => {
  const mobile = useBreakpointValue({ base: true, lg: false })
  const video = useSelector(selectCode(beCode, videoAttribute))

  return (
    <Flex p="2" alignItems="start">
      {video?.value ? (
        <Attribute code={beCode} attribute={videoAttribute} />
      ) : (
        <Attribute code={beCode} attribute={imageSrc} variant={'profile_image'} />
      )}
      <Box p="3">
        <Attribute code={beCode} attribute={headerAttribute} config={{ textStyle: 'head2' }} />
      </Box>
      <Spacer />
      <Box mt="6">
        {mobile ? (
          <HeaderActions actions={actions} beCode={beCode} sbeCode={sbeCode} />
        ) : (
          actions && (
            <HStack>
              {map(action => (
                <Action parentCode={sbeCode} code={action} targetCode={beCode} key={action} />
              ))(actions)}
            </HStack>
          )
        )}
      </Box>
    </Flex>
  )
}

export default Header
