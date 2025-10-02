// API Configuration and Keys Management

export const API_CONFIG = {
  // Base URLs
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.smartguide.app',
  TIMEOUT: 30000,
  
  // Endpoints
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    
    // User
    USER_PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile/update',
    USER_TYPE: '/user/type',
    
    // Goals
    GOALS: '/goals',
    GOAL_BY_ID: (id: number) => `/goals/${id}`,
    UPDATE_GOAL_PROGRESS: (id: number) => `/goals/${id}/progress`,
    
    // Tasks
    TASKS: '/tasks',
    TASK_BY_ID: (id: number) => `/tasks/${id}`,
    COMPLETE_TASK: (id: number) => `/tasks/${id}/complete`,
    
    // Notifications
    NOTIFICATIONS: '/notifications',
    MARK_READ: (id: number) => `/notifications/${id}/read`,
    
    // AI
    AI_SUGGESTIONS: '/ai/suggestions',
    AI_CHAT: '/ai/chat',
    AI_ANALYZE_PROGRESS: '/ai/analyze-progress',
    
    // Calendar
    SYNC_CALENDAR: '/calendar/sync',
    CALENDAR_EVENTS: '/calendar/events',
  },
};

// API Keys Management
export const API_KEYS = {
  // Google Services
  GOOGLE_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
  GOOGLE_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '',
  
  // OpenAI
  OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
  
  // Firebase
  FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
  FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || '',
  
  // App
  APP_SECRET: process.env.EXPO_PUBLIC_APP_SECRET || '',
};

// Validate required keys
export const validateAPIKeys = (): { isValid: boolean; missing: string[] } => {
  const required = [
    'GOOGLE_CLIENT_ID',
    'OPENAI_API_KEY',
    'FIREBASE_API_KEY',
  ];
  
  const missing = required.filter((key) => !API_KEYS[key as keyof typeof API_KEYS]);
  
  return {
    isValid: missing.length === 0,
    missing,
  };
};

// Headers helper
export const getAuthHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});
