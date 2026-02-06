import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Clock, Home, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface GameCompleteModalProps {
  isOpen: boolean;
  score: number;
  time: number;
  onPlayAgain: () => void;
  onBackHome: () => void;
}

export function GameCompleteModal({
  isOpen,
  score,
  time,
  onPlayAgain,
  onBackHome,
}: GameCompleteModalProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceRating = () => {
    if (score >= 1500) return { text: 'Amazing!', emoji: '🏆', color: 'text-yellow-500' };
    if (score >= 1000) return { text: 'Great!', emoji: '⭐', color: 'text-purple-500' };
    if (score >= 500) return { text: 'Good!', emoji: '🎯', color: 'text-blue-500' };
    return { text: 'Nice Try!', emoji: '👍', color: 'text-green-500' };
  };

  const rating = getPerformanceRating();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onBackHome}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              {/* Celebration Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-6"
              >
                <div className="text-8xl mb-2">{rating.emoji}</div>
                <h2 className={`text-4xl font-black ${rating.color} mb-2`}>
                  {rating.text}
                </h2>
                <p className="text-gray-600">Game Complete!</p>
              </motion.div>

              {/* Confetti Effect */}
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: [0, 1, 0] }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 1,
                      repeat: 2,
                    }}
                  >
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Score */}
                  <div className="text-center">
                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-3xl font-black text-gray-800">{score}</p>
                    <p className="text-sm text-gray-600">Final Score</p>
                  </div>

                  {/* Time */}
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-3xl font-black text-gray-800">{formatTime(time)}</p>
                    <p className="text-sm text-gray-600">Time</p>
                  </div>
                </div>

                {/* Points Earned */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 bg-white rounded-xl p-3 text-center"
                >
                  <p className="text-sm text-gray-600 mb-1">Points Earned</p>
                  <p className="text-2xl font-bold text-purple-600">+{Math.floor(score / 10)}</p>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={onPlayAgain}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-2xl shadow-lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Play Again
                </Button>

                <Button
                  onClick={onBackHome}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-2xl"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </div>

              {/* Bonus Message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-sm text-gray-500 mt-4"
              >
                Keep playing to earn more rewards! 🎁
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
