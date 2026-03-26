'use client';
import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

export default function TextAnimation({
  text,
  children,
  classname = '',
  as: Component = 'h1',
  variants,
  letterAnime = false,
  lineAnime = false,
  direction = 'up'
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-15%' });

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 40 };
      case 'down': return { y: -40 };
      case 'left': return { x: 40 };
      case 'right': return { x: -40 };
      default: return { y: 40 };
    }
  };

  const defaultVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)', ...getDirectionOffset() },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      x: 0, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: letterAnime ? 0.03 : lineAnime ? 0.2 : 0.1 }
    }
  };

  const activeVariants = variants || defaultVariants;
  const MotionComponent = motion[Component] || motion.div;

  if (letterAnime || lineAnime) {
    const content = text || (typeof children === 'string' ? children : '');
    const items = letterAnime ? content.split('') : content.split('\n');
    return (
      <MotionComponent
        ref={ref}
        className={`${classname} ${letterAnime ? 'flex flex-wrap' : ''}`}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {items.map((item, index) => (
          <motion.span 
            key={index} 
            variants={activeVariants} 
            className={`inline-block whitespace-pre ${lineAnime ? 'block' : ''}`}
          >
            {item}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      ref={ref}
      className={classname}
      variants={activeVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text || children}
    </MotionComponent>
  );
}
