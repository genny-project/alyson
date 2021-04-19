import { Button, IconButton } from '@chakra-ui/button'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const DateTimePicker = ({ type = 'date', onChange }: DateTimePickerProps) => {
  const [cur, setCur] = useState(new Date())

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="calendar" icon={<FontAwesomeIcon icon={faCalendar} />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box>
            <HStack>
              <VStack>
                <HStack>
                  <Text textStyle="body1">{`${cur.getMonth()} ${cur.getFullYear()}`}</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

interface DateTimePickerProps {
  type: 'number' | 'datetime-local' | 'date'
  onChange: Function
}

export default DateTimePicker
