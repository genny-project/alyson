import { motion } from 'framer-motion'
import { map, addIndex, split } from 'ramda'

const AnimateText = ({ content, ...rest }) => {
  let words = split(' ')(content)
  return addIndex(map)((word, i) => (
    <div key={content + i} style={{ display: 'inline-block' }}>
      <motion.span
        {...rest}
        style={{ display: 'block', willChange: 'transform', color: '#71d7f0', fontSize: '3rem' }}
        custom={i}
      >
        {word + (i !== words.length - 1 ? '\u00A0' : '')}
      </motion.span>
    </div>
  ))(words)
}

export default AnimateText
