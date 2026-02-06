import { motion } from 'motion/react';
import { Play, Trophy, Gift, Star, Crown, Zap } from 'lucide-react';
import { Button } from './ui/button';
import exampleImage from '../../assets/f5dab7984cd19a35f0e0f5357ee3dfde05c959ad.png';

interface HomeScreenProps {
  onStartGame: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onShowLeaderboard: () => void;
  onShowRewards: () => void;
  playerStats: {
    totalScore: number;
    gamesPlayed: number;
    highScore: number;
    isVIP: boolean;
  };
}

export function HomeScreen({
  onStartGame,
  onShowLeaderboard,
  onShowRewards,
  playerStats,
}: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-4">
      <div className="max-w-md mx-auto">
        {/* Header with VIP Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <span className="text-white font-medium">Welcome to TokTok Games</span>
            {playerStats.isVIP && (
              <Crown className="w-5 h-5 text-yellow-300" />
            )}
          </div>
          <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">
            Food Rush
          </h1>
          <p className="text-white/90 text-lg font-medium">Match & Win Prizes!</p>
        </motion.div>

        {/* Main Game Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 mb-4 shadow-2xl"
        >
          {/* Game Preview Image */}
          <div className="relative mb-6 rounded-2xl overflow-hidden">
            <img
              src={exampleImage}
              alt="Game Preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-bold text-lg">Match food items and win!</p>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
              Choose Difficulty
            </h3>
            
            <Button
              onClick={() => onStartGame('easy')}
              className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-6 rounded-2xl shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Easy - 4x2 Grid
            </Button>

            <Button
              onClick={() => onStartGame('medium')}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-6 rounded-2xl shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Medium - 3x4 Grid
            </Button>

            <Button
              onClick={() => onStartGame('hard')}
              className="w-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold py-6 rounded-2xl shadow-lg"
            >
              <Star className="w-5 h-5 mr-2" />
              Hard - 4x4 Grid
            </Button>
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 mb-4 shadow-2xl"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Your Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                {playerStats.totalScore}
              </div>
              <div className="text-xs text-gray-500 mt-1">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">
                {playerStats.gamesPlayed}
              </div>
              <div className="text-xs text-gray-500 mt-1">Games Played</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">
                {playerStats.highScore}
              </div>
              <div className="text-xs text-gray-500 mt-1">High Score</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <Button
            onClick={onShowLeaderboard}
            className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-6 rounded-2xl shadow-xl"
          >
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Leaderboard
          </Button>

          <Button
            onClick={onShowRewards}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-6 rounded-2xl shadow-xl"
          >
            <Gift className="w-5 h-5 mr-2" />
            Rewards
          </Button>
        </motion.div>

        {/* Daily Bonus Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Daily Bonus Available!</p>
              <p className="text-xs text-gray-700">Play now to earn extra points</p>
            </div>
            <Gift className="w-8 h-8 text-orange-600 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
