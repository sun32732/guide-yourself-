import { API_CONFIG, getAuthHeaders } from '../config/api';
import { Goal, Task, Notification, User } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

class APIService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.loadToken();
  }

  private async loadToken() {
    try {
      this.token = await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error loading token:', error);
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = getAuthHeaders(this.token || undefined);

      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>(
      API_CONFIG.ENDPOINTS.LOGIN,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    
    this.token = response.token;
    await AsyncStorage.setItem('authToken', response.token);
    
    return response;
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    userType: string;
  }): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>(
      API_CONFIG.ENDPOINTS.REGISTER,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    );
    
    this.token = response.token;
    await AsyncStorage.setItem('authToken', response.token);
    
    return response;
  }

  async logout(): Promise<void> {
    await this.request(API_CONFIG.ENDPOINTS.LOGOUT, { method: 'POST' });
    this.token = null;
    await AsyncStorage.removeItem('authToken');
  }

  // Goals
  async getGoals(): Promise<Goal[]> {
    return this.request<Goal[]>(API_CONFIG.ENDPOINTS.GOALS);
  }

  async createGoal(goal: Omit<Goal, 'id'>): Promise<Goal> {
    return this.request<Goal>(API_CONFIG.ENDPOINTS.GOALS, {
      method: 'POST',
      body: JSON.stringify(goal),
    });
  }

  async updateGoal(id: number, updates: Partial<Goal>): Promise<Goal> {
    return this.request<Goal>(API_CONFIG.ENDPOINTS.GOAL_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteGoal(id: number): Promise<void> {
    await this.request(API_CONFIG.ENDPOINTS.GOAL_BY_ID(id), {
      method: 'DELETE',
    });
  }

  async updateGoalProgress(id: number, progress: number): Promise<Goal> {
    return this.request<Goal>(API_CONFIG.ENDPOINTS.UPDATE_GOAL_PROGRESS(id), {
      method: 'PATCH',
      body: JSON.stringify({ progress }),
    });
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    return this.request<Task[]>(API_CONFIG.ENDPOINTS.TASKS);
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    return this.request<Task>(API_CONFIG.ENDPOINTS.TASKS, {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task> {
    return this.request<Task>(API_CONFIG.ENDPOINTS.TASK_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(id: number): Promise<void> {
    await this.request(API_CONFIG.ENDPOINTS.TASK_BY_ID(id), {
      method: 'DELETE',
    });
  }

  async completeTask(id: number): Promise<Task> {
    return this.request<Task>(API_CONFIG.ENDPOINTS.COMPLETE_TASK(id), {
      method: 'POST',
    });
  }

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    return this.request<Notification[]>(API_CONFIG.ENDPOINTS.NOTIFICATIONS);
  }

  async markNotificationAsRead(id: number): Promise<void> {
    await this.request(API_CONFIG.ENDPOINTS.MARK_READ(id), {
      method: 'POST',
    });
  }

  // AI Services
  async getAISuggestions(userType: string, goals: Goal[], tasks: Task[]): Promise<any> {
    return this.request(API_CONFIG.ENDPOINTS.AI_SUGGESTIONS, {
      method: 'POST',
      body: JSON.stringify({ userType, goals, tasks }),
    });
  }

  async sendAIMessage(message: string, context: any): Promise<{ response: string }> {
    return this.request<{ response: string }>(API_CONFIG.ENDPOINTS.AI_CHAT, {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  }

  async analyzeProgress(goalId: number): Promise<{
    analysis: string;
    suggestions: string[];
    nextSteps: string[];
  }> {
    return this.request(API_CONFIG.ENDPOINTS.AI_ANALYZE_PROGRESS, {
      method: 'POST',
      body: JSON.stringify({ goalId }),
    });
  }

  // User
  async getUserProfile(): Promise<User> {
    return this.request<User>(API_CONFIG.ENDPOINTS.USER_PROFILE);
  }

  async updateUserProfile(updates: Partial<User>): Promise<User> {
    return this.request<User>(API_CONFIG.ENDPOINTS.UPDATE_PROFILE, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async updateUserType(userType: string): Promise<void> {
    await this.request(API_CONFIG.ENDPOINTS.USER_TYPE, {
      method: 'PUT',
      body: JSON.stringify({ userType }),
    });
  }
}

export default new APIService();
