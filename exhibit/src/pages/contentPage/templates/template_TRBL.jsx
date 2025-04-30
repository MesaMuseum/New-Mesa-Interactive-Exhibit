"use client"

import { useEffect, useRef, useState } from "react"
import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateTRBL = ({ title, topContent, bottomContent, topImage, bottomImage }) => {
  const [topImageSize, setTopImageSize] = useState({ width: 0, height: 0 })
  const [bottomImageSize, setBottomImageSize] = useState({ width: 0, height: 0 })
  const [topImageRatio, setTopImageRatio] = useState(1)
  const [bottomImageRatio, setBottomImageRatio] = useState(1)
  const [topImageLoaded, setTopImageLoaded] = useState(false)
  const [bottomImageLoaded, setBottomImageLoaded] = useState(false)
  const [imagesVisible, setImagesVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [delayedTopImage, setDelayedTopImage] = useState(null)
  const [delayedBottomImage, setDelayedBottomImage] = useState(null)
  const [frozenHeight, setFrozenHeight] = useState(null)
  const [frozenTopHeight, setFrozenTopHeight] = useState(null)
  const [frozenBottomHeight, setFrozenBottomHeight] = useState(null)

  const topTextRef = useRef(null)
  const bottomTextRef = useRef(null)
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const topImageRef = useRef(null)
  const bottomImageRef = useRef(null)
  const topSectionRef = useRef(null)
  const bottomSectionRef = useRef(null)

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
    if (topSectionRef.current) {
      setFrozenTopHeight(topSectionRef.current.offsetHeight)
    }
    if (bottomSectionRef.current) {
      setFrozenBottomHeight(bottomSectionRef.current.offsetHeight)
    }

    // Fade out content when props change (page switch)
    setContentVisible(false)
    setImagesVisible(false)

    // Schedule freezing of height on next frame (after DOM updates)
    const frame = requestAnimationFrame(() => {
      if (contentRef.current) {
        setFrozenHeight(contentRef.current.offsetHeight)
      }
      if (topSectionRef.current) {
        setFrozenTopHeight(topSectionRef.current.offsetHeight)
      }
      if (bottomSectionRef.current) {
        setFrozenBottomHeight(bottomSectionRef.current.offsetHeight)
      }
    })

    // Delay calculations until content has faded out
    const timer = setTimeout(() => {
      // After fade-out, update delayed images
      setDelayedTopImage(topImage)
      setDelayedBottomImage(bottomImage)

      // Start loading images and calculating layout
      setIsCalculating(true)
      loadImages(topImage, bottomImage)

      // Reset frozen heights after new content is loaded
      setFrozenHeight(null)
      setFrozenTopHeight(null)
      setFrozenBottomHeight(null)
    }, 500) // Wait for fade-out to complete

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [title, topContent, bottomContent, topImage, bottomImage])

  // Load images and calculate aspect ratios
  const loadImages = (topImgSrc, bottomImgSrc) => {
    setTopImageLoaded(false)
    setBottomImageLoaded(false)

    const loadImageDimensions = (imgSrc, setRatio, setLoaded, imgRef) => {
      if (!imgSrc) {
        setLoaded(true)
        return
      }
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight
        setRatio(ratio)
        setLoaded(true)
        if (imgRef.current) {
          imgRef.current.dataset.originalWidth = img.naturalWidth
          imgRef.current.dataset.originalHeight = img.naturalHeight
        }
      }
      img.onerror = () => {
        console.error("Failed to load image:", imgSrc)
        setRatio(1)
        setLoaded(true)
      }
      img.src = imgSrc
    }

    loadImageDimensions(topImgSrc, setTopImageRatio, setTopImageLoaded, topImageRef)
    loadImageDimensions(bottomImgSrc, setBottomImageRatio, setBottomImageLoaded, bottomImageRef)
  }

  // Calculate optimal image size and check for text overflow
  useEffect(() => {
    // Only run calculations when we're in calculating state and images are loaded
    if (!isCalculating || !topImageLoaded || !bottomImageLoaded) return

    const calculateLayout = () => {
      if (!containerRef.current) return

      // Get content lengths
      const topTextLength = topContent?.length || 0
      const bottomTextLength = bottomContent?.length || 0

      // Special handling for very short content
      const isTopContentShort = topTextLength < 100
      const isBottomContentShort = bottomTextLength < 100
      const isEmptyContent = bottomTextLength < 5

      // Base sizes adjusted for content length
      const baseSize = 150
      const maxSize = 200

      // Calculate image dimensions based on aspect ratio and content length
      // Top image calculations
      let topWidth, topHeight
      if (isTopContentShort) {
        // For short content, use smaller image
        topWidth = Math.min(maxSize * 0.8, Math.max(minImageSize, baseSize * 0.8))
        topHeight = topWidth / topImageRatio
      } else {
        // Calculate based on content length
        const topContentFactor = Math.max(0.5, Math.min(1, 800 / (topTextLength + 400)))

        if (topImageRatio > 1) {
          // Landscape
          topHeight = Math.min(maxSize, Math.max(minImageSize, baseSize * topContentFactor))
          topWidth = topHeight * topImageRatio

          // Cap width if it gets too large
          if (topWidth > maxSize * 1.5) {
            topWidth = maxSize * 1.5
            topHeight = topWidth / topImageRatio
          }
        } else {
          // Portrait or square
          topWidth = Math.min(maxSize, Math.max(minImageSize, baseSize * topContentFactor))
          topHeight = topWidth / topImageRatio
        }
      }

      // Bottom image calculations
      let bottomWidth, bottomHeight
      if (isEmptyContent) {
        // If content is empty or very short, use minimal image size
        bottomWidth = minImageSize
        bottomHeight = minImageSize
      } else if (isBottomContentShort) {
        // For short content, use smaller image
        bottomWidth = Math.min(maxSize * 0.8, Math.max(minImageSize, baseSize * 0.8))
        bottomHeight = bottomWidth / bottomImageRatio
      } else {
        // Calculate based on content length
        const bottomContentFactor = Math.max(0.5, Math.min(1, 800 / (bottomTextLength + 400)))

        if (bottomImageRatio > 1) {
          // Landscape
          bottomHeight = Math.min(maxSize, Math.max(minImageSize, baseSize * bottomContentFactor))
          bottomWidth = bottomHeight * bottomImageRatio

          // Cap width if it gets too large
          if (bottomWidth > maxSize * 1.5) {
            bottomWidth = maxSize * 1.5
            bottomHeight = bottomWidth / bottomImageRatio
          }
        } else {
          // Portrait or square
          bottomWidth = Math.min(maxSize, Math.max(minImageSize, baseSize * bottomContentFactor))
          bottomHeight = bottomWidth / bottomImageRatio
        }
      }

      // Apply sizes
      setTopImageSize({
        width: topWidth,
        height: topHeight,
      })

      setBottomImageSize({
        width: bottomWidth,
        height: bottomHeight,
      })

      // Check if content fits after a short delay to allow rendering
      setTimeout(() => {
        if (contentRef.current) {
          const contentHeight = contentRef.current.scrollHeight

          // If content is too tall, adjust image sizes
          if (contentHeight > targetMaxHeight) {
            // Calculate reduction factor based on how much we need to shrink
            const reductionFactor = Math.max(0.7, targetMaxHeight / contentHeight)

            setTopImageSize((prev) => ({
              width: prev.width * reductionFactor,
              height: prev.height * reductionFactor,
            }))

            setBottomImageSize((prev) => ({
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
  }, [topContent, bottomContent, topImageRatio, bottomImageRatio, topImageLoaded, bottomImageLoaded, isCalculating])

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
        className="border flex flex-col space-y-4 transition-opacity duration-500"
        style={{
          minHeight: "200px",
          maxHeight: `${targetMaxHeight}px`,
          height: frozenHeight !== null ? `${frozenHeight}px` : "auto",
          overflow: "visible",
          opacity: contentVisible ? 1 : 0,
        }}
      >
        {/* Top section with right image */}
        <div
          className="border flex gap-4 p-4"
          ref={topSectionRef}
          style={{
            height: frozenTopHeight !== null ? `${frozenTopHeight}px` : "auto",
            transition: "height 0.3s ease",
          }}
        >
          <div className="flex-1">
            <p className="text-gray-700 text-lg" ref={topTextRef}>
              <AnimatedText text={topContent} />
            </p>
          </div>
          <div
            className="flex-shrink-0 transition-opacity duration-500 flex items-center justify-center"
            style={{
              opacity: imagesVisible ? 1 : 0,
              width: `${topImageSize.width}px`,
              height: `${topImageSize.height}px`,
            }}
          >
            {delayedTopImage && (
              <img
                ref={topImageRef}
                src={delayedTopImage || "/placeholder.svg"}
                alt="Top template illustration"
                className="object-contain w-full h-full"
              />
            )}
          </div>
        </div>

        {/* Bottom section with left image */}
        <div
          className="border flex gap-4"
          ref={bottomSectionRef}
          style={{
            height: frozenBottomHeight !== null ? `${frozenBottomHeight}px` : "auto",
            transition: "height 0.3s ease",
          }}
        >
          <div
            className="flex-shrink-0 transition-opacity duration-500 flex items-center justify-center"
            style={{
              opacity: imagesVisible ? 1 : 0,
              width: `${bottomImageSize.width}px`,
              height: `${bottomImageSize.height}px`,
            }}
          >
            {delayedBottomImage && (
              <img
                ref={bottomImageRef}
                src={delayedBottomImage || "/placeholder.svg"}
                alt="Bottom template illustration"
                className="object-contain w-full h-full"
              />
            )}
          </div>
          <div className="flex-1">
            <p className="text-gray-700 text-lg p-4" ref={bottomTextRef}>
              <AnimatedText text={bottomContent} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateTRBL
