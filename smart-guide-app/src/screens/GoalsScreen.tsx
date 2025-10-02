import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function GoalsScreen({ navigation }: any) {
  const goals = [
    { id: 1, title: 'قراءة 12 كتاب', description: 'قراءة كتاب واحد كل شهر', progress: 75, deadline: '15 ديسمبر 2024' },
    { id: 2, title: 'ممارسة الرياضة', description: 'ممارسة الرياضة 4 مرات أسبوعياً', progress: 60, deadline: '31 ديسمبر 2024' },
    { id: 3, title: 'تعلم البرمجة', description: 'إكمال دورة React Native', progress: 40, deadline: '20 يناير 2025' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#0f172a', '#1e1b4b']} style={StyleSheet.absoluteFillObject} />
      
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>→</Text>
        </Pressable>
        <Text style={styles.headerTitle}>الأهداف</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {goals.map((goal) => (
          <View key={goal.id} style={styles.glassCard}>
            <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalDescription}>{goal.description}</Text>
              
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>التقدم</Text>
                  <Text style={styles.progressValue}>{goal.progress}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={['#8b5cf6', '#6366f1']}
                    style={[styles.progressFill, { width: `${goal.progress}%` }]}
                  />
                </View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.deadline}>📅 {goal.deadline}</Text>
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
  glassCard: { borderRadius: 20, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  blurContainer: { padding: 20, backgroundColor: 'rgba(15,23,42,0.5)' },
  goalTitle: { fontSize: 20, fontWeight: '700', color: '#fff', marginBottom: 8 },
  goalDescription: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },
  progressSection: { marginBottom: 16 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 14, color: '#cbd5e1' },
  progressValue: { fontSize: 16, fontWeight: '700', color: '#8b5cf6' },
  progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  deadline: { fontSize: 13, color: '#64748b' },
});
