"use client"

import { useEffect, useRef } from "react"

const AnimatedText = ({ text, className = "" }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
  
    const spans = containerRef.current.querySelectorAll(".animated-word")
  
    const globalDelay = 1000 // <<<< 🎯 Adjust this to delay the start of animation (in ms)
  
    spans.forEach((span, index) => {
      const wordDelay = index * 0.1
      const totalDelay = globalDelay / 1000 + wordDelay
      span.style.setProperty("--animation-delay", `${totalDelay}s`)
    })
  }, [text])

  if (!text) {
    return <span className="text-red-500">No text provided</span>
  }

  // Create HTML with spans around each word
  const createMarkup = () => {
    // Split text into words
    const words = text.split(" ")

    // Create HTML string with spans around each word
    const html = words
      .map(
        (word, index) =>
          `<span class="animated-word" data-text="${word}">${word}</span>${index < words.length - 1 ? " " : ""}`,
      )
      .join("")

    return { __html: html }
  }

  // Render a span instead of a div
  return <span ref={containerRef} className={`cool ${className}`} dangerouslySetInnerHTML={createMarkup()} />
}

export default AnimatedText
