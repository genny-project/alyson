import { motion } from 'framer-motion'
import { map, addIndex, splitEvery } from 'ramda'

const AnimateText = ({ content, ...rest }) => {
  let words = splitEvery(1)(content)
  return addIndex(map)((word, i) => (
    <div key={content + i} style={{ display: 'inline-block' }}>
      <motion.span
        {...rest}
        style={{
          display: 'block',
          color: '#71d7f0',
          fontSize: '3rem',
          backgroundColor: '#03254c',
          textAlign: 'center',
        }}
        custom={i}
      >
        {word + (i !== words.length - 1 ? '\u00A0' : '')}
      </motion.span>
    </div>
  ))(words)
}

export default AnimateText
