import { Flex, IconButton, Box, Avatar, Text, HStack } from '@chakra-ui/react'
import { map, __ } from 'ramda'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { closeDrawer } from 'redux/app'
const Header = ({
  beCode,
  sbeCode,
  imageAttribute,
  fullNameAttribute,
  preferredNameAttribute,
  actions,
  videoAttribute,
  careerObjSrc,
}) => {
  const dispatch = useDispatch()
  const { getImageSrc } = useApi()
  const useGetAttributeValue = attribute => useSelector(selectCode(beCode, attribute))
  console.warn('cyrus', useGetAttributeValue(careerObjSrc))
  const video = useSelector(selectCode(beCode, videoAttribute))
  const imageData = useSelector(selectCode(beCode, imageAttribute))
  const imageValue = imageData?.value
  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const careerObjData = useSelector(selectCode(beCode, careerObjSrc))
  const careerObjText = careerObjData?.value
  const priNameData = useSelector(selectCode(beCode, fullNameAttribute))
  const priNameText = priNameData?.value
  const preferredNameData = useSelector(selectCode(beCode, preferredNameAttribute))
  const preferredNameText = preferredNameData?.value
  const styles = {
    width: '100%',
  }
  return (
    <Box>
      <Box position="absolute" right="10" top="5">
        <IconButton
          color="white"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
          onClick={() => dispatch(closeDrawer())}
        />
      </Box>
      <Flex p="2" justifyContent="center" minHeight="20rem">
        {video?.value && (
          <Flex flexGrow="1" maxWidth="50%">
            {video?.value && <Attribute code={beCode} attribute={videoAttribute} styles={styles} />}
          </Flex>
        )}
        {careerObjText && (
          <Flex flexGrow="1" bgGradient="linear(to-br, teal.400,blue.500)">
            <Text>{careerObjText}</Text>
          </Flex>
        )}
      </Flex>
      <Box mt="-5.75rem" width="100%" textAlign="center" mb="1rem">
        <Avatar bg="white" p="8px" src={image} w="10rem" h="10rem" zIndex="modal" />
      </Box>
      <Text width="100%" textAlign="center" fontSize="4xl">
        {priNameText}
      </Text>
      <Text width="100%" textAlign="center" fontSize="xl" mb="2rem">
        {preferredNameText}
      </Text>
      <Flex justifyContent="center" mb="1rem">
        {actions && (
          <HStack>
            {map(action => (
              <Action
                parentCode={sbeCode}
                code={action}
                targetCode={beCode}
                key={action}
                size="md"
                colorScheme="blue"
              />
            ))(actions)}
          </HStack>
        )}
      </Flex>
    </Box>
  )
}
export default Header
