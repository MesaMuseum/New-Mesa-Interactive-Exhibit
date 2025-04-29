import { useEffect, useRef, useState } from "react"
import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateTLBR = ({ title, topContent, bottomContent, topImage, bottomImage }) => {
  const [topImageSize, setTopImageSize] = useState({ width: 128, height: 128 })
  const [bottomImageSize, setBottomImageSize] = useState({ width: 128, height: 128 })
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

  const topSectionRef = useRef(null)
const bottomSectionRef = useRef(null)

const [frozenTopHeight, setFrozenTopHeight] = useState(null)
const [frozenBottomHeight, setFrozenBottomHeight] = useState(null)

  const topTextRef = useRef(null)
  const bottomTextRef = useRef(null)
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const topImageRef = useRef(null)
  const bottomImageRef = useRef(null)

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

  useEffect(() => {
    if (contentRef.current) {
      const measuredHeight = contentRef.current.offsetHeight
      setFrozenHeight(measuredHeight)
    }

    if (topSectionRef.current) {
      setFrozenTopHeight(topSectionRef.current.offsetHeight)
    }
    if (bottomSectionRef.current) {
      setFrozenBottomHeight(bottomSectionRef.current.offsetHeight)
    }
    // Fade out content and images
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
  
    // Delay before loading new images
    const timer = setTimeout(() => {
      // After fade-out, update delayed images

      setDelayedTopImage(topImage)
      setDelayedBottomImage(bottomImage)
  
      // Start calculating layout with the new images
      setIsCalculating(true)
      loadImages(topImage, bottomImage)

      setFrozenHeight(null)
      setFrozenTopHeight(null)
      setFrozenBottomHeight(null)
    }, 500) // match your fade-out duration
  
    return () => clearTimeout(timer)
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
      const baseSize = 128
      const maxSize = 200

      // Calculate image dimensions based on aspect ratio and content length
      const calculateImageDimensions = () => {
        // For landscape images (width > height), prioritize height
        // For portrait images (height > width), prioritize width

        // Top image calculations
        let topWidth, topHeight
        if (topImageRatio > 1) {
          // Landscape
          // For landscape, set a reasonable height and calculate width
          topHeight = isTopContentShort
            ? 100
            : Math.min(160, Math.max(minImageSize, baseSize * (1000 / (topTextLength + 500))))
          topWidth = topHeight * topImageRatio

          // Cap width if it gets too large
          if (topWidth > maxSize * 1.5) {
            topWidth = maxSize * 1.5
            topHeight = topWidth / topImageRatio
          }
        } else {
          // Portrait or square
          topWidth = Math.min(maxSize, Math.max(minImageSize, baseSize * (1000 / (topTextLength + 500))))
          topHeight = topWidth / topImageRatio
        }

        // Bottom image calculations
        let bottomWidth, bottomHeight
        if (isEmptyContent) {
          // If content is empty or very short, use minimal image size
          bottomWidth = minImageSize
          bottomHeight = minImageSize
        } else if (bottomImageRatio > 1) {
          // Landscape
          bottomHeight = isBottomContentShort
            ? 100
            : Math.min(160, Math.max(minImageSize, baseSize * (1000 / (bottomTextLength + 500))))
          bottomWidth = bottomHeight * bottomImageRatio

          // Cap width if it gets too large
          if (bottomWidth > maxSize * 1.5) {
            bottomWidth = maxSize * 1.5
            bottomHeight = bottomWidth / bottomImageRatio
          }
        } else {
          // Portrait or square
          bottomWidth = Math.min(maxSize, Math.max(minImageSize, baseSize * (1000 / (bottomTextLength + 500))))
          bottomHeight = bottomWidth / bottomImageRatio
        }

        return { topWidth, topHeight, bottomWidth, bottomHeight }
      }

      // Get initial dimensions
      const { topWidth, topHeight, bottomWidth, bottomHeight } = calculateImageDimensions()

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
        className="flex flex-col max-w-2xl mx-auto w-full transition-opacity duration-500"
        style={{
          minHeight: "200px",
          maxHeight: `${targetMaxHeight}px`,
          height: frozenHeight !== null ? `${frozenHeight}px` : "auto",
          overflow: "visible",
          opacity: contentVisible ? 1 : 0,
        }}
      >
        <div className="border p-4 pb-1 relative"
          ref={topSectionRef}
          style={{
            height: frozenTopHeight !== null ? `${frozenTopHeight}px` : "auto",
            transition: "height 0.3s ease", // Optional
          }}>
          {topImage && (
            <img
              ref={topImageRef}
              src={delayedTopImage || "/placeholder.svg"}
              alt="Top template image"
              className="bg-black float-left transition-opacity duration-500"
              style={{
                width: `${topImageSize.width}px`,
                height: `${topImageSize.height}px`,
                shapeOutside: "margin-box",
                margin: "0 16px 10px 0",
                objectFit: "cover",
                opacity: imagesVisible ? 1 : 0,
              }}
            />
          )}
          <p className="text-gray-700 text-lg" ref={topTextRef}>
            <AnimatedText text={topContent} />
          </p>
        </div>

        <div className="border p-4 relative"
          ref={bottomSectionRef}
          style={{
            height: frozenBottomHeight !== null ? `${frozenBottomHeight}px` : "auto",
            transition: "height 0.3s ease", // Optional
          }}>
          {bottomImage && bottomContent && bottomContent.trim().length > 0 && (
            <img
              ref={bottomImageRef}
              src={delayedBottomImage || "/placeholder.svg"}
              alt="Bottom template image"
              className="bg-black float-right transition-opacity duration-500"
              style={{
                width: `${bottomImageSize.width}px`,
                height: `${bottomImageSize.height}px`,
                shapeOutside: "margin-box",
                margin: "0 0 10px 16px",
                objectFit: "cover",
                opacity: imagesVisible ? 1 : 0,
              }}
            />
          )}
          <p className="text-gray-700 text-lg" ref={bottomTextRef}>
            <AnimatedText text={bottomContent} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default TemplateTLBR
