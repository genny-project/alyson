import AnimateText from './text-animation'
import { AnimatePresence, motion } from 'framer-motion'

const LoadingText = () => {
  return (
    <AnimatePresence>
      {
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <AnimateText
            initial={{ x: 0 }}
            animate="visible"
            variants={{
              visible: i => ({
                x: 10,
                transition: {
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.1,
                },
              }),
            }}
            content={`Securely logging you in...`}
          />
        </motion.div>
      }
    </AnimatePresence>
  )
}

export default LoadingText
