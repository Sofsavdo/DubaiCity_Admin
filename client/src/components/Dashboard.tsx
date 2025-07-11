import React from 'react';
import { Users, MessageSquare, TrendingUp, DollarSign, Activity, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Jami O\'yinchilar',
      value: '12,543',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Faol O\'yinchilar',
      value: '8,234',
      change: '+8%',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      title: 'Jami Daromad',
      value: '$45,678',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    {
      title: 'Mukofotlar',
      value: '2,456',
      change: '+5%',
      changeType: 'positive',
      icon: Award,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    { user: 'Ali Valiyev', action: 'Yangi skin sotib oldi', time: '5 daqiqa oldin', type: 'purchase' },
    { user: 'Malika Karimova', action: 'Topshiriqni bajardi', time: '10 daqiqa oldin', type: 'task' },
    { user: 'Bobur Toshmatov', action: 'Promo kod ishlatdi', time: '15 daqiqa oldin', type: 'promo' },
    { user: 'Nilufar Saidova', action: 'Yangi foydalanuvchi ro\'yxatdan o\'tdi', time: '20 daqiqa oldin', type: 'register' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Oxirgi yangilanish: {new Date().toLocaleString('uz-UZ')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} o'tgan oyga nisbatan
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">O'yinchilar Statistikasi</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Grafik bu yerda ko'rsatiladi</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">So'nggi Faoliyat</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'purchase' ? 'bg-green-500' :
                  activity.type === 'task' ? 'bg-blue-500' :
                  activity.type === 'promo' ? 'bg-yellow-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;