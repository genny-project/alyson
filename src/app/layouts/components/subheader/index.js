import { Link, Text, VStack } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import Actions from 'app/layouts/components/actions'
import { map } from 'ramda'

const DetailSubHeader = ({ url, name, beCode, sbeCode, actions, subHeaderAttributes }) => {
  return (
    <>
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
      <VStack mb="1rem">
        {map(attr => <Attribute code={beCode} attribute={attr} />)(subHeaderAttributes)}
      </VStack>
      <Actions actions={actions} sbeCode={sbeCode} beCode={beCode} />
    </>
  )
}
export default DetailSubHeader
