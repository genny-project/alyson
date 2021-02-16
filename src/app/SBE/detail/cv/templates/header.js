import { Text, Image } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import styles from './styles'

const Header = ({ code, imageSrc, headerAttribute }) => {
  console.warn('imageSrc', imageSrc)
  return (
    <div style={styles.headerContainer}>
      <div style={styles.headerSectionInfoContainer}>
        <div style={styles.headerSectionProfile}>
          <Image src={imageSrc} alt="profile-picture" h="100px" />
        </div>
        <div style={styles.headerSectionName}>
          <Text fontSize="xl">
            <Attribute code={code} attribute={headerAttribute} />
          </Text>
        </div>
      </div>
      <div style={styles.headerSectionActionContainer}>{`three`}</div>
    </div>
  )
}

export default Header
