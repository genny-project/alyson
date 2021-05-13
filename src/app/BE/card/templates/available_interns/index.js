import { useSelector } from 'react-redux'
import { Box, HStack, VStack, IconButton, Flex, Spacer, useColorModeValue } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import Text from 'app/DTT/text'
import Image from 'app/DTT/upload/Image'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import makeMotion from 'utils/motion'
import AgentDetail from '../AgentDetail'
import sameValue from 'redux/utils/same-value'
import Card from 'app/layouts/components/card'
import { includes } from 'ramda'

const MotionBox = makeMotion(Box)

const AvailableInternCard = ({ parentCode, actions = [], code }) => {
  const title = useSelector(selectCode(code, 'PRI_NAME'), sameValue)
  const subTitle = useSelector(selectCode(code, 'PRI_ASSOC_OCCUPATION'), sameValue)
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'), sameValue)
  const statusColor = useSelector(selectCode(code, 'PRI_STATUS_COLOR'), sameValue)

  const color = useColorModeValue(`${statusColor?.value}.50`, `${statusColor?.value}.900`)

  return (
    <MotionBox w="full" whileHover={{ scale: 1.02 }} transition={{ duration: 0.1 }}>
      <Card
        p={5}
        variant="card1"
        {...(statusColor?.value !== 'default' && !includes('#', statusColor?.value || '')
          ? { bg: color }
          : {})}
      >
        <Flex spacing="3" w="20rem">
          <HStack>
            <Image.Read
              config={{ size: 'xl' }}
              data={image || { baseEntityCode: code }}
              parentCode={parentCode}
            />
            <VStack alignItems="baseline" w="30">
              <Text.Read
                data={title}
                textProps={{
                  textStyle: 'body.1',
                  maxW: '16rem',
                }}
              />
              <Text.Read
                config={{
                  as: 'span',
                  textStyle: 'body.3',
                  maxW: '16rem',
                }}
                data={subTitle}
              />
            </VStack>
          </HStack>
          <Spacer minW="1rem" />
          <ContextMenu
            actions={actions}
            code={code}
            parentCode={parentCode}
            button={
              <IconButton
                size="xs"
                variant="outline"
                icon={<FontAwesomeIcon icon={faEllipsisV} />}
              />
            }
          />
        </Flex>
        <AgentDetail code={code} parentCode={parentCode} />
      </Card>
    </MotionBox>
  )
}

export default AvailableInternCard
