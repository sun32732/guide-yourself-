import { Goal, Task } from '../types';
import { UserType } from '../context/AppContext';
import apiService from './apiService';

export interface ProgressAnalysis {
  goalId: number;
  currentProgress: number;
  expectedProgress: number;
  status: 'on_track' | 'behind' | 'ahead';
  insights: string[];
  suggestions: string[];
  nextSteps: string[];
  motivationalMessage: string;
}

export interface AIResponse {
  message: string;
  suggestions?: string[];
  actions?: Array<{ title: string; action: string }>;
}

class EnhancedAIService {
  private userType: UserType | null = null;

  setUserType(type: UserType) {
    this.userType = type;
  }

  /**
   * تحليل تقدم هدف معين
   */
  async analyzeGoalProgress(goal: Goal, relatedTasks: Task[]): Promise<ProgressAnalysis> {
    try {
      // في الإنتاج، سيتم استدعاء API الباك إند
      const response = await apiService.analyzeProgress(goal.id);
      return this.processProgressAnalysis(goal, relatedTasks, response);
    } catch (error) {
      // Fallback to local analysis
      return this.localProgressAnalysis(goal, relatedTasks);
    }
  }

  /**
   * تحليل محلي للتقدم (Fallback)
   */
  private localProgressAnalysis(goal: Goal, relatedTasks: Task[]): ProgressAnalysis {
    const completedTasks = relatedTasks.filter((t) => t.completed).length;
    const totalTasks = relatedTasks.length;
    const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // حساب التقدم المتوقع بناءً على الوقت
    const expectedProgress = this.calculateExpectedProgress(goal);
    
    let status: 'on_track' | 'behind' | 'ahead' = 'on_track';
    if (goal.progress < expectedProgress - 10) status = 'behind';
    else if (goal.progress > expectedProgress + 10) status = 'ahead';

    const insights = this.generateInsights(goal, taskCompletionRate, status);
    const suggestions = this.generateSuggestions(goal, status, this.userType);
    const nextSteps = this.generateNextSteps(goal, relatedTasks, this.userType);
    const motivationalMessage = this.generateMotivationalMessage(goal, status);

    return {
      goalId: goal.id,
      currentProgress: goal.progress,
      expectedProgress,
      status,
      insights,
      suggestions,
      nextSteps,
      motivationalMessage,
    };
  }

