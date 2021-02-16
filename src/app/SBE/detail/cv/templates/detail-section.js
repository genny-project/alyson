import { Text } from '@chakra-ui/react'
import { map } from 'ramda'
import styles from './styles'
const DetailSection = ({ details: { sectionIcon, title, attributes } }) => {
  return (
    <div style={styles.detailSectionContainer}>
      <div style={styles.detailSectionIconContainer}>{sectionIcon}</div>
      <div style={styles.detailSectionInformationContainer}>
        <div style={{ flexGrow: 2, background: 'black' }}>
          <Text fontSize="xl">{title}</Text>
        </div>
        {map(attr => (
          <div style={{ flexGrow: 1, background: 'black' }}>
            <Text>{attr}</Text>
          </div>
        ))(attributes)}
      </div>
    </div>
  )
}

export default DetailSection
