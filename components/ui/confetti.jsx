"use client"

import { useEffect } from "react"
import JSConfetti from "js-confetti"

export const Confetti = () => {
  useEffect(() => {
    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti({
      emojis: ["🌈", "⚡️", "💫", "✨", "🎉", "🎊", "🌟"],
      emojiSize: 30,
      confettiNumber: 60,
    })

    return () => {
      // Cleanup if needed
    }
  }, [])

  return null
}
