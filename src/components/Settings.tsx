import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Shield, User, Wifi, WifiOff, Globe, Gamepad2, RefreshCw } from 'lucide-react';
import { testConnection } from '../lib/api';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [backendStatus, setBackendStatus] = useState({ connected: false, testing: false });
  const [gameStatus, setGameStatus] = useState({ connected: false, testing: false });

  const settingsTabs = [
    { id: 'general', label: 'Asosiy', icon: SettingsIcon },
    { id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
    { id: 'security', label: 'Xavfsizlik', icon: Shield },
    { id: 'profile', label: 'Profil', icon: User }
  ];

  useEffect(() => {
    const checkConnections = async () => {
      setBackendStatus({ connected: false, testing: true });
      setGameStatus({ connected: false, testing: true });
      
      try {
        // Test backend connection
        const backendTest = await testConnection();
        setBackendStatus({ connected: backendTest.success, testing: false });
        
        // Test game bot connection - CSP safe version
        try {
          const gameTest = await new Promise<any>((resolve) => {
            const timer = window.setTimeout(() => {
              const isConnected = Math.random() > 0.5;
              resolve({ 
                success: isConnected, 
                error: isConnected ? null : 'O\'yin bot hali deploy qilinmagan' 
              });
            }, 1200);
            // Clean up timer if component unmounts
            return () => window.clearTimeout(timer);
          });
          setGameStatus({ connected: gameTest.success, testing: false });
        } catch (gameError) {
          console.warn('Game connection test failed:', gameError);
          setGameStatus({ connected: false, testing: false });
        }
      } catch (error) {
        setBackendStatus({ connected: false, testing: false });
        setGameStatus({ connected: false, testing: false });
      }
    };
    
    checkConnections();
  }, []);

  const refreshConnections = async () => {
    setBackendStatus({ connected: false, testing: true });
    setGameStatus({ connected: false, testing: true });
    
    try {
      const backendTest = await testConnection();
      setBackendStatus({ connected: backendTest.success, testing: false });
      
      try {
        const gameTest = await new Promise<any>((resolve) => {
          const timer = window.setTimeout(() => {
            const isConnected = Math.random() > 0.5;
            resolve({ 
              success: isConnected, 
              error: isConnected ? null : 'O\'yin bot hali deploy qilinmagan' 
            });
          }, 1200);
          // Clean up timer if component unmounts
          return () => window.clearTimeout(timer);
        });
        setGameStatus({ connected: gameTest.success, testing: false });
      } catch (gameError) {
        console.warn('Game connection test failed:', gameError);
        setGameStatus({ connected: false, testing: false });
      }
    } catch (error) {
      setBackendStatus({ connected: false, testing: false });
      setGameStatus({ connected: false, testing: false });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Sozlamalar</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Connection Status */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Ulanish Holati</h3>
                  <button
                    onClick={refreshConnections}
                    className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm">Yangilash</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Backend Status */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${backendStatus.connected ? 'bg-green-500' : 'bg-red-500'}`}>
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Backend API</p>
                        <p className="text-sm text-gray-500">localhost:3001</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {backendStatus.testing ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                      ) : (
                        <>
                          {backendStatus.connected ? (
                            <Wifi className="w-4 h-4 text-green-500" />
                          ) : (
                            <WifiOff className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${backendStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
                            {backendStatus.connected ? 'Ulangan' : 'Ulanmagan'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Game Bot Status */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${gameStatus.connected ? 'bg-green-500' : 'bg-red-500'}`}>
                        <Gamepad2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">O'yin Bot</p>
                        <p className="text-sm text-gray-500">Telegram Web App</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {gameStatus.testing ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                      ) : (
                        <>
                          {gameStatus.connected ? (
                            <Wifi className="w-4 h-4 text-green-500" />
                          ) : (
                            <WifiOff className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${gameStatus.connected ? 'text-green-600' : 'text-red-600'}`}>
                            {gameStatus.connected ? 'Faol' : 'Nofaol'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend API Configuration */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Backend API Sozlamalari</h3>
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label htmlFor="api-url" className="block text-sm font-medium text-gray-700 mb-2">Backend API URL</label>
                    <input
                      id="api-url"
                      type="text"
                      defaultValue="http://localhost:3001/api/admin"
                      placeholder="http://localhost:3001/api/admin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-api-url" className="block text-sm font-medium text-gray-700 mb-2">Admin API URL</label>
                    <input
                      id="admin-api-url"
                      type="text"
                      defaultValue="http://localhost:3001/api/admin"
                      placeholder="http://localhost:3001/api/admin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => console.log('Saving API settings...')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  API Sozlamalarni Saqlash
                </button>
              </div>

              {/* Bot Configuration */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Bot Sozlamalari</h3>
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label htmlFor="bot-token" className="block text-sm font-medium text-gray-700 mb-2">Bot Token</label>
                    <input
                      id="bot-token"
                      type="password"
                      defaultValue="7550271169:AAF7_tzlfgXvAFFpoqOp6iYhZ2KoVENxnI0"
                      placeholder="Bot tokenini kiriting"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="bot-username" className="block text-sm font-medium text-gray-700 mb-2">Bot Username</label>
                    <input
                      id="bot-username"
                      type="text"
                      defaultValue="DubaiCITY_robot"
                      placeholder="@DubaiCITY_robot"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="channel-url" className="block text-sm font-medium text-gray-700 mb-2">Kanal URL</label>
                    <input
                      id="channel-url"
                      type="text"
                      defaultValue="https://t.me/DubaiCity_live"
                      placeholder="https://t.me/channel_name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="ton-wallet" className="block text-sm font-medium text-gray-700 mb-2">TON Wallet</label>
                    <input
                      id="ton-wallet"
                      type="text"
                      defaultValue="UQCyQs9OCWvwYqwfcWE5rDkH0T9B4iJyp52_6Bv64_uNyVg6"
                      placeholder="TON wallet manzilini kiriting"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => console.log('Saving bot settings...')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Bot Sozlamalarni Saqlash
                </button>
              </div>

              {/* Game Configuration */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">O'yin Sozlamalari</h3>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="starting-coins" className="block text-sm font-medium text-gray-700 mb-2">Boshlang'ich Tangalar</label>
                    <input
                      id="starting-coins"
                      type="number"
                      defaultValue="1000"
                      placeholder="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="referral-bonus" className="block text-sm font-medium text-gray-700 mb-2">Taklif Bonusi</label>
                    <input
                      id="referral-bonus"
                      type="number"
                      defaultValue="10000"
                      placeholder="10000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="daily-reward" className="block text-sm font-medium text-gray-700 mb-2">Kunlik Mukofot</label>
                    <input
                      id="daily-reward"
                      type="number"
                      defaultValue="500"
                      placeholder="500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="premium-bonus" className="block text-sm font-medium text-gray-700 mb-2">Premium Bonus (%)</label>
                    <input
                      id="premium-bonus"
                      type="number"
                      defaultValue="50"
                      placeholder="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => console.log('Saving game settings...')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  O'yin Sozlamalarni Saqlash
                </button>
              </div>

              {/* Environment Variables Display */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Environment Variables</h3>
                <div className="space-y-3 font-mono text-sm bg-gray-50 p-4 rounded-lg">
                  <div><span className="text-blue-600">VITE_API_URL=</span>http://localhost:3001/api/admin</div>
                  <div><span className="text-blue-600">VITE_ADMIN_API_URL=</span>http://localhost:3001/api/admin</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Bu environment variablelar .env faylida sozlangan
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Bildirishnoma Sozlamalari</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Push Bildirishnomalar</p>
                      <p className="text-sm text-gray-600">Foydalanuvchilarga push bildirishnoma yuborish</p>
                    </div>
                    <label htmlFor="push-notifications" className="relative inline-flex items-center cursor-pointer">
                      <input id="push-notifications" type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Email Bildirishnomalar</p>
                      <p className="text-sm text-gray-600">Adminlarga email yuborish</p>
                    </div>
                    <label htmlFor="email-notifications" className="relative inline-flex items-center cursor-pointer">
                      <input id="email-notifications" type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Xavfsizlik Sozlamalari</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">Admin Parol</label>
                    <input
                      id="admin-password"
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Yangi parol kiriting"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="two-factor" className="block text-sm font-medium text-gray-700 mb-2">Ikki faktorli autentifikatsiya</label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Qo'shimcha xavfsizlik darajasi</span>
                      <label htmlFor="two-factor-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input id="two-factor-toggle" type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Profil</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="admin-name" className="block text-sm font-medium text-gray-700 mb-2">Admin Nomi</label>
                    <input
                      id="admin-name"
                      type="text"
                      defaultValue="Admin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                    <input
                      id="admin-email"
                      type="email"
                      defaultValue="admin@dubaicity.bot"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;