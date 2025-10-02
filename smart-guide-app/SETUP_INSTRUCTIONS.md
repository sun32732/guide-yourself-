# تعليمات الإعداد السريع - Quick Setup Instructions

<div dir="rtl">

## ⚡ البدء السريع (5 دقائق)

### الخطوة 1: تثبيت المتطلبات

تأكد من تثبيت:
- **Node.js** 18 أو أحدث: https://nodejs.org
- **Git**: https://git-scm.com

### الخطوة 2: استنساخ المشروع وتثبيت التبعيات

```bash
# الانتقال إلى مجلد التطبيق
cd smart-guide-app

# تثبيت التبعيات
npm install
```

### الخطوة 3: إعداد ملف البيئة (اختياري)

```bash
# نسخ ملف المثال
cp .env.example .env

# تعديل الملف وإضافة مفاتيحك (اختياري للتطوير)
# يمكنك تخطي هذه الخطوة للتجربة الأولية
```

### الخطوة 4: تشغيل التطبيق

```bash
npm start
```

سيفتح Expo Dev Tools في المتصفح. اختر:
- اضغط `a` لفتح على محاكي Android
- اضغط `i` لفتح على محاكي iOS (Mac فقط)
- اضغط `w` لفتح في المتصفح
- امسح QR code بتطبيق Expo Go على هاتفك

## 📱 التشغيل على الهاتف مباشرة

### Android / iOS

1. **حمّل تطبيق Expo Go**:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. **شغّل المشروع**:
   ```bash
   npm start
   ```

3. **امسح QR Code**:
   - Android: افتح Expo Go وامسح الكود
   - iOS: افتح الكاميرا وامسح الكود

## 🖥️ التشغيل على محاكي Android

### تثبيت Android Studio

1. حمّل Android Studio: https://developer.android.com/studio
2. افتح Android Studio
3. اذهب إلى Tools → Device Manager
4. أنشئ جهاز افتراضي (AVD) جديد
5. شغّل المحاكي

### تشغيل التطبيق

```bash
npm run android
```

## 🍎 التشغيل على محاكي iOS (Mac فقط)

### تثبيت Xcode

1. حمّل Xcode من App Store
2. افتح Terminal واكتب:
   ```bash
   sudo xcode-select --switch /Applications/Xcode.app
   xcodebuild -runFirstLaunch
   ```

### تشغيل التطبيق

```bash
npm run ios
```

## 🌐 التشغيل في المتصفح

```bash
npm run web
```

سيفتح التطبيق في المتصفح على `http://localhost:19006`

## 🔧 حل المشاكل الشائعة

### مشكلة: "command not found: expo"

```bash
npm install -g expo-cli
```

### مشكلة: "Unable to resolve module"

```bash
# احذف node_modules وأعد التثبيت
rm -rf node_modules
npm install

# امسح الكاش
npm start -- --clear
```

### مشكلة: المحاكي لا يعمل

```bash
# Android
# تأكد من تشغيل المحاكي أولاً من Android Studio

# iOS (Mac)
# تأكد من تثبيت Xcode Command Line Tools
xcode-select --install
```

### مشكلة: الخطوط العربية لا تظهر بشكل صحيح

الخطوط العربية مدعومة افتراضياً في React Native. إذا واجهت مشاكل:
- تأكد من استخدام خطوط تدعم العربية
- أعد تشغيل التطبيق بعد تنظيف الكاش

### مشكلة: التطبيق بطيء في وضع التطوير

هذا طبيعي. في وضع الإنتاج سيكون أسرع بكثير:
```bash
npm run build:android:apk
```

## 📦 بناء APK للتثبيت

### إعداد EAS (مرة واحدة)

```bash
# تثبيت EAS CLI
npm install -g eas-cli

# تسجيل الدخول
eas login

# ربط المشروع
eas build:configure
```

### بناء APK

```bash
npm run build:android:apk
```

سيستغرق البناء 10-20 دقيقة. بعد الانتهاء، ستحصل على رابط لتحميل APK.

## 🎨 تخصيص التطبيق

### تغيير الألوان

عدّل الألوان في ملفات المكونات:
- الخلفية: `#0b1020`
- اللون الأساسي: `#7c3aed`
- النص: `#ffffff`

### تغيير الاسم

في `app.json`:
```json
{
  "expo": {
    "name": "اسم تطبيقك",
    "slug": "your-app-slug"
  }
}
```

### إضافة أيقونة

1. أنشئ أيقونة 1024x1024 px
2. احفظها في `assets/icon.png`
3. أعد تشغيل التطبيق

## 📚 الخطوات التالية

بعد التشغيل الناجح:

1. **اقرأ الوثائق الكاملة**: [README.md](./README.md)
2. **تعلم كيفية البناء والنشر**: [BUILD_GUIDE.md](./BUILD_GUIDE.md)
3. **استكشف الكود**: ابدأ من `App.tsx`
4. **عدّل المكونات**: في مجلد `components/`
5. **أضف مميزات جديدة**: اتبع نفس نمط الكود الموجود

## 🆘 تحتاج مساعدة؟

- **وثائق Expo**: https://docs.expo.dev
- **وثائق React Native**: https://reactnative.dev
- **مجتمع Expo**: https://forums.expo.dev
- **Stack Overflow**: ابحث عن "expo" أو "react-native"

## ✅ قائمة التحقق

قبل البدء في التطوير، تأكد من:

- [ ] Node.js مثبت (تحقق: `node --version`)
- [ ] npm يعمل (تحقق: `npm --version`)
- [ ] التبعيات مثبتة (`npm install` نجح)
- [ ] التطبيق يعمل (`npm start` يعمل بدون أخطاء)
- [ ] يمكنك رؤية التطبيق (على المحاكي أو الهاتف أو المتصفح)

إذا أكملت جميع النقاط، أنت جاهز للبدء! 🎉

</div>
