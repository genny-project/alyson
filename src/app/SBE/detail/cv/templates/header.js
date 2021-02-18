import { Stack, Flex, Spacer, Box } from '@chakra-ui/react'
import { map } from 'ramda'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'

const Header = ({ code, sbeCode, imageSrc, headerAttribute, actions }) => {
  return (
    <Flex p="2" alignItems="start">
      <Attribute code={code} attribute={imageSrc} variant={'profile_image'} />
      <Box p="3">
        <Attribute
          code={code}
          attribute={headerAttribute}
          config={{ fontSize: '3xl', fontWeight: 'semibold' }}
        />
      </Box>

      <Spacer />

      <Menu>
        <MenuButton>
          <FontAwesomeIcon size="lg" icon={faEllipsisV} />
        </MenuButton>
        <MenuList>
          {actions &&
            map(action => (
              <MenuItem>
                <Action parentCode={sbeCode} code={action} targetCode={code} />
              </MenuItem>
            ))(actions)}
        </MenuList>
      </Menu>
      <Box mt="6">
        <Stack direction={['row', 'column']}></Stack>
      </Box>
    </Flex>
  )
}

export default Header
