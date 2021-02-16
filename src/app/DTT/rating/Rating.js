import Star from './Star'
import { HStack } from '@chakra-ui/react'

const Rating = ({ value, hover, setHover, onChange }) => {
  if (!setHover)
    return (
      <HStack spacing="0">
        {[1, 2, 3, 4, 5].map(idx => (
          <div style={{ width: '2rem', height: '2rem', padding: '0.5rem' }}>
            <Star fill={value >= idx ? 'gold' : 'white'} />
          </div>
        ))}
      </HStack>
    )

  return (
    <HStack cursor="pointer" spacing="0">
      {[1, 2, 3, 4, 5].map(idx => (
        <div
          style={{ width: '3rem', height: '3rem', padding: '0.5rem' }}
          onClick={() => onChange(idx)}
          onMouseEnter={() => setHover(idx)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            fill={
              hover
                ? hover === value
                  ? hover >= idx
                    ? 'gold'
                    : 'white'
                  : hover >= idx
                  ? 'khaki'
                  : 'white'
                : value >= idx
                ? 'gold'
                : 'white'
            }
          />
        </div>
      ))}
    </HStack>
  )
}

export default Rating
