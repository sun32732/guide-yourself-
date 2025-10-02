# دليل الإعداد والتشغيل - Smart Guide App

## 📋 المتطلبات

- Node.js (v18 أو أحدث)
- npm أو yarn
- Expo CLI
- محاكي Android أو iOS (اختياري)
- تطبيق Expo Go على الهاتف (للاختبار السريع)

## 🚀 خطوات التشغيل

### 1. تثبيت المكتبات

```bash
npm install
```

### 2. تشغيل التطبيق

```bash
# تشغيل خادم التطوير
npm start

# أو باستخدام Expo
npx expo start
```

### 3. فتح التطبيق

- **على الهاتف**: امسح QR Code باستخدام تطبيق Expo Go
- **على المحاكي**: اضغط `a` للأندرويد أو `i` للـ iOS
- **على المتصفح**: اضغط `w` (بعض الميزات قد لا تعمل)

## 🎨 الشاشات المتوفرة

### 1. Splash Screen (شاشة البداية)
- **المسار**: `src/screens/SplashScreen.tsx`
- **الميزات**:
  - تصميم Liquid Glass
  - شعار التطبيق مع تدرج لوني
  - زر تسجيل الدخول بـ Google
  - رسالة ترحيب بالعربية

### 2. Home Screen (الشاشة الرئيسية)
- **المسار**: `src/screens/HomeScreen.tsx`
- **الميزات**:
  - رسالة ترحيب مخصصة حسب الوقت
  - ملخص جدول اليوم
  - تقدم الأهداف مع Progress Bars
  - أزرار سريعة للتنقل

### 3. Goals Screen (شاشة الأهداف)
- **المسار**: `src/screens/GoalsScreen.tsx`
- **الميزات**:
  - قائمة الأهداف الشخصية
  - شريط تقدم لكل هدف
  - عرض الموعد النهائي
  - تصميم بطاقات glassmorphic

### 4. Scheduling Screen (شاشة الجدولة)
- **المسار**: `src/screens/SchedulingScreen.tsx`
- **الميزات**:
  - قائمة المهام اليومية
  - زر "جدولة ذكية" للمساعد AI
  - عرض الوقت والمدة
  - أيقونات توضيحية

### 5. Notifications Screen (شاشة التنبيهات)
- **المسار**: `src/screens/NotificationsScreen.tsx`
- **الميزات**:
  - قائمة الإشعارات
  - تمييز المقروء وغير المقروء
  - أيقونات مميزة لكل نوع
  - طوابع زمنية

## 🎯 التنقل بين الشاشات

التطبيق يستخدم React Navigation مع Stack Navigator:

```
Splash → Home → Goals
              → Scheduling
              → Notifications
```

## 🔧 التخصيص

### تغيير الألوان

الألوان الرئيسية في التطبيق:
- **الخلفية**: `#0f172a`, `#1e1b4b`, `#312e81`
- **اللون الأساسي**: `#8b5cf6` (بنفسجي)
- **اللون الثانوي**: `#6366f1` (أزرق)
- **النصوص**: `#ffffff`, `#cbd5e1`, `#94a3b8`

### إضافة شاشة جديدة

1. أنشئ ملف في `src/screens/`
2. استخدم نفس البنية مع Glassmorphic Design
3. أضف الشاشة في `App.tsx`:

```tsx
import NewScreen from './src/screens/NewScreen';

// في Stack.Navigator
<Stack.Screen name="NewScreen" component={NewScreen} />
```

## 📦 المكتبات المستخدمة

```json
{
  "expo-blur": "تأثيرات Blur",
  "expo-linear-gradient": "التدرجات اللونية",
  "@react-navigation/native": "التنقل",
  "@react-navigation/native-stack": "Stack Navigation",
  "react-native-screens": "تحسين الأداء",
  "react-native-safe-area-context": "مناطق الأمان"
}
```

## ⚠️ ملاحظات مهمة

1. **Google Authentication**: حالياً معطل، يحتاج إعداد Firebase
2. **البيانات**: البيانات الحالية ثابتة (Mock Data)
3. **RTL Support**: التطبيق يدعم العربية بالكامل
4. **الأداء**: استخدم `expo-blur` بحذر على الأجهزة القديمة

## 🐛 حل المشاكل الشائعة

### المشكلة: أخطاء في التثبيت
```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install
```

### المشكلة: Blur لا يعمل
- تأكد من تثبيت `expo-blur` بشكل صحيح
- على الويب، Blur قد لا يعمل بشكل مثالي

### المشكلة: الخطوط العربية غير واضحة
- أضف خطوط عربية مخصصة في `assets/fonts/`
- استخدم `expo-font` لتحميلها

## 📱 البناء للإنتاج

```bash
# بناء APK للأندرويد
eas build --platform android --profile preview

# بناء للـ iOS
eas build --platform ios --profile preview
```

## 🎉 الميزات القادمة

- [ ] تفعيل Google Authentication
- [ ] ربط Backend API
- [ ] State Management (Redux/Zustand)
- [ ] قاعدة بيانات محلية (SQLite)
- [ ] إشعارات Push
- [ ] مزامنة السحابة
- [ ] وضع Dark/Light Mode
- [ ] تحليلات وإحصائيات
- [ ] مساعد AI متقدم

## 📞 الدعم

للمساعدة أو الإبلاغ عن مشاكل، راجع ملف `PROJECT_STATUS.md`
