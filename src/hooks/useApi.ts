import { useState, useEffect } from 'react';

// Custom hook for API calls
export const useApi = <T>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Import the centralized API configuration
import { apiRequest as centralApiRequest, adminApi } from '../lib/api';

// API utility functions
export const apiRequest = centralApiRequest;

export const apiGet = (endpoint: string) => apiRequest(endpoint);
export const apiPost = (endpoint: string, data: any) => 
  apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) });
export const apiPut = (endpoint: string, data: any) => 
  apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) });
export const apiDelete = (endpoint: string) => 
  apiRequest(endpoint, { method: 'DELETE' });

// Export admin API functions
export { adminApi };

// Legacy API functions for backward compatibility
export const userApi = adminApi.users;
export const taskApi = adminApi.tasks;
export const empireLevelApi = adminApi.empireLevels;
export const skinApi = adminApi.skins;
export const marketApi = adminApi.businesses;
export const notificationApi = adminApi.notifications;
export const statsApi = adminApi.dashboard;