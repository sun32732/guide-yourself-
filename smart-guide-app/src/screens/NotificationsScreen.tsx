import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function NotificationsScreen({ navigation }: any) {
  const notifications = [
    { id: 1, title: 'تذكير: اجتماع فريق العمل', message: 'يبدأ الاجتماع خلال 15 دقيقة', time: 'منذ 5 دقائق', icon: '⏰', isRead: false },
    { id: 2, title: 'تهنئة! هدف مكتمل', message: 'لقد أكملت هدف "قراءة 30 صفحة" بنجاح', time: 'منذ ساعة', icon: '🎉', isRead: false },
    { id: 3, title: 'توصية ذكية', message: 'بناءً على تقدمك، نوصي بزيادة وقت القراءة', time: 'منذ 3 ساعات', icon: '💡', isRead: true },
    { id: 4, title: 'تنبيه جدولة', message: 'لديك وقت فراغ في المساء، هل تريد جدولة نشاط؟', time: 'منذ 5 ساعات', icon: '📅', isRead: true },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#0f172a', '#1e1b4b']} style={StyleSheet.absoluteFillObject} />
      
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>→</Text>
        </Pressable>
        <Text style={styles.headerTitle}>التنبيهات</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {notifications.map((notif) => (
          <View key={notif.id} style={styles.glassCard}>
            <BlurView 
              intensity={30} 
              tint="dark" 
              style={[
                styles.blurContainer,
                { backgroundColor: notif.isRead ? 'rgba(15,23,42,0.5)' : 'rgba(139,92,246,0.15)' }
              ]}
            >
              <View style={styles.notifContent}>
                <View style={styles.iconContainer}>
                  <Text style={styles.notifIcon}>{notif.icon}</Text>
                </View>
                <View style={styles.notifInfo}>
                  <Text style={[styles.notifTitle, !notif.isRead && styles.unreadTitle]}>
                    {notif.title}
                  </Text>
                  <Text style={styles.notifMessage}>{notif.message}</Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
                </View>
              </View>
              {!notif.isRead && <View style={styles.unreadDot} />}
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
  glassCard: { borderRadius: 20, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  blurContainer: { padding: 16, position: 'relative' },
  notifContent: { flexDirection: 'row' },
  iconContainer: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(139,92,246,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  notifIcon: { fontSize: 24 },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: 16, fontWeight: '600', color: '#cbd5e1', marginBottom: 6 },
  unreadTitle: { color: '#fff', fontWeight: '700' },
  notifMessage: { fontSize: 14, color: '#94a3b8', marginBottom: 8, lineHeight: 20 },
  notifTime: { fontSize: 12, color: '#64748b' },
  unreadDot: { position: 'absolute', top: 16, left: 16, width: 10, height: 10, borderRadius: 5, backgroundColor: '#ef4444' },
});
