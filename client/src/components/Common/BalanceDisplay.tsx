import React from 'react';
import { motion } from 'framer-motion';
import { formatNumberShort } from '../../utils/helpers';
import { CoinIcon } from '../Icons';

const BalanceDisplay = ({ user }) => {
  if (!user) return null;

  return (
    <motion.div
      className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-xl rounded-2xl p-4 border border-amber-500/30 shadow-2xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        {/* Main Balance */}
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
            animate={{ 
              rotate: [0, 5, -5, 0],
              boxShadow: [
                "0 4px 20px rgba(251, 191, 36, 0.4)",
                "0 6px 30px rgba(251, 191, 36, 0.6)",
                "0 4px 20px rgba(251, 191, 36, 0.4)"
              ]
            }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <CoinIcon className="w-8 h-8 text-black" />
          </motion.div>
          
          <div>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.h1
                className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{ backgroundSize: "200% auto" }}
              >
                {formatNumberShort(user.dubaiCoin || 0)}
              </motion.h1>
              <motion.span
                className="text-lg text-amber-400 font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                DC
              </motion.span>
            </motion.div>
            <p className="text-sm text-gray-400">
              Jami: {formatNumberShort(user.totalEarned || 0)}
            </p>
          </div>
        </div>

        {/* Premium Badge */}
        {user.isPremium && (
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-xl shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-2">
              <motion.span
                className="text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                👑
              </motion.span>
              <div className="text-xs font-medium text-white">
                <div>PREMIUM</div>
                <div className="text-yellow-300">Lvl {user.premiumLevel || 1}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats Row */}
      <motion.div
        className="mt-4 pt-3 border-t border-slate-600/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <motion.p 
              className="text-lg font-bold text-blue-400"
              whileHover={{ scale: 1.1 }}
            >
              {user.level || 1}
            </motion.p>
            <p className="text-xs text-gray-500">Daraja</p>
          </div>
          <div>
            <motion.p 
              className="text-lg font-bold text-green-400"
              whileHover={{ scale: 1.1 }}
            >
              {user.tapsToday || 0}
            </motion.p>
            <p className="text-xs text-gray-500">Bugungi tap</p>
          </div>
          <div>
            <motion.p 
              className="text-lg font-bold text-purple-400"
              whileHover={{ scale: 1.1 }}
            >
              {user.referrals?.length || 0}
            </motion.p>
            <p className="text-xs text-gray-500">Do'stlar</p>
          </div>
        </div>
      </motion.div>

      {/* Achievement Badges */}
      {(user.totalEarned > 1000000 || user.tapsToday > 100 || user.level > 5) && (
        <motion.div
          className="mt-3 flex justify-center space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {user.totalEarned > 1000000 && (
            <motion.div
              className="bg-gradient-to-r from-amber-500 to-yellow-500 px-2 py-1 rounded-full text-xs font-bold text-black"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              🏆 Millioner
            </motion.div>
          )}
          {user.tapsToday > 100 && (
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 px-2 py-1 rounded-full text-xs font-bold text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
            >
              ⚡ Faol
            </motion.div>
          )}
          {user.level > 5 && (
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 rounded-full text-xs font-bold text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
            >
              🎯 Expert
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BalanceDisplay;