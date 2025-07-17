import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced global error handlers
window.addEventListener('unhandledrejection', (event) => {
  // Handle network errors gracefully
  if (event.reason && (
    event.reason.message?.includes('Failed to fetch') ||
    event.reason.message?.includes('ERR_NAME_NOT_RESOLVED') ||
    event.reason.message?.includes('NetworkError')
  )) {
    // Silently handle network errors
    event.preventDefault();
    return;
  }
  
  // Log other errors for debugging but prevent console spam
  console.warn('Handled promise rejection:', event.reason);
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  // Handle network and extension errors
  if (event.error && event.error.message && (
    event.error.message.includes('Failed to fetch') ||
    event.error.message.includes('Could not establish connection') ||
    event.error.message.includes('ERR_NAME_NOT_RESOLVED')
  )) {
    event.preventDefault();
    return;
  }
  
  // Log other errors for debugging
  console.warn('Handled error:', event.error);
});

// Handle Chrome extension errors
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FROM_EXTENSION') {
    // Ignore extension messages
    return;
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
