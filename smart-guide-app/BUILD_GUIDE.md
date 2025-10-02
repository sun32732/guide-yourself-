# دليل البناء والنشر - Build & Deployment Guide

<div dir="rtl">

## 📦 بناء التطبيق للإنتاج

### المتطلبات الأساسية

1. **حساب Expo**
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **ربط المشروع مع EAS**
   ```bash
   eas build:configure
   ```

### بناء APK للاختبار (Development Build)

```bash
npm run build:android:apk
```

أو مباشرة:
```bash
eas build --platform android --profile dev
```

هذا سينشئ ملف APK يمكن تثبيته مباشرة على أجهزة Android للاختبار.

### بناء AAB للنشر على Google Play

```bash
npm run build:android
```

أو مباشرة:
```bash
eas build --platform android --profile prod
```

هذا سينشئ ملف AAB (Android App Bundle) جاهز للرفع على Google Play Store.

## 🎨 إنشاء الأيقونات والصور

### الأيقونات المطلوبة

يجب إنشاء الملفات التالية في مجلد `assets/`:

1. **icon.png** (1024x1024 px)
   - الأيقونة الرئيسية للتطبيق
   - خلفية شفافة أو ملونة
   - تصميم بسيط وواضح

2. **adaptive-icon.png** (1024x1024 px)
   - للأجهزة Android الحديثة
   - يجب أن يكون التصميم في دائرة قطرها 66% من الحجم الكلي
   - الخلفية ستكون `#0b1020` حسب إعدادات `app.json`

3. **splash.png** (1284x2778 px)
   - شاشة البداية
   - خلفية `#0b1020`
   - الشعار في المنتصف

4. **notification-icon.png** (96x96 px)
   - أيقونة الإشعارات
   - خلفية شفافة
   - تصميم أحادي اللون (أبيض)

### أدوات مفيدة لإنشاء الأيقونات

- **Figma** - تصميم احترافي مجاني
- **Canva** - قوالب جاهزة
- **Icon Kitchen** - https://icon.kitchen/
- **App Icon Generator** - https://www.appicon.co/

### استخدام القالب SVG

يمكنك تعديل `assets/icon-template.svg` وتحويله إلى PNG:

```bash
# باستخدام Inkscape (مجاني)
inkscape icon-template.svg --export-filename=icon.png --export-width=1024
```

## 🔐 إعداد المفاتيح والأسرار

### 1. ملف البيئة المحلي

انسخ `.env.example` إلى `.env`:
```bash
cp .env.example .env
```

### 2. أسرار EAS (للبناء السحابي)

```bash
# إضافة مفتاح Gemini API
eas secret:create --scope project --name GEMINI_API_KEY --value "your_key_here"

# إضافة Google OAuth Client ID
eas secret:create --scope project --name GOOGLE_OAUTH_CLIENT_ID --value "your_client_id_here"
```

### 3. استخدام الأسرار في التطبيق

في `app.config.js` أو `app.json`:
```javascript
export default {
  expo: {
    extra: {
      geminiApiKey: process.env.GEMINI_API_KEY,
      googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    }
  }
}
```

في الكود:
```typescript
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.geminiApiKey;
```

## 📱 النشر على Google Play Store

### 1. إنشاء حساب مطور

- اذهب إلى https://play.google.com/console
- ادفع رسوم التسجيل لمرة واحدة ($25)

### 2. إنشاء تطبيق جديد

- اضغط "Create app"
- املأ المعلومات الأساسية
- اختر اللغة الافتراضية (العربية)

### 3. رفع ملف AAB

```bash
# بناء AAB
eas build --platform android --profile prod

# بعد اكتمال البناء، حمّل الملف من Expo
# ثم ارفعه إلى Google Play Console
```

### 4. إكمال معلومات المتجر

- **العنوان**: سمارت جايد - Smart Guide
- **الوصف القصير**: مساعدك الشخصي الذكي لإدارة المهام والأهداف
- **الوصف الكامل**: (انظر أدناه)
- **لقطات الشاشة**: 2-8 صور (1080x1920 px)
- **الأيقونة**: 512x512 px
- **صورة الميزة**: 1024x500 px

### وصف مقترح للمتجر

```
سمارت جايد - مساعدك الشخصي الذكي

🎯 إدارة الأهداف
تتبع أهدافك اليومية والشهرية والسنوية مع شريط تقدم مرئي

📅 جدولة ذكية
نظّم مواعيدك وأحداثك بسهولة مع تذكيرات تلقائية

🔔 إشعارات ذكية
احصل على تنبيهات في الوقت المناسب لمهامك المهمة

🎨 واجهة عربية جميلة
تصميم عصري يدعم اللغة العربية بالكامل مع وضع داكن مريح

✨ المميزات:
• إدارة الأهداف النشطة والمكتملة
• جدولة الأحداث والمواعيد
• نظام إشعارات متقدم
• واجهة سهلة الاستخدام
• دعم كامل للغة العربية
• تصميم داكن مريح للعين

مثالي للطلاب، المحترفين، وأي شخص يريد تنظيم حياته بشكل أفضل!
```

## 🧪 الاختبار قبل النشر

### اختبار محلي

```bash
# تشغيل على محاكي Android
npm run android

# تشغيل الاختبارات
npm test
```

### اختبار على أجهزة حقيقية

1. **بناء APK للاختبار**:
   ```bash
   eas build --platform android --profile dev
   ```

2. **تحميل APK وتثبيته على الجهاز**

3. **اختبار جميع المميزات**:
   - ✅ إنشاء وحذف الأهداف
   - ✅ التبديل بين الأهداف النشطة والمكتملة
   - ✅ إضافة أحداث للجدول
   - ✅ استقبال الإشعارات
   - ✅ فتح وإغلاق القائمة الجانبية
   - ✅ البحث (إذا كان مفعّلاً)

### اختبار داخلي (Internal Testing)

قبل النشر العام، استخدم "Internal Testing" في Google Play Console:
- أضف مختبرين (حتى 100 شخص)
- احصل على ملاحظات
- أصلح الأخطاء
- حدّث البناء

## 📊 التحديثات OTA (Over-The-Air)

Expo يدعم التحديثات الفورية بدون إعادة رفع على المتجر:

```bash
# نشر تحديث
eas update --branch production --message "إصلاح أخطاء بسيطة"
```

**ملاحظة**: التحديثات OTA تعمل فقط لتغييرات JavaScript/TypeScript، وليس للتغييرات في الكود الأصلي (Native).

## 🔄 إدارة الإصدارات

### تحديث رقم الإصدار

في `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",  // للمستخدمين
    "android": {
      "versionCode": 2   // لـ Google Play (يجب أن يزيد)
    }
  }
}
```

### سياسة الإصدارات المقترحة

- **Major** (1.0.0 → 2.0.0): تغييرات كبيرة في الواجهة أو المميزات
- **Minor** (1.0.0 → 1.1.0): مميزات جديدة
- **Patch** (1.0.0 → 1.0.1): إصلاحات أخطاء

## 🐛 التعامل مع الأخطاء

### تتبع الأخطاء

أضف Sentry للتتبع:
```bash
npx expo install @sentry/react-native
```

### السجلات (Logs)

```bash
# عرض سجلات البناء
eas build:list

# عرض تفاصيل بناء معين
eas build:view [BUILD_ID]
```

## 📞 الدعم

للمساعدة:
- وثائق Expo: https://docs.expo.dev
- وثائق EAS Build: https://docs.expo.dev/build/introduction
- مجتمع Expo: https://forums.expo.dev

</div>
