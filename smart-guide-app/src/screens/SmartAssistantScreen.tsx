import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function SmartAssistantScreen({ navigation }: any) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    // محاكاة استجابة AI - في الإنتاج، سيتم استبدال هذا بـ API حقيقي
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('هدف') || lowerMessage.includes('أهداف')) {
      return 'يمكنني مساعدتك في تحديد وتتبع أهدافك. ما هو الهدف الذي تريد العمل عليه؟ يمكنك إضافة أهداف جديدة من شاشة الأهداف.';
    } else if (lowerMessage.includes('جدول') || lowerMessage.includes('مهام')) {
      return 'لديك عدة مهام اليوم. هل تريد مني إعادة ترتيب جدولك بناءً على الأولويات؟ يمكنني أيضاً اقتراح أوقات مثالية لكل مهمة.';
    } else if (lowerMessage.includes('وقت') || lowerMessage.includes('متى')) {
      return 'بناءً على جدولك الحالي، لديك وقت فراغ بين الساعة 3:00 م و 5:00 م. هل تريد جدولة نشاط في هذا الوقت؟';
    } else if (lowerMessage.includes('تذكير') || lowerMessage.includes('تنبيه')) {
      return 'سأقوم بإنشاء تذكير لك. ما هو الموضوع والوقت المطلوب؟';
    } else if (lowerMessage.includes('تقدم') || lowerMessage.includes('إنجاز')) {
      return 'تقدمك رائع! لقد أكملت 75% من هدف القراءة و 60% من هدف الرياضة. استمر في العمل الجيد! 🎉';
    } else if (lowerMessage.includes('نصيحة') || lowerMessage.includes('توصية')) {
      return 'نصيحتي لك: حاول تخصيص 30 دقيقة يومياً للقراءة في الصباح الباكر. الدراسات تظهر أن الإنتاجية تكون أعلى في هذا الوقت.';
    } else if (lowerMessage.includes('شكرا') || lowerMessage.includes('شكراً')) {
      return 'العفو! أنا هنا دائماً لمساعدتك. لا تتردد في سؤالي عن أي شيء. 😊';
    } else {
      return 'فهمت سؤالك. يمكنني مساعدتك في:\n• إدارة أهدافك وتتبع التقدم\n• تنظيم جدولك اليومي\n• اقتراح مهام بناءً على وقتك\n• إنشاء تذكيرات ذكية\n\nما الذي تحتاج مساعدة فيه؟';
    }
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // محاكاة تأخير استجابة AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const quickActions = [
    { id: 1, text: 'اقترح مهام لليوم', icon: '📝' },
    { id: 2, text: 'كيف تقدمي؟', icon: '📊' },
    { id: 3, text: 'نظم جدولي', icon: '📅' },
    { id: 4, text: 'نصيحة اليوم', icon: '💡' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#0f172a', '#1e1b4b']} style={StyleSheet.absoluteFillObject} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>→</Text>
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>المساعد الذكي</Text>
          <Text style={styles.headerSubtitle}>متصل • جاهز للمساعدة</Text>
        </View>
        <View style={styles.aiIcon}>
          <Text style={styles.aiIconText}>🤖</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
            ]}
          >
            <View style={styles.messageBubble}>
              <BlurView
                intensity={30}
                tint="dark"
                style={[
                  styles.messageBlur,
                  message.isUser ? styles.userMessageBlur : styles.aiMessageBlur,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString('ar-EG', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </BlurView>
            </View>
          </View>
        ))}

        {isTyping && (
          <View style={styles.typingIndicator}>
            <BlurView intensity={30} tint="dark" style={styles.typingBlur}>
              <View style={styles.typingDots}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </BlurView>
          </View>
        )}

        {/* Quick Actions */}
        {messages.length === 1 && (
          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsTitle}>اختصارات سريعة:</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <Pressable
                  key={action.id}
                  onPress={() => setInputText(action.text)}
                  style={styles.quickActionButton}
                >
                  <BlurView intensity={20} tint="dark" style={styles.quickActionBlur}>
                    <Text style={styles.quickActionIcon}>{action.icon}</Text>
                    <Text style={styles.quickActionText}>{action.text}</Text>
                  </BlurView>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.inputContainer}>
          <BlurView intensity={40} tint="dark" style={styles.inputBlur}>
            <TextInput
              style={styles.input}
              placeholder="اكتب رسالتك هنا..."
              placeholderTextColor="#64748b"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <Pressable
              onPress={handleSend}
              style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]}
              disabled={inputText.trim() === ''}
            >
              <LinearGradient
                colors={inputText.trim() !== '' ? ['#8b5cf6', '#7c3aed'] : ['#334155', '#1e293b']}
                style={styles.sendGradient}
              >
                <Text style={styles.sendIcon}>↑</Text>
              </LinearGradient>
            </Pressable>
          </BlurView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: { fontSize: 24, color: '#fff' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  headerSubtitle: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(139,92,246,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiIconText: { fontSize: 24 },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 20, paddingBottom: 10 },
  messageWrapper: { marginBottom: 12 },
  userMessageWrapper: { alignItems: 'flex-start' },
  aiMessageWrapper: { alignItems: 'flex-end' },
  messageBubble: { maxWidth: '80%' },
  messageBlur: {
    padding: 14,
    borderRadius: 18,
  },
  userMessageBlur: {
    backgroundColor: 'rgba(139,92,246,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.4)',
  },
  aiMessageBlur: {
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  messageText: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 6,
  },
  messageTime: { fontSize: 11, color: '#94a3b8', textAlign: 'left' },
  typingIndicator: { alignItems: 'flex-end', marginBottom: 12 },
  typingBlur: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(15,23,42,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  typingDots: { flexDirection: 'row', gap: 6 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8b5cf6',
    opacity: 0.6,
  },
  quickActionsContainer: { marginTop: 20 },
  quickActionsTitle: { fontSize: 14, color: '#94a3b8', marginBottom: 12 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  quickActionButton: { width: '48%', marginBottom: 8 },
  quickActionBlur: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(15,23,42,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  quickActionIcon: { fontSize: 24, marginBottom: 6 },
  quickActionText: { fontSize: 12, color: '#cbd5e1', textAlign: 'center' },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  inputBlur: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: 'rgba(15,23,42,0.8)',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 8,
    textAlign: 'right',
  },
  sendButton: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden' },
  sendButtonDisabled: { opacity: 0.5 },
  sendGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: { fontSize: 20, color: '#fff', fontWeight: '700' },
});
