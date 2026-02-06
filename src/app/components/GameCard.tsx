import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export interface Card {
  id: number;
  foodType: string;
  emoji: string;
  matched: boolean;
}

interface GameCardProps {
  card: Card;
  isFlipped: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export function GameCard({ card, isFlipped, isDisabled, onClick }: GameCardProps) {
  const [localFlipped, setLocalFlipped] = useState(isFlipped);

  useEffect(() => {
    setLocalFlipped(isFlipped);
  }, [isFlipped]);

  return (
    <motion.button
      className={`relative w-full aspect-square ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={isDisabled ? undefined : onClick}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: localFlipped ? 180 : 0 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Back of card (question mark) */}
          <div
            className="absolute inset-0 rounded-2xl shadow-lg flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #FDB500 0%, #FF9800 100%)',
            }}
          >
            <span className="text-6xl font-bold text-white opacity-80">?</span>
          </div>

          {/* Front of card (food emoji) */}
          <div
            className="absolute inset-0 rounded-2xl shadow-lg flex items-center justify-center bg-white border-4 border-yellow-400"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <span className="text-6xl">{card.emoji}</span>
          </div>
        </motion.div>
      </div>

      {card.matched && (
        <motion.div
          className="absolute inset-0 bg-green-500/20 rounded-2xl border-4 border-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
