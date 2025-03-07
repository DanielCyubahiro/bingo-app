import React, { useCallback, useEffect, useRef, useState } from 'react'
import { movieTropes } from '../data/tropes'
import '../styles/bingo-board.css'
import Lottie from 'lottie-web'
import fireworksAnimation from '../animations/fireworks.json'
import bingoAnimation from '../animations/bingo.json'
import Button from './button'

const BingoBoard = () => {
  const [board, setBoard] = useState([])
  const [markedCards, setMarkedCards] = useState([12])
  const [completedWinningLines, setCompletedWinningLines] = useState([])
  const [winCount, setWinCount] = useState(0)
  const [animateWin, setAnimateWin] = useState(false)
  const [showFireworksAnimation, setShowFireworksAnimation] = useState(false)
  const [showBingoAnimation, setShowBingoAnimation] = useState(false)
  const [showReset, setShowReset] = useState(false)

  const fireworksContainerRef = useRef(null)
  const bingoContainerRef = useRef(null)

  const WINNING_LINES = [
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
  ]

  // Generates a shuffled bingo board with a free space in the center
  const generateBoard = useCallback(() => {
    const shuffledTropes = [...movieTropes].sort(() => 0.5 - Math.random())
    shuffledTropes.splice(12, 0, 'Movie time')
    return shuffledTropes.slice(0, 25)
  }, [])

  useEffect(() => {
    setBoard(generateBoard()) // Initialize the board
  }, [generateBoard])

  // Toggle the marking of a card, excluding the center card (index 12)
  const toggleCard = useCallback((index) => {
    if (index === 12) return
    setMarkedCards((prevMarked) =>
      prevMarked.includes(index)
        ? prevMarked.filter((i) => i !== index)
        : [...prevMarked, index],
    )
  }, [])

  // Updates the win count and completed lines when a card is marked
  const updateWins = useCallback((markedCards) => {
    // Find all newly completed winning lines
    const newlyCompletedLines = WINNING_LINES.filter((line, index) =>
      line.every((i) => markedCards.includes(i)) && !completedWinningLines.includes(index),
    )
    // Find any lines that were previously completed but are no longer complete
    const lostLines = completedWinningLines.filter((lineIndex) =>
      !WINNING_LINES[lineIndex].every((i) => markedCards.includes(i)),
    )

    // Update the completed winning lines by removing lost lines and adding newly completed lines
    setCompletedWinningLines((prev) => [
      ...prev.filter((lineIndex) => !lostLines.includes(lineIndex)),
      ...newlyCompletedLines.map((line) => WINNING_LINES.indexOf(line)),
    ])

    // Update the win count based on newly completed lines and lost lines
    setWinCount((prevWinCount) => prevWinCount + newlyCompletedLines.length - lostLines.length)

    // If there are newly completed lines, trigger the bingo animation
    if (newlyCompletedLines.length > 0) {
      setAnimateWin(true)
      setTimeout(() => setAnimateWin(false), 500)

      setShowBingoAnimation(true)
      setTimeout(() => {
        setShowBingoAnimation(false)
      }, 1700)
    }
    // eslint-disable-next-line
  }, [completedWinningLines])

  useEffect(() => {
    updateWins(markedCards) // Check for completed winning lines
    // eslint-disable-next-line
  }, [markedCards])

  // Show fireworks when the game is won and the board is filled for 5 seconds
  useEffect(() => {
    if (winCount > 0 && markedCards.length === 25) {
      setShowFireworksAnimation(true)
      setTimeout(() => {
        setShowFireworksAnimation(false)
        setShowReset(true)
      }, 5000)
    }
  }, [winCount, markedCards])

  // Initialize and clean up fireworks animation using Lottie
  useEffect(() => {
    if (showFireworksAnimation && fireworksContainerRef.current) {
      const animationInstance = Lottie.loadAnimation({
        container: fireworksContainerRef.current,
        animationData: fireworksAnimation,
        loop: true,
        autoplay: true,
      })

      return () => animationInstance.destroy()  // Cleanup the animation
    }
  }, [showFireworksAnimation])

  // Initialize and clean up bingo animation using Lottie
  useEffect(() => {
    if (showBingoAnimation && bingoContainerRef.current) {
      const animationInstance = Lottie.loadAnimation({
        container: bingoContainerRef.current,
        animationData: bingoAnimation,
        loop: false,
        autoplay: true,
      })

      return () => animationInstance.destroy()  // Cleanup the animation
    }
  }, [showBingoAnimation])

  // Reset the game to its initial state
  const resetGame = useCallback(() => {
    setBoard(generateBoard())
    setMarkedCards([12])
    setCompletedWinningLines([])
    setWinCount(0)
    setShowReset(false)
  }, [generateBoard])

  return (
    <>
      <div className="heading-container">
        <h1>📽️Movie Bingo📽️</h1>
      </div>

      <div className={`bingo-grid ${showReset ? 'disabled' : ''}`}>
        {board.map((trope, index) => (
          <div
            key={index}
            className={`card ${markedCards.includes(index) ? 'marked' : ''} ${index === 12 ? 'center-card' : ''}`}
            onClick={() => toggleCard(index)}
          >
            {index === 12 ? '' : trope}
          </div>
        ))}
      </div>

      <div className={`win-counter ${animateWin ? 'animate' : ''}`}>
        <h2>Bingos: {winCount}</h2>
      </div>

      {showBingoAnimation && <div className="fireworks-overlay" ref={bingoContainerRef}></div>}
      {showFireworksAnimation && <div className="fireworks-overlay" ref={fireworksContainerRef}></div>}

      {showReset && (<Button onClick={resetGame}>Play again</Button>)}
    </>
  )
}

export default BingoBoard
