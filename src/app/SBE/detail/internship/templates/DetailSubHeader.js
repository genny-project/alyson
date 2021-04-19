import { Link, Text } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import Actions from 'app/layouts/components/actions'

const DetailSubHeader = ({ url, name, beCode, sbeCode, actions }) => {
  return (
    <>
      <Link href={url?.value}>
        <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
          {name?.value}
        </Text>
      </Link>
      <Attribute code={beCode} attribute={'PRI_ASSOC_INDUSTRY'} />
      <Attribute code={beCode} attribute={'PRI_STATUS'} />
      <Actions actions={actions} sbeCode={sbeCode} beCode={beCode} />
    </>
  )
}
export default DetailSubHeader
