"use client"

import { useState, useEffect } from "react"
import { BookOpen, GraduationCap, Heart, Coffee, Star, Music, Sparkles, Code } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function ThankYouCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const triggerConfetti = () => {
    const duration = 3 * 1000
    const end = Date.now() + duration

    const colors = ["#7C3AED", "#EC4899", "#F59E0B"]
    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })
    ()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX - innerWidth / 2) / 50
      const y = (clientY - innerHeight / 2) / 50
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    if (!isFlipped) {
      triggerConfetti()
      setShowConfetti(true)
    }
  }

  const memories = [
    {
      icon: "💻",
      text: "Your Data Structure lectures were amazing!",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: "🌟",
      text: "Thanks for making coding fun!",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: "🎯",
      text: "Best programming teacher ever!",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: "✨",
      text: "You inspired us to be better!",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const floatingElements = [
    { Icon: Star, delay: 0, rotate: 0 },
    { Icon: Code, delay: 0.2, rotate: 45 },
    { Icon: Coffee, delay: 0.4, rotate: -45 },
    { Icon: Sparkles, delay: 0.6, rotate: 90 },
    { Icon: Music, delay: 0.8, rotate: -90 },
  ]

  return (
    <div className="min-h-screen bg-[#0D0B1F] flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/50 to-pink-900/20" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-500/10 to-transparent" />
        
        {floatingElements.map(({ Icon, delay, rotate }, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 5,
              delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              left: `${(index + 1) * 15}%`,
              top: `${(index + 1) * 10}%`,
              rotate: `${rotate}deg`,
            }}
          >
            <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-white/10" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className={`w-full max-w-md sm:max-w-2xl aspect-[3/4] relative transition-all duration-1000 cursor-pointer preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={handleFlip}
        animate={{
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
        }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="absolute inset-0 backface-hidden">
          
          <motion.div
            className="w-full h-full rounded-xl shadow-2xl p-4 sm:p-8 flex flex-col items-center justify-between overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(67, 26, 131, 0.9) 0%, rgba(96, 38, 158, 0.9) 100%)",
              boxShadow: "0 0 40px rgba(123, 31, 162, 0.5)",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <motion.div
                className="absolute w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-purple-500/30 blur-3xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute right-0 bottom-0 w-32 h-32 sm:w-64 sm:h-64 rounded-full bg-pink-500/30 blur-3xl"
                animate={{
                  x: [0, -100, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center space-y-4 sm:space-y-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse " />
                <GraduationCap className="w-16 h-16 sm:w-24 sm:h-24 text-white relative z-10 -mt-6" />
              </motion.div>
              <motion.div
                className="max-w-md text-center space-y-2 sm:space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="italic text-sm sm:text-lg text-white/90 font-light">
                &apos;A great teacher takes a hand, opens a mind, and touches a heart.&apos;
                </p>
              </motion.div>
            </div>

            <motion.div
              className="relative z-10 flex items-center gap-2 text-white/80 text-xs sm:text-sm"
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <span>Click to open</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 rotate-y-180 backface-hidden">
          <motion.div
            className="w-full h-[80vh] bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl shadow-2xl p-2 sm:p-4 flex flex-col overflow-y-auto"
            style={{
              boxShadow: "0 0 40px rgba(123, 31, 162, 0.5)",
            }}
          >
            <div className="flex-1 space-y-2 sm:space-y-4 relative">
              <motion.div
                className="text-center space-y-1 sm:space-y-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Dear Sir Ali Aftab,
                </h2>
              </motion.div>

              <motion.div
                className="space-y-2 sm:space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                  <h2 className="-mt-4">  Dear Sir Ali Aftab,</h2>
                <p className="text-gray-300 leading-relaxed text-base sm:text-base text-center font-serif">
As we bid farewell to this chapter of our educational journey, we want to take a moment to express our deepest gratitude for everything you&apos;ve done for us. Throughout our time together, 
you&apos;ve been so much more than just a teacher—you&apos;ve been a mentor, a guide, and a true inspiration. Your unwavering support, 
patience, and dedication have left a lasting imprint on each one of us.

In your classes, we didn&apos;t just learn the subject matter; we learned the values of hard work, perseverance, and the importance of
 self-belief. You&apos;ve equipped us with skills and knowledge that will stay with us forever, shaping not only our academic paths 
 but also our personal growth.
Thank you, Sir Ali, for being a constant source of guidance and inspiration. This is not goodbye; it&apos;s just a heartfelt thank 
you for everything you&apos;ve given us. </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {memories.map((memory, index) => (
                    <motion.div
                      key={index}
                      className={`relative overflow-hidden rounded-lg p-2 sm:p-4 bg-gradient-to-br ${memory.color}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm" />
                      <div className="relative z-10">
                        <span className="text-xl sm:text-2xl">{memory.icon}</span>
                        <p className="text-white text-xs sm:text-sm mt-1 sm:mt-2">{memory.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 sm:gap-4">
                  {[BookOpen, Heart, GraduationCap, Star].map((Icon, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.2, rotate: 10 }} className="text-purple-400">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <motion.div
              className="text-center space-y-1 sm:space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700">
                  Thank You,
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 mt-2">
                  Sir Ali Aftab!
                </span>
              </h1>
            </motion.div>
            <motion.div
              className="text-center space-y-1 sm:space-y-2 mt-2 sm:mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <p className="text-gray-400 font-medium text-xs sm:text-sm">With gratitude,</p>
              <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Your Students ❤️
              </p>
              <div className="flex flex-col gap-1 sm:gap-2">
                <motion.div
                  className="text-sm sm:text-base font-semibold"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Javeria Fatima
                  </span>
                </motion.div>
                <motion.div
                  className="text-sm sm:text-base font-semibold"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    Seerat Fatima
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}