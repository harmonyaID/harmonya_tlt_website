'use client'
import { motion } from 'motion/react'

const Template = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0.5, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}>
            {children}
        </motion.div>
    )
}

export default Template
