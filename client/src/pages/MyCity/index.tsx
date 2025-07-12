import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumberShort, getLevelProgress, calculateEnergyCost, calculateTapPower, calculateMaxEnergy } from '../../utils/helpers';
import TopInfoPanel from './TopInfoPanel';
import BalanceDisplay from '../../components/Common/BalanceDisplay';
import LevelModal from '../../components/Common/LevelModal';
import { CoinIcon } from '../../components/Icons';

const MyCity = ({
  user,
  setUser,
  passiveIncome,
  levelNames,
  levelThresholds,
  offlineEarningsToClaim,
  handleClaimOfflineEarnings,
  handleActivateTapBoost,
  isTapBoostActive,
  leaderboard = [],
}) => {
  const [taps, setTaps] = useState([]);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [particleEffects, setParticleEffects] = useState([]);
  const tapAreaRef = useRef(null);

  if (!user || !levelThresholds || !levelNames) {
    return (
      <motion.div
        className="flex items-center justify-center h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            className="w-16 h-16 border-4 border-t-amber-400 border-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.p
            className="text-lg font-medium bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Imperium yuklanmoqda...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Progress calculations
  const { currentLevel, progress } = getLevelProgress(user.totalEarned || 0, levelThresholds);
  const currentLevelName = levelNames[currentLevel - 1] || 'Amir';
  const nextLevelRequirement = levelThresholds[currentLevel] || 'MAX';
  const nextLevelText = nextLevelRequirement === 'MAX' ? 'MAX' : formatNumberShort(Math.floor(nextLevelRequirement - (user.totalEarned || 0)));
  const progressPercentage = Math.min(progress * 100, 100);

  const tapProfit = Math.floor(calculateTapPower(user) * (isTapBoostActive ? 2 : 1) * (user.isPremium ? 1.5 : 1));
  const maxEnergy = calculateMaxEnergy(user);
  const energyPercentage = Math.max(0, Math.min(100, (user.energy / maxEnergy) * 100));

  // Avatar and background logic
  const getCurrentAvatar = () => {
    if (user.selectedAvatar) return user.selectedAvatar;
    return '🏛️';
  };

  const getCurrentBackground = () => {
    const items = user.itemLevels || {};
    if (user.selectedVehicle) return user.selectedVehicle;
    if (user.selectedBuilding) return user.selectedBuilding;
    return null;
  };

  // Combo system
  useEffect(() => {
    const comboTimeout = setTimeout(() => {
      if (Date.now() - lastTapTime > 2000) {
        setComboCount(0);
      }
    }, 2000);
    return () => clearTimeout(comboTimeout);
  }, [lastTapTime]);

  // Particle effect cleanup
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticleEffects(prev => prev.filter(p => Date.now() - p.timestamp < 2000));
    }, 100);
    return () => clearInterval(cleanup);
  }, []);

  const createParticleEffect = (x, y, value) => {
    const particle = {
      id: Date.now() + Math.random(),
      x: x - 20,
      y: y - 20,
      value,
      timestamp: Date.now()
    };
    setParticleEffects(prev => [...prev.slice(-4), particle]);
  };

  const handleTap = useCallback((e) => {
    e.preventDefault();
    
    if (user.energy < 1) {
      window.Telegram?.WebApp?.HapticFeedback.impactOccurred('light');
      return;
    }

    const currentTime = Date.now();
    const timeDiff = currentTime - lastTapTime;
    
    // Combo logic
    let newComboCount = timeDiff < 2000 ? comboCount + 1 : 1;
    setComboCount(newComboCount);
    setLastTapTime(currentTime);

    // Combo multiplier
    const comboMultiplier = Math.min(1 + (newComboCount - 1) * 0.1, 3);
    const finalTapProfit = Math.floor(tapProfit * comboMultiplier);

    const rect = tapAreaRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.touches?.[0]?.clientX || e.clientX) - rect.left;
      const y = (e.touches?.[0]?.clientY || e.clientY) - rect.top;
      
      // Create tap effect
      const tapId = Date.now() + Math.random();
      setTaps(prev => [...prev.slice(-4), { id: tapId, x, y, value: finalTapProfit }]);
      
      // Create particle effect
      createParticleEffect(x, y, finalTapProfit);
      
      setTimeout(() => {
        setTaps(prev => prev.filter(tap => tap.id !== tapId));
      }, 1000);
    }

    // Update user state
    setUser(prevUser => ({
      ...prevUser,
      dubaiCoin: prevUser.dubaiCoin + finalTapProfit,
      totalEarned: prevUser.totalEarned + finalTapProfit,
      energy: Math.max(0, prevUser.energy - 1),
      tapsToday: (prevUser.tapsToday || 0) + 1,
    }));

    // Haptic feedback
    if (newComboCount > 5) {
      window.Telegram?.WebApp?.HapticFeedback.impactOccurred('heavy');
    } else {
      window.Telegram?.WebApp?.HapticFeedback.impactOccurred('medium');
    }
  }, [user.energy, tapProfit, comboCount, lastTapTime, setUser]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-400/30 to-orange-500/30 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-24 h-24 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
      </div>

      {/* Header with balance */}
      <div className="relative z-10 p-4 pb-2">
        <BalanceDisplay user={user} />
      </div>

      {/* Level Progress Section */}
      <motion.div 
        className="px-4 py-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-lg rounded-2xl p-4 border border-amber-500/30 shadow-2xl">
          {/* Level Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl font-bold text-black">{currentLevel}</span>
              </motion.div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {currentLevelName}
                </h3>
                <p className="text-xs text-gray-400">Daraja {currentLevel}</p>
              </div>
            </div>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-xl text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLevelModal(true)}
            >
              Ma'lumot
            </motion.button>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Progress</span>
              <span className="text-amber-400 font-medium">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Joriy: {formatNumberShort(user.totalEarned || 0)}</span>
              <span>Kerak: {nextLevelText}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Panel */}
      <div className="px-4 py-2">
        <TopInfoPanel 
          user={user} 
          passiveIncome={passiveIncome} 
          isTapBoostActive={isTapBoostActive} 
          tapProfit={tapProfit} 
          nextLevelText={nextLevelText}
        />
      </div>

      {/* Combo Display */}
      <AnimatePresence>
        {comboCount > 1 && (
          <motion.div
            className="absolute top-32 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full shadow-2xl border-2 border-white/30">
              <span className="text-white font-bold text-lg">
                {comboCount}x COMBO!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tap Area */}
      <div className="flex-1 flex items-center justify-center px-4 pb-6 relative">
        <motion.div
          ref={tapAreaRef}
          className="relative w-80 h-80 flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onPointerDown={handleTap}
          style={{ touchAction: 'manipulation' }}
        >
          {/* Tap Area Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          
          {/* Energy Ring */}
          <motion.div className="absolute inset-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#energyGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - energyPercentage / 100)}`}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Main Avatar */}
          <motion.div
            className="relative z-10 w-48 h-48 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(251, 191, 36, 0.4)",
                "0 0 0 20px rgba(251, 191, 36, 0)",
                "0 0 0 0 rgba(251, 191, 36, 0)"
              ]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-8xl filter drop-shadow-lg">
              {getCurrentAvatar()}
            </span>
          </motion.div>

          {/* Tap Effects */}
          <AnimatePresence>
            {taps.map((tap) => (
              <motion.div
                key={tap.id}
                className="absolute pointer-events-none z-20"
                style={{ left: tap.x, top: tap.y }}
                initial={{ opacity: 1, scale: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: 1.5, 
                  y: -100,
                  x: Math.random() * 40 - 20
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-3 py-1 rounded-full font-bold text-lg shadow-2xl border-2 border-white/50">
                  +{formatNumberShort(tap.value)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Particle Effects */}
          <AnimatePresence>
            {particleEffects.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute pointer-events-none z-15"
                style={{ left: particle.x, top: particle.y }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  opacity: 0, 
                  scale: 0,
                  y: -60,
                  x: Math.random() * 60 - 30
                }}
                transition={{ duration: 1.5 }}
              >
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Energy Bar */}
      <motion.div 
        className="px-4 pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="text-lg font-bold text-blue-400">Energiya</span>
            </div>
            <span className="text-sm font-medium text-gray-300">
              {Math.floor(user.energy)}/{maxEnergy}
            </span>
          </div>
          <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              animate={{ width: `${energyPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tap Boost Button */}
      <motion.div 
        className="px-4 pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all ${
            isTapBoostActive
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-gradient-to-r from-amber-500 to-orange-600 text-black hover:from-amber-400 hover:to-orange-500'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleActivateTapBoost}
          disabled={isTapBoostActive}
        >
          {isTapBoostActive ? (
            <span className="flex items-center justify-center space-x-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🚀
              </motion.span>
              <span>TAP BOOST FAOL!</span>
            </span>
          ) : (
            'TAP BOOST FAOLLASHTIRISH'
          )}
        </motion.button>
      </motion.div>

      {/* Offline Earnings Claim */}
      <AnimatePresence>
        {offlineEarningsToClaim > 0 && (
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl shadow-2xl border border-amber-500/50 max-w-sm mx-4"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <div className="text-center space-y-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <span className="text-6xl">💰</span>
                </motion.div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Offline Daromad!
                </h3>
                <p className="text-gray-300">
                  Siz yo'q bo'lgan vaqtda{' '}
                  <span className="text-amber-400 font-bold">
                    {formatNumberShort(offlineEarningsToClaim)}
                  </span>{' '}
                  tanga yig'ildi!
                </p>
                <motion.button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black py-3 rounded-xl font-bold text-lg shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClaimOfflineEarnings}
                >
                  Olish
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Modal */}
      <LevelModal
        show={showLevelModal}
        onClose={() => setShowLevelModal(false)}
        currentLevel={currentLevel}
        currentLevelName={currentLevelName}
        levelNames={levelNames}
        levelThresholds={levelThresholds}
        userProgress={user.totalEarned || 0}
      />
    </div>
  );
};

export default MyCity;