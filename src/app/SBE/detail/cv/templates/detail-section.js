import { Text } from '@chakra-ui/react'
import { map } from 'ramda'
import { IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Attribute from 'app/BE/attribute'
import styles from './styles'

const DetailSection = ({ code, details: { sectionIcon, title, attributes } }) => {
  return (
    <div style={styles.detailSectionContainer}>
      <div style={styles.detailSectionIconContainer}>
        <IconButton>
          <FontAwesomeIcon size="lg" icon={sectionIcon} />
        </IconButton>
      </div>

      <div style={styles.detailSectionInformationContainer}>
        <div style={{ flexGrow: 2, background: 'black' }}>
          <Text fontSize="xl">{title}</Text>
        </div>
        {map(attr => (
          <div style={{ flexGrow: 1, background: 'black' }}>
            <Text>
              <Attribute code={code} attribute={attr} />
            </Text>
          </div>
        ))(attributes)}
      </div>
    </div>
  )
}

export default DetailSection
