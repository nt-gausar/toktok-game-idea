import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameCard, Card } from './GameCard';
import { Trophy, Clock, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';

const foodEmojis = ['🍕', '🍔', '🍣', '🍦', '🍟', '🍩', '🌮', '🍱'];

interface GameBoardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onGameComplete: (score: number, time: number) => void;
  onBack: () => void;
}

export function GameBoard({ difficulty, onGameComplete, onBack }: GameBoardProps) {
  const gridSize = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  // Timer
  useEffect(() => {
    if (!gameStarted) return;
    
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted]);

  const initializeGame = () => {
    const pairsNeeded = (gridSize * gridSize) / 2;
    const selectedEmojis = foodEmojis.slice(0, pairsNeeded);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        foodType: emoji,
        emoji,
        matched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setScore(0);
    setCombo(0);
    setTime(0);
    setGameStarted(true);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards[cardId].matched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.foodType === secondCard.foodType) {
        // Match found!
        const newCombo = combo + 1;
        setCombo(newCombo);
        const points = 100 + (newCombo * 50); // Combo bonus
        setScore((prev) => prev + points);

        setTimeout(() => {
          setCards((prev) =>
            prev.map((card, idx) =>
              idx === firstId || idx === secondId ? { ...card, matched: true } : card
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setFlippedCards([]);
        }, 600);
      } else {
        // No match
        setCombo(0);
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check if game is complete
  useEffect(() => {
    if (matchedPairs === (gridSize * gridSize) / 2 && matchedPairs > 0) {
      setTimeout(() => {
        onGameComplete(score, time);
      }, 500);
    }
  }, [matchedPairs, score, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl p-4 mb-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-600"
            >
              ← Back
            </Button>
            <span className="text-sm font-semibold text-gray-500 uppercase">
              {difficulty}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Score */}
            <div className="flex flex-col items-center">
              <Trophy className="w-6 h-6 text-yellow-500 mb-1" />
              <span className="text-2xl font-bold text-gray-800">{score}</span>
              <span className="text-xs text-gray-500">Score</span>
            </div>

            {/* Time */}
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-blue-500 mb-1" />
              <span className="text-2xl font-bold text-gray-800">{formatTime(time)}</span>
              <span className="text-xs text-gray-500">Time</span>
            </div>

            {/* Combo */}
            <div className="flex flex-col items-center">
              <Zap className="w-6 h-6 text-orange-500 mb-1" />
              <span className="text-2xl font-bold text-gray-800">{combo}x</span>
              <span className="text-xs text-gray-500">Combo</span>
            </div>
          </div>
        </div>

        {/* Combo Animation */}
        <AnimatePresence>
          {combo >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl p-3 mb-4 text-center shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 animate-spin" />
                <span className="font-bold text-lg">{combo}x Combo! +{combo * 50} Bonus!</span>
                <Star className="w-5 h-5 animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Grid */}
        <div
          className="grid gap-3 mb-4"
          style={{
            gridTemplateColumns: `repeat(${gridSize / 2}, 1fr)`,
          }}
        >
          {cards.map((card) => (
            <GameCard
              key={card.id}
              card={card}
              isFlipped={flippedCards.includes(card.id) || card.matched}
              isDisabled={flippedCards.length === 2 || card.matched}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-bold text-gray-800">
              {matchedPairs} / {(gridSize * gridSize) / 2}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(matchedPairs / ((gridSize * gridSize) / 2)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
