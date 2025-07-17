// Updated API configuration for Dubai City Bot Admin Panel
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/admin';
const FALLBACK_API_URL = 'http://localhost:3001/api/admin'; // Backup URL

// Enhanced API utility functions with better error handling and real backend connection
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Remove CORS headers - these should be set by the server, not client
      // Add authentication headers if needed
      // 'Authorization': `Bearer ${localStorage.getItem('adminToken') || ''}`,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`API request failed for ${url}:`, error);
    // Fallback to mock data if backend is not available
    return getMockData(endpoint);
  }
}

// Enhanced mock data fallback system
const getMockData = (endpoint: string) => {
  if (endpoint.includes('/health')) {
    return { status: 'ok', message: 'Mock API is working' };
  }
  
  if (endpoint.includes('/dashboard') || endpoint.includes('/stats')) {
    return {
      totalUsers: 12543,
      activeUsers: 8234,
      newUsersToday: 156,
      totalDubaiCoins: 45678000,
      userGrowth: 12.5,
      activeGrowth: 8.3,
      newUsersGrowth: 15.2,
      coinGrowth: 22.1
    };
  }
  
  if (endpoint.includes('/users')) {
    return [
      { 
        id: 1, 
        telegramId: '123456789',
        username: 'admin_user',
        firstName: 'Admin',
        lastName: 'User',
        dubaiCoin: 100000,
        tapProfit: 5,
        hourlyIncome: 1000,
        level: 10,
        energy: 5000,
        maxEnergy: 5000,
        premiumStatus: true,
        referralCode: 'ADMIN001',
        referredBy: null,
        language: 'en',
        createdAt: '2024-01-15T10:00:00Z'
      },
      { 
        id: 2, 
        telegramId: '987654321',
        username: 'test_user',
        firstName: 'Test',
        lastName: 'User',
        dubaiCoin: 50000,
        tapProfit: 3,
        hourlyIncome: 500,
        level: 7,
        energy: 3500,
        maxEnergy: 5000,
        premiumStatus: false,
        referralCode: 'TEST001',
        referredBy: 1,
        language: 'ru',
        createdAt: '2024-01-10T14:30:00Z'
      },
      { 
        id: 3, 
        telegramId: '456789123',
        username: 'new_player',
        firstName: 'New',
        lastName: 'Player',
        dubaiCoin: 15000,
        tapProfit: 1,
        hourlyIncome: 100,
        level: 3,
        energy: 2000,
        maxEnergy: 5000,
        premiumStatus: false,
        referralCode: 'NEW001',
        referredBy: 2,
        language: 'uz',
        createdAt: '2024-01-18T09:15:00Z'
      }
    ];
  }

  if (endpoint.includes('/tasks')) {
    return [
      { 
        id: 1, 
        title: 'Follow Instagram',
        titleUz: 'Instagram obuna',
        titleRu: 'Подписаться на Instagram',
        description: 'Follow our Instagram account and get rewards',
        type: 'instagram',
        url: 'https://instagram.com/dubaicitybot',
        reward: 500,
        isActive: true
      },
      { 
        id: 2, 
        title: 'Subscribe YouTube',
        titleUz: 'YouTube obuna',
        titleRu: 'Подписаться на YouTube',
        description: 'Subscribe to our YouTube channel',
        type: 'youtube',
        url: 'https://youtube.com/@dubaicitybot',
        reward: 750,
        isActive: true
      },
      { 
        id: 3, 
        title: 'Join Telegram',
        titleUz: 'Telegram kanalga qo\'shilish',
        titleRu: 'Присоединиться к Telegram',
        description: 'Join our Telegram channel',
        type: 'telegram',
        url: 'https://t.me/dubaicitybot',
        reward: 1000,
        isActive: true
      },
      { 
        id: 4, 
        title: 'Follow Twitter',
        titleUz: 'Twitter obuna',
        titleRu: 'Подписаться на Twitter',
        description: 'Follow our Twitter account',
        type: 'twitter',
        url: 'https://twitter.com/dubaicitybot',
        reward: 600,
        isActive: true
      }
    ];
  }

  if (endpoint.includes('/empire-levels')) {
    return [
      { id: 1, level: 1, name: 'Beginner', minCoins: 0, maxCoins: 1000, bonus: 1.0 },
      { id: 2, level: 2, name: 'Citizen', minCoins: 1001, maxCoins: 5000, bonus: 1.1 },
      { id: 3, level: 3, name: 'Merchant', minCoins: 5001, maxCoins: 15000, bonus: 1.2 },
      { id: 4, level: 4, name: 'Entrepreneur', minCoins: 15001, maxCoins: 50000, bonus: 1.3 },
      { id: 5, level: 5, name: 'Business Owner', minCoins: 50001, maxCoins: 100000, bonus: 1.4 },
      { id: 6, level: 6, name: 'Investor', minCoins: 100001, maxCoins: 250000, bonus: 1.5 },
      { id: 7, level: 7, name: 'Tycoon', minCoins: 250001, maxCoins: 500000, bonus: 1.6 },
      { id: 8, level: 8, name: 'Magnate', minCoins: 500001, maxCoins: 1000000, bonus: 1.7 },
      { id: 9, level: 9, name: 'Empire Builder', minCoins: 1000001, maxCoins: 2500000, bonus: 1.8 },
      { id: 10, level: 10, name: 'Dubai King', minCoins: 2500001, maxCoins: 10000000, bonus: 2.0 }
    ];
  }

  if (endpoint.includes('/skins')) {
    return [
      { 
        id: 1, 
        name: 'Golden Warrior',
        nameUz: 'Oltin jangchi',
        nameRu: 'Золотой воин',
        price: 5000,
        rarity: 'legendary',
        imageUrl: 'https://example.com/golden-warrior.png',
        category: 'premium'
      },
      { 
        id: 2, 
        name: 'Desert Eagle',
        nameUz: 'Sahra burguti',
        nameRu: 'Пустынный орел',
        price: 2500,
        rarity: 'epic',
        imageUrl: 'https://example.com/desert-eagle.png',
        category: 'weapon'
      },
      { 
        id: 3, 
        name: 'Cyber Ninja',
        nameUz: 'Kiber ninja',
        nameRu: 'Кибер ниндзя',
        price: 7500,
        rarity: 'rare',
        imageUrl: 'https://example.com/cyber-ninja.png',
        category: 'character'
      }
    ];
  }

  if (endpoint.includes('/businesses')) {
    return [
      {
        id: 1,
        name: 'Dubai Mall Store',
        nameUz: 'Dubai Mall do\'koni',
        nameRu: 'Магазин Dubai Mall',
        price: 10000,
        hourlyProfit: 500,
        category: 'retail',
        requiredLevel: 5
      },
      {
        id: 2,
        name: 'Burj Khalifa Office',
        nameUz: 'Burj Khalifa ofisi',
        nameRu: 'Офис Бурдж Халифа',
        price: 50000,
        hourlyProfit: 2500,
        category: 'office',
        requiredLevel: 10
      },
      {
        id: 3,
        name: 'Gold Souk Business',
        nameUz: 'Oltin bozori biznesi',
        nameRu: 'Бизнес золотого рынка',
        price: 25000,
        hourlyProfit: 1200,
        category: 'trading',
        requiredLevel: 7
      }
    ];
  }

  if (endpoint.includes('/promocodes')) {
    return [
      {
        id: 1,
        code: 'WELCOME2024',
        reward: 1000,
        usageLimit: 1000,
        expiresAt: '2024-12-31T23:59:59Z',
        isActive: true
      },
      {
        id: 2,
        code: 'DUBAI500',
        reward: 500,
        usageLimit: 500,
        expiresAt: '2024-06-30T23:59:59Z',
        isActive: true
      }
    ];
  }

  if (endpoint.includes('/notifications')) {
    return [
      {
        id: 1,
        title: 'Welcome to Dubai City Bot!',
        message: 'Start your journey to wealth and success!',
        type: 'info',
        status: 'active',
        recipients: 'all',
        sentAt: '2024-01-20 14:30',
        delivered: 8234,
        opened: 6123
      },
      {
        id: 2,
        title: 'New System Update',
        message: 'The bot has been updated with new features',
        type: 'success',
        status: 'active',
        recipients: 'all',
        sentAt: '2024-01-19 10:00',
        delivered: 5432,
        opened: 4321
      }
    ];
  }

  return [];
};

