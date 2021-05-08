import { useSelector } from 'react-redux'
import { Box, HStack, VStack, IconButton, Flex, Spacer, useColorModeValue } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { getAttribute } from 'app/SBE/utils/get-columns'
import Text from 'app/DTT/text'
import Image from 'app/DTT/upload/Image'
import ContextMenu from 'app/BE/context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import MainDetails from './MainDetails'
import makeMotion from 'utils/motion'
import { includes } from 'ramda'
import AvailableInternCard from './available_interns'
import AgentDetail from './AgentDetail'
import sameValue from 'redux/utils/same-value'
import Card from 'app/layouts/components/card'

const MotionBox = makeMotion(Box)

const DefaultCard = ({ parentCode, actions = [], code, columns }) => {
  const title = useSelector(selectCode(code, getAttribute(columns[0] || '')), sameValue)
  const subTitle = useSelector(selectCode(code, getAttribute(columns[1] || '')), sameValue)
  const image = useSelector(selectCode(code, 'PRI_IMAGE_URL'), sameValue)
  const statusColor = useSelector(selectCode(code, 'PRI_STATUS_COLOR'), sameValue)

  const color = useColorModeValue(`${statusColor?.value}.50`, `${statusColor?.value}.900`)

  if (includes('SBE_AVAILABLE_INTERNS', parentCode || ''))
    return <AvailableInternCard parentCode={parentCode} actions={actions} code={code} />

  return (
    <MotionBox w="full" whileHover={{ scale: 1.02 }} transition={{ duration: 0.1 }}>
      <Card
        p={5}
        variant="card1"
        {...(statusColor?.value &&
        statusColor?.value !== 'default' &&
        !includes('#', statusColor?.value || '')
          ? { bg: color }
          : {})}
      >
        <Flex spacing="3">
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
                  isTruncated: true,
                  maxW: '14rem',
                }}
              />
              <Text.Read
                config={{
                  as: 'span',
                  textStyle: 'body.3',
                  isTruncated: true,
                  maxW: '14rem',
                }}
                data={subTitle}
              />
              <MainDetails code={code} columns={columns} parentCode={parentCode} />
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

export default DefaultCard
