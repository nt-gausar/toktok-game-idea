import { motion } from 'motion/react';
import { Trophy, Crown, Medal, Star, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isVIP: boolean;
  avatar: string;
}

interface LeaderboardProps {
  onBack: () => void;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'Bold_Gamer', score: 12580, isVIP: true, avatar: '🏆' },
  { rank: 2, name: 'Khangai_88', score: 11200, isVIP: true, avatar: '🌟' },
  { rank: 3, name: 'TokTok_Pro', score: 10950, isVIP: false, avatar: '🎯' },
  { rank: 4, name: 'Nomad_Master', score: 9870, isVIP: true, avatar: '🚀' },
  { rank: 5, name: 'FastEater', score: 9320, isVIP: false, avatar: '⚡' },
  { rank: 6, name: 'UB_Champion', score: 8900, isVIP: false, avatar: '🎮' },
  { rank: 7, name: 'Pizza_Lover', score: 8450, isVIP: true, avatar: '🍕' },
  { rank: 8, name: 'Speed_King', score: 8100, isVIP: false, avatar: '👑' },
];

export function Leaderboard({ onBack }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-400';
      case 2:
        return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400';
      case 3:
        return 'bg-gradient-to-r from-orange-100 to-orange-200 border-orange-400';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 pt-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>
          
          <div className="text-center">
            <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-3" />
            <h1 className="text-4xl font-black text-white mb-2">Leaderboard</h1>
            <p className="text-white/90">Top Players This Week</p>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 mb-4 shadow-2xl"
        >
          <div className="flex items-end justify-center gap-4 mb-6">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">
                {mockLeaderboardData[1].avatar}
              </div>
              <div className="bg-gray-200 w-20 h-24 rounded-t-2xl flex flex-col items-center justify-center">
                <Medal className="w-8 h-8 text-gray-400 mb-1" />
                <span className="text-xs font-bold text-gray-700">2nd</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-800">
                {mockLeaderboardData[1].name}
              </p>
              <p className="text-xs text-gray-500">{mockLeaderboardData[1].score}</p>
            </motion.div>

            {/* 1st Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <Crown className="w-8 h-8 text-yellow-500 mb-2 animate-bounce" />
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center text-4xl mb-2 shadow-xl border-4 border-yellow-500">
                {mockLeaderboardData[0].avatar}
              </div>
              <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 w-24 h-32 rounded-t-2xl flex flex-col items-center justify-center shadow-lg">
                <Trophy className="w-10 h-10 text-yellow-600 mb-1" />
                <span className="text-sm font-bold text-yellow-800">1st</span>
              </div>
              <p className="text-sm font-bold mt-2 text-gray-800">
                {mockLeaderboardData[0].name}
              </p>
              <p className="text-sm font-bold text-yellow-600">{mockLeaderboardData[0].score}</p>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center text-3xl mb-2 shadow-lg">
                {mockLeaderboardData[2].avatar}
              </div>
              <div className="bg-orange-200 w-20 h-20 rounded-t-2xl flex flex-col items-center justify-center">
                <Medal className="w-8 h-8 text-orange-600 mb-1" />
                <span className="text-xs font-bold text-orange-800">3rd</span>
              </div>
              <p className="text-xs font-semibold mt-2 text-gray-800">
                {mockLeaderboardData[2].name}
              </p>
              <p className="text-xs text-gray-500">{mockLeaderboardData[2].score}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Rankings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          {mockLeaderboardData.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className={`${getRankBgColor(entry.rank)} border-2 rounded-2xl p-4 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 flex items-center justify-center">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center text-2xl shadow">
                    {entry.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-800">{entry.name}</p>
                      {entry.isVIP && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Rank #{entry.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{entry.score}</p>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Prize Pool Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl p-6 shadow-xl"
        >
          <div className="text-center">
            <Trophy className="w-12 h-12 text-orange-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-gray-800 mb-1">Weekly Prize Pool</p>
            <p className="text-3xl font-black text-orange-600 mb-2">1,000,000₮</p>
            <p className="text-sm text-gray-700">Top 10 players win exclusive rewards!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
