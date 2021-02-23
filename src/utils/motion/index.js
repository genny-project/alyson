import { forwardRef } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

const makeMotion = Component =>
  motion.custom(
    forwardRef((props, ref) => {
      const chakraProps = Object.fromEntries(
        Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
      )
      return <Component ref={ref} {...chakraProps} />
    }),
  )

export default makeMotion
