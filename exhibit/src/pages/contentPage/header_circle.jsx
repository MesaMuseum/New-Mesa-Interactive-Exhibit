import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import redCircle from '/red_circle.png?url';

const CircleAnimation = () => {
  return (
    <motion.div 
      initial={{ 
        scale: 0, 
        opacity: 0,
        clipPath: 'circle(0% at 50% 50%)'
      }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        clipPath: 'circle(100% at 50% 50%)'
      }}
      transition={{ 
        duration: 1.5, 
        ease: "easeOut" 
      }}
      className="absolute -z-10 w-[250%] h-[180%] -left-[75%] -top-[40%]"
    >
      <img 
        src={redCircle} 
        alt="Red Circle" 
        className="w-full h-full object-contain opacity-50"
      />
    </motion.div>
  );
};

export default CircleAnimation;