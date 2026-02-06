import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { GameBoard } from './components/GameBoard';
import { Leaderboard } from './components/Leaderboard';
import { RewardsScreen } from './components/RewardsScreen';
import { GameCompleteModal } from './components/GameCompleteModal';

type Screen = 'home' | 'game' | 'leaderboard' | 'rewards';
type Difficulty = 'easy' | 'medium' | 'hard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [lastGameScore, setLastGameScore] = useState(0);
  const [lastGameTime, setLastGameTime] = useState(0);

  // Mock player stats (in real app, this would come from backend)
  const [playerStats, setPlayerStats] = useState({
    totalScore: 15680,
    gamesPlayed: 42,
    highScore: 1850,
    isVIP: true, // Set to true to show VIP features
  });

  const handleStartGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentScreen('game');
  };

  const handleGameComplete = (score: number, time: number) => {
    setLastGameScore(score);
    setLastGameTime(time);
    setShowCompleteModal(true);

    // Update player stats
    setPlayerStats((prev) => ({
      ...prev,
      totalScore: prev.totalScore + Math.floor(score / 10),
      gamesPlayed: prev.gamesPlayed + 1,
      highScore: Math.max(prev.highScore, score),
    }));
  };

  const handlePlayAgain = () => {
    setShowCompleteModal(false);
    setCurrentScreen('game');
    // Force remount of GameBoard by changing a key
    window.location.reload();
  };

  const handleBackHome = () => {
    setShowCompleteModal(false);
    setCurrentScreen('home');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <HomeScreen
          onStartGame={handleStartGame}
          onShowLeaderboard={() => setCurrentScreen('leaderboard')}
          onShowRewards={() => setCurrentScreen('rewards')}
          playerStats={playerStats}
        />
      )}

      {currentScreen === 'game' && (
        <GameBoard
          difficulty={difficulty}
          onGameComplete={handleGameComplete}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <Leaderboard onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'rewards' && (
        <RewardsScreen
          onBack={() => setCurrentScreen('home')}
          isVIP={playerStats.isVIP}
        />
      )}

      <GameCompleteModal
        isOpen={showCompleteModal}
        score={lastGameScore}
        time={lastGameTime}
        onPlayAgain={handlePlayAgain}
        onBackHome={handleBackHome}
      />
    </>
  );
}
