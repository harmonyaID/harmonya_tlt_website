'use client'
import { motion } from 'motion/react'

const Template = ({ children }: { children: React.ReactNode }) => {
    // return (
    //     <motion.div
    //         initial={{ opacity: 0, y: 2.5 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 1.5, ease: 'easeOut' }}>
    //         {children}
    //     </motion.div>
    // )

    // return (
    //     <motion.div
    //         initial={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
    //         animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    //         transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}>
    //         {children}
    //     </motion.div>
    // )

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    )
}

export default Template
