"use client"

import { useEffect, useRef, useState } from "react"
import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateTC = ({ title, topContent, bottomContent, topImage, bottomImage }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [imageRatio, setImageRatio] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imagesVisible, setImagesVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [delayedImage, setDelayedImage] = useState(null)
  const [frozenHeight, setFrozenHeight] = useState(null)
  const [frozenImageHeight, setFrozenImageHeight] = useState(null)
  const [frozenTextHeight, setFrozenTextHeight] = useState(null)

  const topTextRef = useRef(null)
  const bottomTextRef = useRef(null)
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const imageSectionRef = useRef(null)
  const textSectionRef = useRef(null)

  const maxContainerWidth = 672 // max-w-2xl = 672px
  const targetMaxHeight = 600 // Target maximum height for the content container
  const minImageSize = 80 // Minimum image dimension

  // Fade in content when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true)
    }, 100)

    return () => {
      clearTimeout(timer)
      setContentVisible(false)
    }
  }, [])

  // Handle page transitions - track props changes
  useEffect(() => {
    if (contentRef.current) {
      setFrozenHeight(contentRef.current.offsetHeight)
    }
    if (imageSectionRef.current) {
      setFrozenImageHeight(imageSectionRef.current.offsetHeight)
    }
    if (textSectionRef.current) {
      setFrozenTextHeight(textSectionRef.current.offsetHeight)
    }

    // Fade out content when props change (page switch)
    setContentVisible(false)
    setImagesVisible(false)

    // Schedule freezing of height on next frame (after DOM updates)
    const frame = requestAnimationFrame(() => {
      if (contentRef.current) {
        setFrozenHeight(contentRef.current.offsetHeight)
      }
      if (imageSectionRef.current) {
        setFrozenImageHeight(imageSectionRef.current.offsetHeight)
      }
      if (textSectionRef.current) {
        setFrozenTextHeight(textSectionRef.current.offsetHeight)
      }
    })

    // Delay calculations until content has faded out
    const timer = setTimeout(() => {
      // After fade-out, update delayed image
      setDelayedImage(topImage)

      // Start loading images and calculating layout
      setIsCalculating(true)
      loadImage(topImage)

      // Reset frozen heights after new content is loaded
      setFrozenHeight(null)
      setFrozenImageHeight(null)
      setFrozenTextHeight(null)
    }, 500) // Wait for fade-out to complete

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [title, topContent, bottomContent, topImage, bottomImage])

  // Load image and calculate aspect ratio
  const loadImage = (imgSrc) => {
    setImageLoaded(false)

    if (!imgSrc) {
      setImageLoaded(true)
      return
    }

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight
      setImageRatio(ratio)
      setImageLoaded(true)
      if (imageRef.current) {
        imageRef.current.dataset.originalWidth = img.naturalWidth
        imageRef.current.dataset.originalHeight = img.naturalHeight
      }
    }
    img.onerror = () => {
      console.error("Failed to load image:", imgSrc)
      setImageRatio(1)
      setImageLoaded(true)
    }
    img.src = imgSrc
  }

  // Calculate optimal image size and check for text overflow
  useEffect(() => {
    // Only run calculations when we're in calculating state and image is loaded
    if (!isCalculating || !imageLoaded) return

    const calculateLayout = () => {
      if (!containerRef.current) return

      // Get content lengths
      const topTextLength = topContent?.length || 0
      const bottomTextLength = bottomContent?.length || 0
      const totalTextLength = topTextLength + bottomTextLength

      // Special handling for very short content
      const isContentShort = totalTextLength < 200
      const isEmptyContent = totalTextLength < 10

      // Base sizes adjusted for content length
      const baseSize = 200
      const maxSize = 300

      // Calculate image dimensions based on aspect ratio and content length
      let imageWidth, imageHeight

      if (isEmptyContent) {
        // If content is empty or very short, use maximal image size
        imageWidth = maxSize
        imageHeight = maxSize / imageRatio
      } else {
        // Calculate size based on content length
        const contentFactor = Math.max(0.5, Math.min(1, 1000 / (totalTextLength + 500)))

        if (imageRatio > 1) {
          // Landscape image
          imageHeight = Math.min(maxSize, Math.max(minImageSize, baseSize * contentFactor))
          imageWidth = imageHeight * imageRatio

          // Cap width if it gets too large
          if (imageWidth > maxSize * 1.5) {
            imageWidth = maxSize * 1.5
            imageHeight = imageWidth / imageRatio
          }
        } else {
          // Portrait or square image
          imageWidth = Math.min(maxSize, Math.max(minImageSize, baseSize * contentFactor))
          imageHeight = imageWidth / imageRatio

          // Cap height if it gets too large
          if (imageHeight > maxSize * 1.5) {
            imageHeight = maxSize * 1.5
            imageWidth = imageHeight * imageRatio
          }
        }
      }

      // Apply sizes
      setImageSize({
        width: imageWidth,
        height: imageHeight,
      })

      // Check if content fits after a short delay to allow rendering
      setTimeout(() => {
        if (contentRef.current) {
          const contentHeight = contentRef.current.scrollHeight

          // If content is too tall, adjust image size
          if (contentHeight > targetMaxHeight) {
            // Calculate reduction factor based on how much we need to shrink
            const reductionFactor = Math.max(0.7, targetMaxHeight / contentHeight)

            setImageSize((prev) => ({
              width: prev.width * reductionFactor,
              height: prev.height * reductionFactor,
            }))
          }

          // Calculations complete, show content
          setIsCalculating(false)
          setContentVisible(true)

          // Delay showing images until content is visible
          setTimeout(() => {
            setImagesVisible(true)
          }, 500) // 500ms delay before showing images
        }
      }, 100)
    }

    // Run calculation after a short delay
    const timer = setTimeout(calculateLayout, 100)

    // Recalculate on window resize
    window.addEventListener("resize", calculateLayout)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", calculateLayout)
    }
  }, [topContent, bottomContent, imageRatio, imageLoaded, isCalculating])

  return (
    <div className="w-full md:w-[48%] flex align-center flex-col p-4 rounded-lg pt-6" ref={containerRef}>
      <hr className="w-[80%] mx-auto border-black mt-5" />
      <h3
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl m-auto font-lovers font-bold text-black mb-1 mt-3 transition-opacity duration-500"
        style={{ opacity: contentVisible ? 1 : 0 }}
      >
        <AnimatedText text={title} />
      </h3>
      <hr className="w-[80%] mx-auto border-black mb-5" />

      <div
        ref={contentRef}
        className="flex flex-col max-w-2xl mx-auto w-full transition-opacity duration-500"
        style={{
          minHeight: "200px",
          maxHeight: `${targetMaxHeight}px`,
          height: frozenHeight !== null ? `${frozenHeight}px` : "auto",
          overflow: "visible",
          opacity: contentVisible ? 1 : 0,
        }}
      >
        <div
          className="mx-auto mb-4 transition-opacity duration-500 flex justify-center"
          ref={imageSectionRef}
          style={{
            height: frozenImageHeight !== null ? `${frozenImageHeight}px` : "auto",
            opacity: imagesVisible ? 1 : 0,
            transition: "height 0.3s ease, opacity 0.5s ease",
          }}
        >
          {delayedImage && (
            <img
              ref={imageRef}
              src={delayedImage || "/placeholder.svg"}
              alt="Template illustration"
              className="object-contain"
              style={{
                width: `${imageSize.width}px`,
                height: `${imageSize.height}px`,
              }}
            />
          )}
        </div>

        <div
          className="p-4"
          ref={textSectionRef}
          style={{
            height: frozenTextHeight !== null ? `${frozenTextHeight}px` : "auto",
            transition: "height 0.3s ease",
          }}
        >
          <p className="text-gray-700 text-lg" ref={topTextRef}>
            <AnimatedText text={topContent} />
          </p>
          <p className="text-gray-700 text-lg" ref={bottomTextRef}>
            <AnimatedText text={bottomContent} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default TemplateTC
