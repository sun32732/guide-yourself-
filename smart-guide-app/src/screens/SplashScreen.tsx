import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useApp } from '../context/AppContext';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  const { userType, setUser } = useApp();

  const handleGoogleLogin = async () => {
    // سيتم تنفيذ Google Authentication الحقيقية لاحقاً (Firebase/OAuth)
    // حالياً نحفظ مستخدم افتراضي محلياً ونوجه بحسب نوع المستخدم
    setUser({ id: 'local-1', name: 'مستخدم', email: 'user@example.com', preferences: { language: 'ar', theme: 'dark', notifications: true } });

    if (!userType) {
      navigation.replace('UserTypeSelection');
    } else {
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* خلفية متدرجة */}
      <LinearGradient
        colors={['#0f172a', '#1e1b4b', '#312e81']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* دوائر زخرفية في الخلفية */}
      <View style={[styles.circle, { top: -100, right: -100 }]} />
      <View style={[styles.circle, { bottom: -150, left: -100, width: 400, height: 400 }]} />

      {/* البطاقة الزجاجية */}
      <View style={styles.glassCard}>
        <BlurView intensity={40} tint="dark" style={styles.blurContainer}>
          {/* شعار التطبيق */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#8b5cf6', '#6366f1', '#3b82f6']}
              style={styles.logo}
            >
              <Text style={styles.logoText}>SG</Text>
            </LinearGradient>
          </View>

          {/* رسالة الترحيب */}
          <Text style={styles.welcomeTitle}>مرحباً بك في</Text>
          <Text style={styles.appName}>سمارت جايد</Text>
          <Text style={styles.subtitle}>مساعدك الذكي لتحقيق أهدافك</Text>

          {/* زر تسجيل الدخول */}
          <Pressable
            onPress={handleGoogleLogin}
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.loginButtonPressed
            ]}
          >
            <LinearGradient
              colors={['#8b5cf6', '#7c3aed']}
              style={styles.loginGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.googleIcon}>G</Text>
              <Text style={styles.loginText}>تسجيل الدخول بواسطة Google</Text>
            </LinearGradient>
          </Pressable>

          {/* نص إضافي */}
          <Text style={styles.footerText}>
            بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية
          </Text>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  circle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  glassCard: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 10,
  },
  blurContainer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  welcomeTitle: {
    fontSize: 18,
    color: '#cbd5e1',
    marginBottom: 8,
    textAlign: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  loginButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  loginButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  loginGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  googleIcon: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 36,
    height: 36,
    textAlign: 'center',
    lineHeight: 36,
    borderRadius: 18,
  },
  loginText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
