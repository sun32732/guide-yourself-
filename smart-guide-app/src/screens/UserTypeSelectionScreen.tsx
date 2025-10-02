import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export type UserType = 'student' | 'visionary' | 'professional';

interface UserTypeOption {
  type: UserType;
  title: string;
  description: string;
  icon: string;
  color: string[];
  features: string[];
}

export default function UserTypeSelectionScreen({ navigation }: any) {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  const userTypes: UserTypeOption[] = [
    {
      type: 'student',
      title: 'طالب',
      description: 'للطلاب والدارسين',
      icon: '🎓',
      color: ['#3b82f6', '#2563eb'],
      features: [
        'جدولة الدراسة والمذاكرة',
        'تتبع الواجبات والامتحانات',
        'تنظيم المواد الدراسية',
        'اقتراحات لتحسين الأداء الأكاديمي',
      ],
    },
    {
      type: 'visionary',
      title: 'صاحب رؤية',
      description: 'لأصحاب المشاريع والأفكار',
      icon: '💡',
      color: ['#8b5cf6', '#7c3aed'],
      features: [
        'تخطيط وتنفيذ المشاريع',
        'تتبع الأهداف طويلة المدى',
        'إدارة الفرق والمهام',
        'تحليل التقدم واتخاذ القرارات',
      ],
    },
    {
      type: 'professional',
      title: 'تطوير مهني',
      description: 'للموظفين والمحترفين',
      icon: '💼',
      color: ['#10b981', '#059669'],
      features: [
        'إدارة المهام اليومية',
        'تطوير المهارات المهنية',
        'تتبع الإنجازات والترقيات',
        'تحقيق التوازن بين العمل والحياة',
      ],
    },
  ];

  const handleContinue = () => {
    if (selectedType) {
      // حفظ نوع المستخدم في Context/Storage
      navigation.navigate('Home', { userType: selectedType });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#0f172a', '#1e1b4b', '#312e81']} style={StyleSheet.absoluteFillObject} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>اختر نوع حسابك</Text>
          <Text style={styles.subtitle}>
            سنقوم بتخصيص تجربتك بناءً على احتياجاتك
          </Text>
        </View>

        {/* User Type Cards */}
        {userTypes.map((option) => (
          <Pressable
            key={option.type}
            onPress={() => setSelectedType(option.type)}
            style={[
              styles.typeCard,
              selectedType === option.type && styles.typeCardSelected,
            ]}
          >
            <BlurView
              intensity={30}
              tint="dark"
              style={[
                styles.typeCardBlur,
                selectedType === option.type && styles.typeCardBlurSelected,
              ]}
            >
              {/* Icon and Title */}
              <View style={styles.typeHeader}>
                <LinearGradient colors={option.color} style={styles.iconContainer}>
                  <Text style={styles.icon}>{option.icon}</Text>
                </LinearGradient>
                <View style={styles.typeInfo}>
                  <Text style={styles.typeTitle}>{option.title}</Text>
                  <Text style={styles.typeDescription}>{option.description}</Text>
                </View>
                {selectedType === option.type && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </View>

              {/* Features */}
              <View style={styles.featuresContainer}>
                {option.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={styles.featureBullet}>•</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </Pressable>
        ))}

        {/* Continue Button */}
        {selectedType && (
          <Pressable onPress={handleContinue} style={styles.continueButton}>
            <LinearGradient
              colors={
                userTypes.find((t) => t.type === selectedType)?.color || [
                  '#8b5cf6',
                  '#7c3aed',
                ]
              }
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>متابعة</Text>
              <Text style={styles.continueArrow}>←</Text>
            </LinearGradient>
          </Pressable>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { marginTop: 60, marginBottom: 32, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#94a3b8', textAlign: 'center', lineHeight: 24, paddingHorizontal: 20 },
  typeCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  typeCardSelected: { borderColor: 'rgba(139,92,246,0.6)' },
  typeCardBlur: { padding: 20, backgroundColor: 'rgba(15,23,42,0.5)' },
  typeCardBlurSelected: { backgroundColor: 'rgba(139,92,246,0.15)' },
  typeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: { fontSize: 32 },
  typeInfo: { flex: 1 },
  typeTitle: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 4 },
  typeDescription: { fontSize: 14, color: '#94a3b8' },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: { fontSize: 18, color: '#fff', fontWeight: '700' },
  featuresContainer: { marginTop: 8 },
  featureItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  featureBullet: { fontSize: 16, color: '#8b5cf6', marginRight: 8, marginTop: 2 },
  featureText: { fontSize: 14, color: '#cbd5e1', flex: 1, lineHeight: 20 },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  continueGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  continueText: { fontSize: 18, fontWeight: '700', color: '#fff', marginRight: 8 },
  continueArrow: { fontSize: 20, color: '#fff' },
});
