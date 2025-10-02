import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal, Task, Notification, User } from '../types';

export type UserType = 'student' | 'visionary' | 'professional';

interface AppContextType {
  // User
  user: User | null;
  userType: UserType | null;
  setUser: (user: User) => void;
  setUserType: (type: UserType) => void;
  
  // Goals
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (id: number, updates: Partial<Goal>) => void;
  deleteGoal: (id: number) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: number) => void;
  
  // Loading
  isLoading: boolean;
  
  // Sync
  syncData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadLocalData();
  }, []);

  const loadLocalData = async () => {
    try {
      const [
        storedUser,
        storedUserType,
        storedGoals,
        storedTasks,
        storedNotifications,
      ] = await Promise.all([
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('userType'),
        AsyncStorage.getItem('goals'),
        AsyncStorage.getItem('tasks'),
        AsyncStorage.getItem('notifications'),
      ]);

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedUserType) setUserType(storedUserType as UserType);
      if (storedGoals) setGoals(JSON.parse(storedGoals));
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedNotifications) setNotifications(JSON.parse(storedNotifications));
    } catch (error) {
      console.error('Error loading local data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToStorage = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  // User functions
  const handleSetUser = (newUser: User) => {
    setUser(newUser);
    saveToStorage('user', newUser);
  };

  const handleSetUserType = (type: UserType) => {
    setUserType(type);
    saveToStorage('userType', type);
  };

  // Goals functions
  const addGoal = (goal: Goal) => {
    const newGoals = [...goals, goal];
    setGoals(newGoals);
    saveToStorage('goals', newGoals);
  };

  const updateGoal = (id: number, updates: Partial<Goal>) => {
    const newGoals = goals.map((g) => (g.id === id ? { ...g, ...updates } : g));
    setGoals(newGoals);
    saveToStorage('goals', newGoals);
  };

  const deleteGoal = (id: number) => {
    const newGoals = goals.filter((g) => g.id !== id);
    setGoals(newGoals);
    saveToStorage('goals', newGoals);
  };

  // Tasks functions
  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveToStorage('tasks', newTasks);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    const newTasks = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setTasks(newTasks);
    saveToStorage('tasks', newTasks);
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    saveToStorage('tasks', newTasks);
  };

  // Notifications functions
  const addNotification = (notification: Notification) => {
    const newNotifications = [notification, ...notifications];
    setNotifications(newNotifications);
    saveToStorage('notifications', newNotifications);
  };

  const markAsRead = (id: number) => {
    const newNotifications = notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    setNotifications(newNotifications);
    saveToStorage('notifications', newNotifications);
  };

  // Sync with backend
  const syncData = async () => {
    // سيتم تنفيذ المزامنة مع الباك إند هنا
    console.log('Syncing data with backend...');
  };

  const value: AppContextType = {
    user,
    userType,
    setUser: handleSetUser,
    setUserType: handleSetUserType,
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    notifications,
    addNotification,
    markAsRead,
    isLoading,
    syncData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
