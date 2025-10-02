import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function SchedulingScreen({ navigation }: any) {
  const tasks = [
    { id: 1, title: 'اجتماع فريق العمل', time: '10:00 ص', duration: 'ساعة' },
    { id: 2, title: 'قراءة 30 صفحة', time: '2:00 م', duration: '45 دقيقة' },
    { id: 3, title: 'ممارسة الرياضة', time: '6:00 م', duration: 'ساعة' },
  ];

  const handleSmartScheduling = () => {
    console.log('AI Smart Scheduling triggered');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#0f172a', '#1e1b4b']} style={StyleSheet.absoluteFillObject} />
      
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>→</Text>
        </Pressable>
        <Text style={styles.headerTitle}>الجدولة</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={handleSmartScheduling} style={styles.smartButton}>
          <LinearGradient colors={['#8b5cf6', '#7c3aed']} style={styles.smartGradient}>
            <Text style={styles.smartIcon}>🤖</Text>
            <Text style={styles.smartText}>جدولة ذكية</Text>
          </LinearGradient>
        </Pressable>

        {tasks.map((task) => (
          <View key={task.id} style={styles.glassCard}>
            <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
              <View style={styles.taskContent}>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskDetails}>{task.time} • {task.duration}</Text>
                </View>
                <View style={styles.timeIcon}>
                  <Text style={styles.iconText}>⏰</Text>
                </View>
              </View>
            </BlurView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60 },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 24, color: '#fff' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20 },
  smartButton: { borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  smartGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18 },
  smartIcon: { fontSize: 24, marginRight: 12 },
  smartText: { fontSize: 18, fontWeight: '700', color: '#fff' },
  glassCard: { borderRadius: 20, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  blurContainer: { padding: 16, backgroundColor: 'rgba(15,23,42,0.5)' },
  taskContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 6 },
  taskDetails: { fontSize: 14, color: '#94a3b8' },
  timeIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(139,92,246,0.2)', justifyContent: 'center', alignItems: 'center' },
  iconText: { fontSize: 20 },
});
