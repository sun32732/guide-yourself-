import * as Calendar from 'expo-calendar';
import { Platform, Alert } from 'react-native';

export interface CalendarEvent {
  id?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
  location?: string;
}

/**
 * طلب صلاحيات الوصول للتقويم
 */
export const requestCalendarPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    
    if (status === 'granted') {
      return true;
    } else {
      Alert.alert(
        'صلاحيات مطلوبة',
        'يحتاج التطبيق إلى صلاحية الوصول للتقويم لمزامنة المهام.',
        [{ text: 'حسناً', style: 'cancel' }]
      );
      return false;
    }
  } catch (error) {
    console.error('Error requesting calendar permissions:', error);
    return false;
  }
};

/**
 * الحصول على التقويم الافتراضي
 */
const getDefaultCalendar = async (): Promise<string | null> => {
  try {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    
    // البحث عن التقويم الافتراضي
    const defaultCalendar = calendars.find(
      (cal) => cal.source.name === 'Default' || cal.isPrimary
    );
    
    if (defaultCalendar) {
      return defaultCalendar.id;
    }
    
    // إذا لم يوجد، استخدم أول تقويم متاح
    if (calendars.length > 0) {
      return calendars[0].id;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting default calendar:', error);
    return null;
  }
};

/**
 * جلب الأحداث من التقويم
 */
export const fetchCalendarEvents = async (
  startDate: Date,
  endDate: Date
): Promise<CalendarEvent[]> => {
  try {
    const hasPermission = await requestCalendarPermissions();
    if (!hasPermission) {
      return [];
    }

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const calendarIds = calendars.map((cal) => cal.id);

    const events = await Calendar.getEventsAsync(calendarIds, startDate, endDate);

    return events.map((event) => ({
      id: event.id,
      title: event.title,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      notes: event.notes || undefined,
      location: event.location || undefined,
    }));
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    Alert.alert('خطأ', 'حدث خطأ أثناء جلب الأحداث من التقويم');
    return [];
  }
};

/**
 * إضافة حدث جديد للتقويم
 */
export const addEventToCalendar = async (event: CalendarEvent): Promise<boolean> => {
  try {
    const hasPermission = await requestCalendarPermissions();
    if (!hasPermission) {
      return false;
    }

    const calendarId = await getDefaultCalendar();
    if (!calendarId) {
      Alert.alert('خطأ', 'لم يتم العثور على تقويم متاح');
      return false;
    }

    const eventId = await Calendar.createEventAsync(calendarId, {
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      notes: event.notes,
      location: event.location,
      timeZone: 'Asia/Riyadh', // يمكن تغييره حسب المنطقة
    });

    if (eventId) {
      Alert.alert(
        'تم بنجاح',
        `تمت إضافة "${event.title}" إلى التقويم`,
        [{ text: 'حسناً', style: 'default' }]
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error adding event to calendar:', error);
    Alert.alert('خطأ', 'حدث خطأ أثناء إضافة الحدث للتقويم');
    return false;
  }
};

/**
 * تحديث حدث موجود
 */
export const updateCalendarEvent = async (
  eventId: string,
  updates: Partial<CalendarEvent>
): Promise<boolean> => {
  try {
    const hasPermission = await requestCalendarPermissions();
    if (!hasPermission) {
      return false;
    }

    await Calendar.updateEventAsync(eventId, {
      title: updates.title,
      startDate: updates.startDate,
      endDate: updates.endDate,
      notes: updates.notes,
      location: updates.location,
    });

    Alert.alert('تم بنجاح', 'تم تحديث الحدث في التقويم');
    return true;
  } catch (error) {
    console.error('Error updating calendar event:', error);
    Alert.alert('خطأ', 'حدث خطأ أثناء تحديث الحدث');
    return false;
  }
};

/**
 * حذف حدث من التقويم
 */
export const deleteCalendarEvent = async (eventId: string): Promise<boolean> => {
  try {
    const hasPermission = await requestCalendarPermissions();
    if (!hasPermission) {
      return false;
    }

    await Calendar.deleteEventAsync(eventId);
    Alert.alert('تم بنجاح', 'تم حذف الحدث من التقويم');
    return true;
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    Alert.alert('خطأ', 'حدث خطأ أثناء حذف الحدث');
    return false;
  }
};

/**
 * مزامنة المهام مع التقويم
 */
export const syncTasksWithCalendar = async (tasks: any[]): Promise<void> => {
  try {
    const hasPermission = await requestCalendarPermissions();
    if (!hasPermission) {
      return;
    }

    let successCount = 0;
    
    for (const task of tasks) {
      const [hours, minutes] = task.time.split(':');
      const startDate = new Date();
      startDate.setHours(parseInt(hours), parseInt(minutes), 0);
      
      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 60); // افتراض ساعة واحدة

      const event: CalendarEvent = {
        title: task.title,
        startDate,
        endDate,
        notes: `مهمة من تطبيق سمارت جايد\nالمدة: ${task.duration}`,
      };

      const success = await addEventToCalendar(event);
      if (success) successCount++;
    }

    if (successCount > 0) {
      Alert.alert(
        'تمت المزامنة',
        `تمت إضافة ${successCount} مهمة إلى التقويم`,
        [{ text: 'رائع!', style: 'default' }]
      );
    }
  } catch (error) {
    console.error('Error syncing tasks with calendar:', error);
    Alert.alert('خطأ', 'حدث خطأ أثناء المزامنة');
  }
};
