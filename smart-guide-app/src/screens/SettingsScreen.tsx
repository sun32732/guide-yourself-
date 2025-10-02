import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function SettingsScreen({ navigation }: any) {
  const [googleCalendarSync, setGoogleCalendarSync] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#0f172a', '#1e1b4b']} style={StyleSheet.absoluteFillObject} />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>→</Text>
        </Pressable>
        <Text style={styles.headerTitle}>الإعدادات</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Account Section */}
        <View style={styles.glassCard}>
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <Text style={styles.sectionTitle}>الحساب</Text>
            <Pressable style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>👤</Text>
                <View>
                  <Text style={styles.settingLabel}>الملف الشخصي</Text>
                  <Text style={styles.settingDescription}>أحمد محمد</Text>
                </View>
              </View>
              <Text style={styles.arrow}>‹</Text>
            </Pressable>
          </BlurView>
        </View>

        {/* Sync Settings */}
        <View style={styles.glassCard}>
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <Text style={styles.sectionTitle}>المزامنة</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>📅</Text>
                <View>
                  <Text style={styles.settingLabel}>مزامنة Google Calendar</Text>
                  <Text style={styles.settingDescription}>مزامنة المهام مع تقويم جوجل</Text>
                </View>
              </View>
              <Switch
                value={googleCalendarSync}
                onValueChange={setGoogleCalendarSync}
                trackColor={{ false: '#334155', true: '#8b5cf6' }}
                thumbColor="#fff"
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🤖</Text>
                <View>
                  <Text style={styles.settingLabel}>اقتراحات الذكاء الاصطناعي</Text>
                  <Text style={styles.settingDescription}>اقتراحات ذكية للمهام</Text>
                </View>
              </View>
              <Switch
                value={aiSuggestions}
                onValueChange={setAiSuggestions}
                trackColor={{ false: '#334155', true: '#8b5cf6' }}
                thumbColor="#fff"
              />
            </View>
          </BlurView>
        </View>

        {/* Appearance */}
        <View style={styles.glassCard}>
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <Text style={styles.sectionTitle}>المظهر</Text>
            
            <Pressable style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🌐</Text>
                <View>
                  <Text style={styles.settingLabel}>اللغة</Text>
                  <Text style={styles.settingDescription}>العربية</Text>
                </View>
              </View>
              <Text style={styles.arrow}>‹</Text>
            </Pressable>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🌙</Text>
                <View>
                  <Text style={styles.settingLabel}>الوضع الداكن</Text>
                  <Text style={styles.settingDescription}>تفعيل الثيم الداكن</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#334155', true: '#8b5cf6' }}
                thumbColor="#fff"
              />
            </View>
          </BlurView>
        </View>

        {/* Notifications */}
        <View style={styles.glassCard}>
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <Text style={styles.sectionTitle}>الإشعارات</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>🔔</Text>
                <View>
                  <Text style={styles.settingLabel}>تفعيل الإشعارات</Text>
                  <Text style={styles.settingDescription}>استقبال التنبيهات</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#334155', true: '#8b5cf6' }}
                thumbColor="#fff"
              />
            </View>
          </BlurView>
        </View>

        {/* About */}
        <View style={styles.glassCard}>
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <Text style={styles.sectionTitle}>حول التطبيق</Text>
            
            <Pressable style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>ℹ️</Text>
                <Text style={styles.settingLabel}>الإصدار</Text>
              </View>
              <Text style={styles.versionText}>1.0.0</Text>
            </Pressable>
          </BlurView>
        </View>

        <View style={{ height: 40 }} />
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
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#8b5cf6', marginBottom: 16, textTransform: 'uppercase' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingIcon: { fontSize: 24, marginRight: 12, width: 32 },
  settingLabel: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 2 },
  settingDescription: { fontSize: 13, color: '#94a3b8' },
  arrow: { fontSize: 20, color: '#64748b' },
  versionText: { fontSize: 14, color: '#64748b' },
});