export const apiGet = (endpoint: string) => apiRequest(endpoint);
export const apiPost = (endpoint: string, data: any) => 
  apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) });
export const apiPut = (endpoint: string, data: any) => 
  apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) });
export const apiDelete = (endpoint: string) => 
  apiRequest(endpoint, { method: 'DELETE' });

// Admin API endpoints configuration for localhost:5000/api/admin
export const adminApi = {
  // Users management
  users: {
    getAll: (page?: number, limit?: number) => {
      const params = page ? `?page=${page}&limit=${limit || 50}` : '';
      return apiGet(`/users${params}`);
    },
    getById: (id: number) => apiGet(`/users/${id}`),
    create: (data: any) => apiPost('/users', data),
    update: (id: number, data: any) => apiPut(`/users/${id}`, data),
    delete: (id: number) => apiDelete(`/users/${id}`),
    block: (id: number) => apiPost(`/users/${id}/block`, {}),
    unblock: (id: number) => apiPost(`/users/${id}/unblock`, {}),
  },

  // Tasks management  
  tasks: {
    getAll: () => apiGet('/tasks'),
    getById: (id: number) => apiGet(`/tasks/${id}`),
    create: (data: any) => apiPost('/tasks', data),
    update: (id: number, data: any) => apiPut(`/tasks/${id}`, data),
    delete: (id: number) => apiDelete(`/tasks/${id}`),
    activate: (id: number) => apiPost(`/tasks/${id}/activate`, {}),
    deactivate: (id: number) => apiPost(`/tasks/${id}/deactivate`, {}),
  },

  // Skins management
  skins: {
    getAll: () => apiGet('/skins'),
    getById: (id: number) => apiGet(`/skins/${id}`),
    create: (data: any) => apiPost('/skins', data),
    update: (id: number, data: any) => apiPut(`/skins/${id}`, data),
    delete: (id: number) => apiDelete(`/skins/${id}`),
  },

  // Business management (renamed from businesses to match backend)
  businesses: {
    getAll: () => apiGet('/businesses'),
    getById: (id: number) => apiGet(`/businesses/${id}`),
    create: (data: any) => apiPost('/businesses', data),
    update: (id: number, data: any) => apiPut(`/businesses/${id}`, data),
    delete: (id: number) => apiDelete(`/businesses/${id}`),
  },

  // Promo codes management
  promocodes: {
    getAll: () => apiGet('/promocodes'),
    getById: (id: number) => apiGet(`/promocodes/${id}`),
    create: (data: any) => apiPost('/promocodes', data),
    update: (id: number, data: any) => apiPut(`/promocodes/${id}`, data),
    delete: (id: number) => apiDelete(`/promocodes/${id}`),
    activate: (id: number) => apiPost(`/promocodes/${id}/activate`, {}),
    deactivate: (id: number) => apiPost(`/promocodes/${id}/deactivate`, {}),
  },

  // Notifications management
  notifications: {
    getAll: () => apiGet('/notifications'),
    getById: (id: number) => apiGet(`/notifications/${id}`),
    create: (data: any) => apiPost('/notifications', data),
    update: (id: number, data: any) => apiPut(`/notifications/${id}`, data),
    delete: (id: number) => apiDelete(`/notifications/${id}`),
    send: (id: number) => apiPost(`/notifications/${id}/send`, {}),
  },

  // Teams management
  teams: {
    getAll: () => apiGet('/teams'),
    getById: (id: number) => apiGet(`/teams/${id}`),
    getMembers: (id: number) => apiGet(`/teams/${id}/members`),
    create: (data: any) => apiPost('/teams', data),
    update: (id: number, data: any) => apiPut(`/teams/${id}`, data),
    delete: (id: number) => apiDelete(`/teams/${id}`),
  },

  // Projects management
  projects: {
    getAll: () => apiGet('/projects'),
    getById: (id: number) => apiGet(`/projects/${id}`),
    create: (data: any) => apiPost('/projects', data),
    update: (id: number, data: any) => apiPut(`/projects/${id}`, data),
    delete: (id: number) => apiDelete(`/projects/${id}`),
  },

  // Settings management
  settings: {
    getAll: () => apiGet('/settings'),
    update: (key: string, value: any) => apiPut(`/settings/${key}`, { value }),
  },

  // Dashboard statistics
  dashboard: {
    getStats: () => apiGet('/stats'),
  },
};

// Enhanced connection test for backend API
export const testConnection = async () => {
  try {
    // Try to connect to real backend at localhost:5000
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`${API_BASE_URL}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    window.clearTimeout(timeoutId);

    if (response.ok) {
      return { 
        success: true, 
        message: 'Backend API connected successfully',
        url: API_BASE_URL,
        mode: 'production' 
      };
    } else {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (error: any) {
    // Silent warning - no console log to avoid unhandled promise rejection
    return { 
      success: false, 
      error: `Backend not available: ${error?.message || 'Connection failed'}`,
      url: API_BASE_URL,
      mode: 'development' 
    };
  }
};