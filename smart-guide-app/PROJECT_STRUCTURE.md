# هيكل المشروع - Smart Guide App

## 📁 الهيكل الجديد

```
smart-guide-app/
├── src/
│   └── screens/
│       ├── SplashScreen.tsx      # شاشة البداية مع تسجيل الدخول
│       ├── HomeScreen.tsx         # الشاشة الرئيسية
│       ├── GoalsScreen.tsx        # شاشة الأهداف
│       ├── SchedulingScreen.tsx   # شاشة الجدولة
│       └── NotificationsScreen.tsx # شاشة التنبيهات
├── App.tsx                        # نقطة الدخول مع Navigation
├── package.json
└── app.json
```

## 🎨 التصميم

جميع الشاشات تستخدم **Liquid Glass / Glassmorphism Design**:
- خلفيات متدرجة داكنة
- بطاقات زجاجية شفافة مع تأثير Blur
- حدود شفافة وظلال ناعمة
- نصوص عربية بخطوط واضحة

## 🚀 الشاشات المتوفرة

### 1. **SplashScreen** (شاشة البداية)
- شعار التطبيق
- رسالة ترحيب بالعربية
- زر تسجيل الدخول بـ Google
- تصميم glassmorphic مع دوائر زخرفية

### 2. **HomeScreen** (الرئيسية)
- رسالة ترحيب مخصصة
- ملخص جدول اليوم
- تقدم الأهداف مع Progress Bars
- أزرار سريعة للتنقل

### 3. **GoalsScreen** (الأهداف)
- قائمة الأهداف الشخصية
- شريط تقدم لكل هدف
- عنوان ووصف وموعد نهائي
- بطاقات glassmorphic

### 4. **SchedulingScreen** (الجدولة)
- قائمة المهام اليومية
- زر "جدولة ذكية" للمساعد الذكي
- عرض الوقت والمدة لكل مهمة
- أيقونات توضيحية

### 5. **NotificationsScreen** (التنبيهات)
- قائمة الإشعارات
- أيقونات مميزة لكل نوع
- تمييز بصري للإشعارات غير المقروءة
- طوابع زمنية

## 📦 المكتبات المستخدمة

- **expo-blur**: تأثيرات Blur للزجاج
- **expo-linear-gradient**: التدرجات اللونية
- **@react-navigation/native**: التنقل بين الشاشات
- **expo-auth-session**: تسجيل الدخول بـ Google

## 🔧 التشغيل

```bash
# تثبيت المكتبات
npm install

# تشغيل التطبيق
npm start

# تشغيل على Android
npm run android

# تشغيل على iOS
npm run ios
```

## ✨ الميزات

- ✅ تصميم Liquid Glass كامل
- ✅ دعم اللغة العربية بالكامل
- ✅ نظام تنقل سلس
- ✅ واجهات متجاوبة
- ✅ تأثيرات بصرية احترافية
- ✅ هيكل مرن وقابل للتوسع

## 🎯 الخطوات التالية

1. تفعيل Google Authentication
2. ربط البيانات بـ Backend/API
3. إضافة المزيد من الشاشات
4. تطبيق State Management (Redux/Context)
5. إضافة الرسوم المتحركة المتقدمة
