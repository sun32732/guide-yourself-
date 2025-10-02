// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Goals: undefined;
  Scheduling: undefined;
  Notifications: undefined;
};

// Goal types
export interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
}

// Task types
export interface Task {
  id: number;
  title: string;
  time: string;
  duration: string;
  completed?: boolean;
  category?: string;
}

// Notification types
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  icon: string;
  isRead: boolean;
  type?: 'reminder' | 'achievement' | 'suggestion' | 'alert';
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: 'ar' | 'en';
  theme: 'dark' | 'light';
  notifications: boolean;
}
