const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://dubai-city-backend.onrender.com' 
    : 'http://localhost:3001');

export const API_ENDPOINTS = {
  TELEGRAM_AUTH: '/api/telegram/auth',
  USERS: '/api/users',
  USER_BY_ID: (id: string) => `/api/users/${id}`,
  TASKS: '/api/tasks',
  SKINS: '/api/skins',
  BUSINESSES: '/api/businesses',
  HEALTH: '/api/health',
};

export class ApiClient {
  private baseURL: string;
  private headers: HeadersInit;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async authenticateWithTelegram(initData: string) {
    return this.request(API_ENDPOINTS.TELEGRAM_AUTH, {
      method: 'POST',
      body: JSON.stringify({ initData }),
    });
  }

  async getUser(id: string) {
    return this.request(API_ENDPOINTS.USER_BY_ID(id));
  }

  async getTasks() {
    return this.request(API_ENDPOINTS.TASKS);
  }

  async healthCheck() {
    return this.request(API_ENDPOINTS.HEALTH);
  }
}

export const apiClient = new ApiClient();
