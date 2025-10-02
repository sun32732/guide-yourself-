import { Goal, Task } from '../types';

export interface SuggestedTask {
  title: string;
  startTime: string;
  duration: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  reason: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  duration: number; // بالدقائق
}

/**
 * تحليل الوقت المتاح في اليوم
 */
const analyzeAvailableTime = (existingTasks: Task[]): TimeSlot[] => {
  const workingHours = [
    { start: '08:00', end: '12:00' },
    { start: '14:00', end: '18:00' },
    { start: '19:00', end: '22:00' },
  ];

  const availableSlots: TimeSlot[] = [];

  workingHours.forEach((slot) => {
    const startHour = parseInt(slot.start.split(':')[0]);
    const endHour = parseInt(slot.end.split(':')[0]);
    const duration = (endHour - startHour) * 60;

    // التحقق من عدم وجود مهام في هذا الوقت
    const hasConflict = existingTasks.some((task) => {
      const taskHour = parseInt(task.time.split(':')[0]);
      return taskHour >= startHour && taskHour < endHour;
    });

    if (!hasConflict) {
      availableSlots.push({
        start: slot.start,
        end: slot.end,
        duration,
      });
    }
  });

  return availableSlots;
};

/**
 * تحليل الأهداف وتحديد الأولويات
 */
const analyzeGoals = (goals: Goal[]): { goal: Goal; urgency: number }[] => {
  return goals
    .map((goal) => {
      // حساب مستوى الإلحاح بناءً على التقدم والموعد النهائي
      const progressScore = 100 - goal.progress;
      const priorityScore = goal.priority === 'high' ? 3 : goal.priority === 'medium' ? 2 : 1;
      const urgency = progressScore * priorityScore;

      return { goal, urgency };
    })
    .sort((a, b) => b.urgency - a.urgency);
};

/**
 * توليد اقتراحات المهام بناءً على الأهداف والوقت المتاح
 */
export const generateTaskSuggestions = (
  goals: Goal[],
  existingTasks: Task[],
  userPreferences?: {
    preferredWorkTime?: 'morning' | 'afternoon' | 'evening';
    maxTaskDuration?: number;
  }
): SuggestedTask[] => {
  const availableSlots = analyzeAvailableTime(existingTasks);
  const prioritizedGoals = analyzeGoals(goals);
  const suggestions: SuggestedTask[] = [];

  // اقتراحات بناءً على الأهداف ذات الأولوية
  prioritizedGoals.forEach(({ goal, urgency }) => {
    if (availableSlots.length === 0) return;

    const slot = availableSlots[0];
    let taskTitle = '';
    let duration = '45 دقيقة';
    let reason = '';

    // اقتراحات مخصصة بناءً على نوع الهدف
    if (goal.title.includes('قراءة')) {
      taskTitle = `قراءة 20 صفحة - ${goal.title}`;
      duration = '30 دقيقة';
      reason = `لتحقيق هدف "${goal.title}" - التقدم الحالي ${goal.progress}%`;
    } else if (goal.title.includes('رياضة')) {
      taskTitle = `جلسة تمرين - ${goal.title}`;
      duration = 'ساعة';
      reason = `للحفاظ على نشاطك البدني - التقدم ${goal.progress}%`;
    } else if (goal.title.includes('برمجة') || goal.title.includes('تعلم')) {
      taskTitle = `دراسة وممارسة - ${goal.title}`;
      duration = '45 دقيقة';
      reason = `لتطوير مهاراتك - التقدم ${goal.progress}%`;
    } else {
      taskTitle = `العمل على ${goal.title}`;
      duration = '30 دقيقة';
      reason = `للتقدم نحو هدفك - التقدم الحالي ${goal.progress}%`;
    }

    suggestions.push({
      title: taskTitle,
      startTime: slot.start,
      duration,
      priority: goal.priority || 'medium',
      category: goal.category || 'عام',
      reason,
    });

    // إزالة الوقت المستخدم
    availableSlots.shift();
  });

  // إضافة اقتراحات عامة للصحة والإنتاجية
  if (availableSlots.length > 0) {
    const generalSuggestions: SuggestedTask[] = [
      {
        title: 'استراحة قصيرة وتأمل',
        startTime: availableSlots[0]?.start || '15:00',
        duration: '15 دقيقة',
        priority: 'low',
        category: 'الصحة',
        reason: 'للحفاظ على تركيزك وطاقتك',
      },
      {
        title: 'مراجعة وتخطيط',
        startTime: availableSlots[1]?.start || '17:00',
        duration: '20 دقيقة',
        priority: 'medium',
        category: 'التخطيط',
        reason: 'لمراجعة إنجازاتك وتخطيط الغد',
      },
    ];

    suggestions.push(...generalSuggestions.slice(0, availableSlots.length));
  }

  return suggestions;
};

