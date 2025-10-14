import { motion } from 'framer-motion';

const FadeUp = ({ children }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )
}

export default FadeUp;