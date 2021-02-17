import { HStack, Text } from '@chakra-ui/react'
import { map } from 'ramda'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import styles from './styles'

const Header = ({ code, sbeCode, imageSrc, headerAttribute, actions }) => {
  return (
    <div style={styles.headerContainer}>
      <div style={styles.headerSectionInfoContainer}>
        <div style={styles.headerSectionProfile}>
          <Attribute code={code} attribute={imageSrc} variant={'profile_image'} />
        </div>
        <div style={styles.headerSectionName}>
          <Text fontSize="4xl">
            <Attribute code={code} attribute={headerAttribute} />
          </Text>
        </div>
      </div>
      <div style={styles.headerSectionActionContainer}>
        <HStack>
          {actions &&
            map(action => <Action parentCode={sbeCode} code={action} targetCode={code} />)(actions)}
        </HStack>
      </div>
    </div>
  )
}

export default Header
