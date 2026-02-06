import { motion } from 'motion/react';
import { Gift, Crown, Star, Ticket, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RewardsScreenProps {
  onBack: () => void;
  isVIP: boolean;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  points: number;
  icon: string;
  isVIPOnly: boolean;
  type: 'coupon' | 'gift' | 'special';
}

const rewards: Reward[] = [
  {
    id: 1,
    title: '₮10,000 Coupon',
    description: 'Valid for any TokTok order',
    points: 1000,
    icon: '🎫',
    isVIPOnly: false,
    type: 'coupon',
  },
  {
    id: 2,
    title: '₮25,000 Coupon',
    description: 'Valid for any TokTok order',
    points: 2500,
    icon: '🎟️',
    isVIPOnly: false,
    type: 'coupon',
  },
  {
    id: 3,
    title: 'Free Delivery (3x)',
    description: '3 free deliveries on any order',
    points: 1500,
    icon: '🚚',
    isVIPOnly: false,
    type: 'special',
  },
  {
    id: 4,
    title: '₮50,000 VIP Coupon',
    description: 'Exclusive VIP discount',
    points: 4000,
    icon: '💎',
    isVIPOnly: true,
    type: 'coupon',
  },
  {
    id: 5,
    title: 'Mystery Gift Box',
    description: 'Random premium reward',
    points: 3000,
    icon: '🎁',
    isVIPOnly: true,
    type: 'gift',
  },
  {
    id: 6,
    title: 'VIP Gold Status',
    description: '1 month of VIP benefits',
    points: 5000,
    icon: '👑',
    isVIPOnly: false,
    type: 'special',
  },
];

export function RewardsScreen({ onBack, isVIP }: RewardsScreenProps) {
  const userPoints = 2800; // Mock user points

  const canRedeem = (reward: Reward) => {
    if (reward.isVIPOnly && !isVIP) return false;
    return userPoints >= reward.points;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-4">
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
            <Gift className="w-16 h-16 text-yellow-300 mx-auto mb-3" />
            <h1 className="text-4xl font-black text-white mb-2">Rewards Shop</h1>
            <p className="text-white/90">Redeem your points for amazing prizes!</p>
          </div>
        </motion.div>

        {/* Points Balance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 mb-6 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Your Balance</p>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {userPoints}
              </p>
              <p className="text-sm text-gray-500">points available</p>
            </div>
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </div>
          
          {isVIP && (
            <div className="mt-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-3 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-semibold text-gray-800">
                VIP Status Active - Access to exclusive rewards!
              </span>
            </div>
          )}
        </motion.div>

        {/* VIP Benefits Banner */}
        {!isVIP && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white mb-1">Become a VIP!</p>
                <p className="text-xs text-white/90">Unlock exclusive premium rewards</p>
              </div>
              <Crown className="w-10 h-10 text-yellow-200" />
            </div>
          </motion.div>
        )}

        {/* Rewards Grid */}
        <div className="space-y-4">
          {rewards.map((reward, index) => {
            const locked = reward.isVIPOnly && !isVIP;
            const affordable = canRedeem(reward);

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`bg-white rounded-2xl p-5 shadow-xl ${
                  locked ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                    {reward.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800">{reward.title}</h3>
                          {reward.isVIPOnly && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                      </div>
                    </div>

                    {/* Points and Button */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1">
                        <Ticket className="w-4 h-4 text-purple-500" />
                        <span className="text-lg font-bold text-purple-600">
                          {reward.points}
                        </span>
                        <span className="text-sm text-gray-500">pts</span>
                      </div>

                      {locked ? (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Crown className="w-4 h-4" />
                          <span>VIP Only</span>
                        </div>
                      ) : (
                        <Button
                          disabled={!affordable}
                          className={`${
                            affordable
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                              : 'bg-gray-300 cursor-not-allowed'
                          } text-white font-bold rounded-xl px-6 py-2 text-sm`}
                        >
                          {affordable ? 'Redeem' : 'Not enough'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Earn More Points Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 mb-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl p-6 shadow-xl"
        >
          <div className="text-center">
            <Star className="w-12 h-12 text-yellow-300 mx-auto mb-2" />
            <p className="text-lg font-bold text-white mb-2">
              Want more points?
            </p>
            <p className="text-sm text-white/90 mb-3">
              Play more games and climb the leaderboard!
            </p>
            <Button
              onClick={onBack}
              className="bg-white hover:bg-gray-100 text-purple-600 font-bold rounded-xl px-6 py-2"
            >
              Play Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
