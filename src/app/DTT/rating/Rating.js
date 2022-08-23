import { HStack } from '@chakra-ui/react'
import Star from './Star'

const Rating = ({ value, hover, setHover, onChange, questionCode }) => {
  if (!setHover)
    return (
      <HStack spacing="0">
        {[1, 2, 3, 4, 5].map((idx, index) => (
          <div
            key={`${questionCode}-${index}`}
            style={{ width: '2rem', height: '2rem', padding: '0.5rem' }}
          >
            <Star fill={value >= idx ? 'gold' : 'white'} />
          </div>
        ))}
      </HStack>
    )

  return (
    <HStack cursor="pointer" spacing="0" test-id={questionCode}>
      {[1, 2, 3, 4, 5].map((idx, index) => (
        <>
          <div
            key={`${questionCode}-${index}`}
            style={{ width: '3rem', height: '3rem', padding: '0.5rem' }}
            onClick={() => onChange(idx)}
            onMouseEnter={() => setHover(idx)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              test-id={questionCode + idx}
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
        </>
      ))}
    </HStack>
  )
}

export default Rating
