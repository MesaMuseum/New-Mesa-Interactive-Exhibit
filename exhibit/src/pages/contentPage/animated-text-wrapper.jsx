"use client"

import { useEffect, useState } from "react"
import AnimatedText from "./AnimatedText"

const AnimatedTextWrapper = ({ content, className = "" }) => {
  const [text, setText] = useState("")

  useEffect(() => {
    // Reset and set the new content
    setText(content || "")
  }, [content])

  return <AnimatedText text={text} className={className} />
}

export default AnimatedTextWrapper
