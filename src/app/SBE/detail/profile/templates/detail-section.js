import { Text, IconButton } from '@chakra-ui/react'
import { map } from 'ramda'
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
        <div style={{ flexGrow: 2 }}>
          <Text fontSize="xl">{title}</Text>
        </div>
        {map(attr => (
          <div style={{ flexGrow: 1 }}>
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
