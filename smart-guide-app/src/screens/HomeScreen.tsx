import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'صباح الخير' : currentHour < 18 ? 'مساء الخير' : 'مساء الخير';
  const userName = 'أحمد';

  const todaySchedule = [
    { id: 1, title: 'اجتماع فريق العمل', time: '10:00 ص', completed: true },
    { id: 2, title: 'قراءة 30 صفحة', time: '2:00 م', completed: false },
    { id: 3, title: 'ممارسة الرياضة', time: '6:00 م', completed: false },
  ];

  const goalProgress = [
    { id: 1, title: 'قراءة 12 كتاب', progress: 75, color: '#8b5cf6' },
    { id: 2, title: 'ممارسة الرياضة', progress: 60, color: '#3b82f6' },
    { id: 3, title: 'تعلم البرمجة', progress: 40, color: '#10b981' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* خلفية متدرجة */}
      <LinearGradient
        colors={['#0f172a', '#1e1b4b', '#312e81']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* دوائر زخرفية */}
      <View style={[styles.circle, { top: -50, right: -50 }]} />
      <View style={[styles.circle, { bottom: 100, left: -80, width: 250, height: 250 }]} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* رسالة الترحيب */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{greeting}، {userName} 👋</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('ar-EG', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>

        {/* بطاقة ملخص اليوم */}
        <View style={styles.glassCard}>
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>جدول اليوم</Text>
              <Pressable onPress={() => navigation.navigate('Scheduling')}>
                <Text style={styles.seeAllText}>عرض الكل ←</Text>
              </Pressable>
            </View>
            
            {todaySchedule.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <View style={styles.taskRight}>
                  <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
                    {task.completed && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View>
                    <Text style={[styles.taskTitle, task.completed && styles.taskCompleted]}>
                      {task.title}
                    </Text>
                    <Text style={styles.taskTime}>{task.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </BlurView>
        </View>

        {/* بطاقة تقدم الأهداف */}
        <View style={styles.glassCard}>
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>تقدم الأهداف</Text>
              <Pressable onPress={() => navigation.navigate('Goals')}>
                <Text style={styles.seeAllText}>عرض الكل ←</Text>
              </Pressable>
            </View>
            
            {goalProgress.map((goal) => (
              <View key={goal.id} style={styles.goalItem}>
                <View style={styles.goalHeader}>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                  <Text style={styles.goalPercentage}>{goal.progress}%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarBg}>
                    <LinearGradient
                      colors={[goal.color, goal.color + 'CC']}
                      style={[styles.progressBarFill, { width: `${goal.progress}%` }]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </BlurView>
        </View>

        {/* أزرار سريعة */}
        <View style={styles.quickActions}>
          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Goals')}
          >
            <BlurView intensity={30} tint="dark" style={styles.actionBlur}>
              <Text style={styles.actionIcon}>🎯</Text>
              <Text style={styles.actionText}>الأهداف</Text>
            </BlurView>
          </Pressable>

          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Scheduling')}
          >
            <BlurView intensity={30} tint="dark" style={styles.actionBlur}>
              <Text style={styles.actionIcon}>📅</Text>
              <Text style={styles.actionText}>الجدولة</Text>
            </BlurView>
          </Pressable>

          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <BlurView intensity={30} tint="dark" style={styles.actionBlur}>
              <Text style={styles.actionIcon}>🔔</Text>
              <Text style={styles.actionText}>التنبيهات</Text>
            </BlurView>
          </Pressable>
        </View>

        <View style={styles.quickActions}>
          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('SmartAssistant')}
          >
            <BlurView intensity={30} tint="dark" style={styles.actionBlur}>
              <Text style={styles.actionIcon}>🤖</Text>
              <Text style={styles.actionText}>المساعد الذكي</Text>
            </BlurView>
          </Pressable>

          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <BlurView intensity={30} tint="dark" style={styles.actionBlur}>
              <Text style={styles.actionIcon}>⚙️</Text>
              <Text style={styles.actionText}>الإعدادات</Text>
            </BlurView>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  circle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'right',
  },
  date: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'right',
  },
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  blurContainer: {
    padding: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  seeAllText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  taskRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  taskTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  taskTime: {
    fontSize: 13,
    color: '#94a3b8',
  },
  goalItem: {
    marginBottom: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  goalPercentage: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: '700',
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  actionBlur: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
});
