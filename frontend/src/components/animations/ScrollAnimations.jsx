import React from 'react';
import { motion } from 'framer-motion';

// Reveals text line by line on scroll
export const LineReveal = ({ text, className = '', delay = 0 }) => {
  const lines = text.split('\n');

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// Reveals text word by word on scroll
export const WordReveal = ({ text, className = '', delay = 0, stagger = 0.05 }) => {
  const words = text.split(' ');

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: delay + i * stagger,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

// Highlights a sentence with a gradient underline sweep on scroll
export const SweepReveal = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-gold via-violet to-transparent"
        initial={{ width: '0%' }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: delay + 0.4, ease: 'easeOut' }}
      />
    </motion.div>
  );
};

// Staggered container - children appear one after another
export const StaggerContainer = ({ children, className = '', stagger = 0.1, delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Child item for StaggerContainer
export const StaggerItem = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
