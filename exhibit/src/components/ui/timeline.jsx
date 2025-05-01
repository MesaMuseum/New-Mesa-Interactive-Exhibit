"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

{/* Scroll Icon */}
const ScrollIcon = () => {
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="mt-4"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13L12 18L17 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 7L12 12L17 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [1, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 justify-center pt-70">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-xl md:text-8xl mb-4 text-white font-imfell dark:text-white mb-70">
            Timeline of Mesa History
          </h2>
          <p className="text-neutral-200 dark:text-neutral-300 text-2xl font-imfell max-w-lg">
            Scroll Down to Learn More
          </p>
          <ScrollIcon />
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        <div className="absolute md:left-8 left-8 top-0 h-full w-[2px] bg-white z-10" />

        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-6 w-6 absolute left-5 md:left-5 rounded-full bg-white flex items-center justify-center z-20">
                <div className="h-3 w-3 rounded-full bg-white" />
              </div>
              <motion.h3
                initial={{ opacity: 1 }}
                style={{ opacity: opacityTransform }}
                className="hidden md:block text-xl md:pl-20 md:text-8xl font-lovers text-white"
              >
                {item.title}
              </motion.h3>
            </div>

            <motion.div
              initial={{ opacity: 1 }}
              style={{ opacity: opacityTransform }}
              className="relative pl-20 pr-4 md:pl-4 w-full"
            >
              <h3 className="md:hidden block text-2xl mb-4 text-left font-lovers text-white">
                {item.title}
              </h3>
              <div className="space-y-4">
                <div className="font-imfell text-base md:text-lg text-white font-medium leading-relaxed">
                  {item.content}
                </div>
                {item.images && item.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {item.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative h-48 rounded-lg overflow-hidden bg-gray-200/20 backdrop-blur-sm"
                      >
                        <img
                          src={image}
                          alt={`Event from ${item.title}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-white"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

Timeline.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
