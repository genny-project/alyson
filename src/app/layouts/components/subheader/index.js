import { Center, Link, Text, VStack } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import Actions from 'app/layouts/components/actions'
import { map } from 'ramda'

const DetailSubHeader = ({ url, name, beCode, sbeCode, actions, subHeaderAttributes }) => {
  return (
    <Center w="full">
      <VStack>
        {url ? (
          <Link href={url?.value}>
            <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
              {name?.value}
            </Text>
          </Link>
        ) : (
          <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
            {name?.value}
          </Text>
        )}
        {subHeaderAttributes && (
          <VStack mb="1rem">
            {map(attr => <Attribute key={attr} code={beCode} attribute={attr} />)(
              subHeaderAttributes,
            )}
          </VStack>
        )}
        <Actions actions={actions} sbeCode={sbeCode} beCode={beCode} />
      </VStack>
    </Center>
  )
}
export default DetailSubHeader