/**
 * اقتراح جدول يومي كامل
 */
export const suggestDailySchedule = (
  goals: Goal[],
  existingTasks: Task[]
): SuggestedTask[] => {
  const suggestions = generateTaskSuggestions(goals, existingTasks);

  // إضافة مهام روتينية
  const routineTasks: SuggestedTask[] = [
    {
      title: 'تمارين الصباح',
      startTime: '07:00',
      duration: '20 دقيقة',
      priority: 'high',
      category: 'الصحة',
      reason: 'لبداية يوم نشيط ومليء بالطاقة',
    },
    {
      title: 'وجبة صحية',
      startTime: '13:00',
      duration: '30 دقيقة',
      priority: 'high',
      category: 'الصحة',
      reason: 'للحفاظ على صحتك وطاقتك',
    },
  ];

  return [...routineTasks, ...suggestions].sort((a, b) => {
    const timeA = parseInt(a.startTime.split(':')[0]);
    const timeB = parseInt(b.startTime.split(':')[0]);
    return timeA - timeB;
  });
};

/**
 * تحليل نمط المستخدم واقتراح أوقات مثالية
 */
export const analyzeUserPattern = (completedTasks: Task[]): {
  mostProductiveTime: string;
  averageTaskDuration: number;
  preferredCategories: string[];
} => {
  // تحليل بسيط - في الإنتاج سيكون أكثر تعقيداً
  const morningTasks = completedTasks.filter((t) => {
    const hour = parseInt(t.time.split(':')[0]);
    return hour >= 6 && hour < 12;
  });

  const afternoonTasks = completedTasks.filter((t) => {
    const hour = parseInt(t.time.split(':')[0]);
    return hour >= 12 && hour < 18;
  });

  const eveningTasks = completedTasks.filter((t) => {
    const hour = parseInt(t.time.split(':')[0]);
    return hour >= 18;
  });

  let mostProductiveTime = 'الصباح';
  if (afternoonTasks.length > morningTasks.length && afternoonTasks.length > eveningTasks.length) {
    mostProductiveTime = 'بعد الظهر';
  } else if (eveningTasks.length > morningTasks.length) {
    mostProductiveTime = 'المساء';
  }

  const categories = completedTasks.map((t) => t.category || 'عام');
  const uniqueCategories = [...new Set(categories)];

  return {
    mostProductiveTime,
    averageTaskDuration: 45, // افتراضي
    preferredCategories: uniqueCategories,
  };
};

/**
 * اقتراح مهمة واحدة بناءً على السياق الحالي
 */
export const suggestNextTask = (
  currentTime: Date,
  goals: Goal[],
  completedTasksToday: Task[]
): SuggestedTask | null => {
  const hour = currentTime.getHours();
  const prioritizedGoals = analyzeGoals(goals);

  if (prioritizedGoals.length === 0) {
    return null;
  }

  const topGoal = prioritizedGoals[0].goal;
  let suggestion: SuggestedTask;

  // اقتراح بناءً على الوقت الحالي
  if (hour >= 6 && hour < 12) {
    suggestion = {
      title: `العمل على ${topGoal.title}`,
      startTime: `${hour + 1}:00`,
      duration: '45 دقيقة',
      priority: 'high',
      category: topGoal.category || 'عام',
      reason: 'الصباح هو أفضل وقت للإنتاجية',
    };
  } else if (hour >= 12 && hour < 18) {
    suggestion = {
      title: `متابعة ${topGoal.title}`,
      startTime: `${hour + 1}:00`,
      duration: '30 دقيقة',
      priority: 'medium',
      category: topGoal.category || 'عام',
      reason: 'استغل وقت بعد الظهر للتقدم',
    };
  } else {
    suggestion = {
      title: `مراجعة ${topGoal.title}`,
      startTime: `${hour + 1}:00`,
      duration: '20 دقيقة',
      priority: 'low',
      category: topGoal.category || 'عام',
      reason: 'مراجعة سريعة قبل نهاية اليوم',
    };
  }

  return suggestion;
};