  /**
   * حساب التقدم المتوقع بناءً على الموعد النهائي
   */
  private calculateExpectedProgress(goal: Goal): number {
    // منطق بسيط - يمكن تحسينه
    const now = new Date();
    const deadline = new Date(goal.deadline);
    const daysPassed = Math.floor((now.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // افتراض: الهدف بدأ منذ 30 يوم
    const totalDays = 30;
    return Math.min((daysPassed / totalDays) * 100, 100);
  }

  /**
   * توليد رؤى ذكية
   */
  private generateInsights(goal: Goal, taskRate: number, status: string): string[] {
    const insights: string[] = [];

    if (status === 'ahead') {
      insights.push('🎉 أنت متقدم عن الجدول المتوقع! استمر في هذا الأداء الرائع.');
    } else if (status === 'behind') {
      insights.push('⚠️ أنت متأخر قليلاً عن الجدول. لا تقلق، يمكنك اللحاق.');
    }

    if (taskRate > 70) {
      insights.push('✅ معدل إكمال المهام ممتاز!');
    } else if (taskRate < 30) {
      insights.push('📝 حاول التركيز على إكمال المزيد من المهام اليومية.');
    }

    if (goal.progress > 50) {
      insights.push('💪 لقد تجاوزت نصف الطريق! الآن هو وقت التسارع.');
    }

    return insights;
  }

  /**
   * توليد اقتراحات مخصصة حسب نوع المستخدم
   */
  private generateSuggestions(goal: Goal, status: string, userType: UserType | null): string[] {
    const suggestions: string[] = [];

    if (userType === 'student') {
      suggestions.push('📚 خصص 30 دقيقة يومياً للعمل على هذا الهدف قبل الدراسة.');
      suggestions.push('🎯 قسّم الهدف إلى مواضيع صغيرة وركز على موضوع واحد يومياً.');
      if (status === 'behind') {
        suggestions.push('⏰ استخدم تقنية Pomodoro (25 دقيقة عمل + 5 دقائق راحة).');
      }
    } else if (userType === 'visionary') {
      suggestions.push('💡 راجع رؤيتك الأساسية وتأكد من توافق المهام معها.');
      suggestions.push('📊 قم بتحليل أسبوعي للتقدم واضبط الاستراتيجية.');
      if (status === 'ahead') {
        suggestions.push('🚀 فكر في توسيع نطاق الهدف أو إضافة أهداف جديدة.');
      }
    } else if (userType === 'professional') {
      suggestions.push('💼 ادمج العمل على هذا الهدف ضمن روتينك اليومي.');
      suggestions.push('📅 حدد أوقات ثابتة أسبوعياً للتركيز على التطوير المهني.');
      if (status === 'behind') {
        suggestions.push('⚡ استغل وقت التنقل أو فترات الاستراحة للتقدم.');
      }
    }

    return suggestions;
  }

  /**
   * توليد خطوات تالية
   */
  private generateNextSteps(goal: Goal, tasks: Task[], userType: UserType | null): string[] {
    const nextSteps: string[] = [];
    const incompleteTasks = tasks.filter((t) => !t.completed);

    if (incompleteTasks.length > 0) {
      nextSteps.push(`أكمل المهمة: "${incompleteTasks[0].title}"`);
    }

    if (goal.progress < 25) {
      nextSteps.push('ابدأ بالمهام الأساسية والسهلة لبناء الزخم.');
    } else if (goal.progress < 75) {
      nextSteps.push('ركز على المهام ذات التأثير الأكبر.');
    } else {
      nextSteps.push('أنت قريب من النهاية! ركز على إنهاء التفاصيل الأخيرة.');
    }

    if (userType === 'student') {
      nextSteps.push('راجع ملاحظاتك وحدد النقاط التي تحتاج مزيد من الفهم.');
    } else if (userType === 'visionary') {
      nextSteps.push('شارك تقدمك مع فريقك أو مرشدك للحصول على ملاحظات.');
    } else if (userType === 'professional') {
      nextSteps.push('وثّق ما تعلمته وكيف يمكن تطبيقه في عملك.');
    }

    return nextSteps;
  }

  /**
   * رسالة تحفيزية
   */
  private generateMotivationalMessage(goal: Goal, status: string): string {
    if (status === 'ahead') {
      return '🌟 أداء استثنائي! أنت مثال يُحتذى به في الالتزام والإنجاز.';
    } else if (status === 'behind') {
      return '💪 كل خطوة صغيرة تقربك من هدفك. لا تستسلم، أنت أقوى مما تظن!';
    } else {
      return '✨ أنت على المسار الصحيح! استمر في هذا الإيقاع الرائع.';
    }
  }

  /**
   * معالجة استجابة API
   */
  private processProgressAnalysis(
    goal: Goal,
    tasks: Task[],
    apiResponse: any
  ): ProgressAnalysis {
    return {
      goalId: goal.id,
      currentProgress: goal.progress,
      expectedProgress: apiResponse.expectedProgress || 50,
      status: apiResponse.status || 'on_track',
      insights: apiResponse.insights || [],
      suggestions: apiResponse.suggestions || [],
      nextSteps: apiResponse.nextSteps || [],
      motivationalMessage: apiResponse.motivationalMessage || 'استمر في العمل الجيد!',
    };
  }

  /**
   * الحصول على استجابة AI للمحادثة
   */
  async getChatResponse(message: string, context: {
    userType: UserType;
    goals: Goal[];
    tasks: Task[];
  }): Promise<AIResponse> {
    try {
      const response = await apiService.sendAIMessage(message, context);
      return {
        message: response.response,
        suggestions: this.extractSuggestions(response.response),
      };
    } catch (error) {
      return this.localChatResponse(message, context);
    }
  }

  /**
   * استجابة محلية للمحادثة (Fallback)
   */
  private localChatResponse(message: string, context: any): AIResponse {
    const lowerMessage = message.toLowerCase();
    const { userType, goals, tasks } = context;

    // استجابات مخصصة حسب نوع المستخدم
    if (userType === 'student') {
      if (lowerMessage.includes('دراسة') || lowerMessage.includes('مذاكرة')) {
        return {
          message: 'كطالب، أنصحك بتقسيم وقت الدراسة إلى جلسات قصيرة (25-30 دقيقة) مع فترات راحة. هل تريد مني إنشاء جدول دراسي لك؟',
          suggestions: ['إنشاء جدول دراسي', 'نصائح للتركيز', 'تقنيات المذاكرة'],
        };
      }
    } else if (userType === 'visionary') {
      if (lowerMessage.includes('مشروع') || lowerMessage.includes('فكرة')) {
        return {
          message: 'رائع! لتحويل فكرتك إلى واقع، ابدأ بتحديد الأهداف الرئيسية والموارد المطلوبة. هل تريد مساعدة في تخطيط المشروع؟',
          suggestions: ['تخطيط المشروع', 'تحديد الأولويات', 'إدارة الموارد'],
        };
      }
    } else if (userType === 'professional') {
      if (lowerMessage.includes('مهارة') || lowerMessage.includes('تطوير')) {
        return {
          message: 'التطوير المهني المستمر مفتاح النجاح. أقترح تخصيص ساعة يومياً لتعلم مهارة جديدة. ما المهارة التي تريد تطويرها؟',
          suggestions: ['خطة تطوير مهني', 'دورات موصى بها', 'تتبع التقدم'],
        };
      }
    }

    // استجابة عامة
    return {
      message: `فهمت سؤالك. كيف يمكنني مساعدتك في تحقيق أهدافك؟ لديك حالياً ${goals.length} أهداف و ${tasks.length} مهام.`,
      suggestions: ['عرض الأهداف', 'اقتراح مهام', 'تحليل التقدم'],
    };
  }

  /**
   * استخراج الاقتراحات من النص
   */
  private extractSuggestions(text: string): string[] {
    // منطق بسيط - يمكن تحسينه
    const suggestions: string[] = [];
    if (text.includes('جدول')) suggestions.push('إنشاء جدول');
    if (text.includes('مهمة')) suggestions.push('إضافة مهمة');
    if (text.includes('هدف')) suggestions.push('تحديد هدف');
    return suggestions;
  }

  /**
   * اقتراح مهام ذكية بناءً على التقدم
   */
  async suggestSmartTasks(goal: Goal, userType: UserType): Promise<Task[]> {
    const suggestions: Task[] = [];
    const baseId = Date.now();

    if (goal.progress < 25) {
      // مرحلة البداية
      suggestions.push({
        id: baseId + 1,
        title: `البدء في ${goal.title}`,
        time: '09:00',
        duration: '30 دقيقة',
        completed: false,
        category: goal.category,
      });
    } else if (goal.progress < 75) {
      // مرحلة التقدم
      suggestions.push({
        id: baseId + 2,
        title: `مواصلة العمل على ${goal.title}`,
        time: '14:00',
        duration: '45 دقيقة',
        completed: false,
        category: goal.category,
      });
    } else {
      // مرحلة الإنهاء
      suggestions.push({
        id: baseId + 3,
        title: `إنهاء ${goal.title}`,
        time: '10:00',
        duration: '60 دقيقة',
        completed: false,
        category: goal.category,
      });
    }

    return suggestions;
  }
}

export default new EnhancedAIService();
