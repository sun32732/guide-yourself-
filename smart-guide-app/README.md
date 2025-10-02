# سمارت جايد - Smart Guide

<div dir="rtl">

## نظرة عامة
تطبيق سمارت جايد هو مساعد شخصي ذكي مصمم لمساعدة المستخدمين في إدارة مهامهم اليومية، الجداول الزمنية، التذكيرات، الملاحظات، وتقديم توصيات مخصصة. التطبيق مبني باستخدام React Native و Expo.

## المميزات
- ✅ **إدارة الأهداف**: إنشاء وتتبع الأهداف النشطة والمكتملة مع شريط تقدم
- 📅 **الجدولة**: إدارة الأحداث والمواعيد اليومية
- 🔔 **الإشعارات**: نظام إشعارات ذكي مع عداد للرسائل غير المقروءة
- 🎨 **واجهة عربية**: دعم كامل للغة العربية مع تخطيط RTL
- 🌙 **الوضع الداكن**: تصميم عصري بألوان داكنة مريحة للعين
## هيكل المشروع
smart-guide-app/
├── src/
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── GoalsScreen.tsx
│   │   ├── SchedulingScreen.tsx
│   │   └── NotificationsScreen.tsx
│   ├── components/
│   │   ├── GlassCard.tsx
│   │   ├── GradientButton.tsx
│   │   └── ProgressBar.tsx
│   ├── styles/
│   │   ├── colors.ts
│   │   └── commonStyles.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── dateHelpers.ts
│   └── data/
│       └── mockData.ts
├── App.tsx
├── package.json
└── app.json
## التثبيت والتشغيل

### 1. تثبيت التبعيات
```bash
cd smart-guide-app
npm install
```

### 2. إعداد ملف البيئة
انسخ ملف `.env.example` إلى `.env` وأضف مفاتيحك:
```bash
cp .env.example .env
```

ثم عدّل الملف وأضف قيمك:
```env
GEMINI_API_KEY=your_actual_api_key
GOOGLE_OAUTH_CLIENT_ID=your_actual_client_id
```

### 3. تشغيل التطبيق

#### التشغيل في وضع التطوير
```bash
npm start
```

#### التشغيل على Android
```bash
npm run android
```

#### التشغيل على iOS
```bash
npm run ios
```

#### التشغيل على الويب
```bash
npm run web
```

### 4. بناء التطبيق للإنتاج

#### بناء APK للاختبار
```bash
npm run build:android:apk
```

#### بناء للنشر على Google Play
```bash
npm run build:android
```

## إنشاء الأيقونات
التطبيق يحتاج إلى الأيقونات التالية في مجلد `assets/`:
- `icon.png` - 1024x1024 px
- `adaptive-icon.png` - 1024x1024 px
- `splash.png` - 1284x2778 px
- `notification-icon.png` - 96x96 px

يمكنك استخدام القالب في `assets/icon-template.svg` كنقطة بداية.

## الاختبارات
```bash
npm test
```

## التقنيات المستخدمة
- **React Native** - إطار العمل الأساسي
- **Expo** - أدوات التطوير والبناء
- **TypeScript** - لغة البرمجة
- **React Navigation** - التنقل بين الشاشات
- **Expo Notifications** - نظام الإشعارات
- **Expo Calendar** - التكامل مع التقويم
- **Expo Speech** - المساعد الصوتي

## الألوان المستخدمة
- الخلفية الرئيسية: `#0b1020`
- اللون الأساسي (البنفسجي): `#7c3aed`
- النص الأبيض: `#ffffff`
- النص الثانوي: `#cbd5e1`

## المساهمة
نرحب بالمساهمات! يرجى:
1. عمل Fork للمشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص
هذا المشروع مرخص تحت رخصة MIT - انظر ملف LICENSE للتفاصيل.

## الدعم
للمساعدة أو الإبلاغ عن مشاكل، يرجى فتح Issue على GitHub.

</div>