# أوامر البناء - Build Commands

<div dir="rtl">

## 📍 المجلد الصحيح

**يجب أن تكون دائماً في هذا المجلد:**
```
C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app
```

## ✅ كيف تتأكد أنك في المجلد الصحيح؟

### في Terminal:

```powershell
# اعرض المجلد الحالي
pwd

# يجب أن يظهر:
# C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app
```

### في VS Code:

انظر أسفل الشاشة في شريط الحالة - يجب أن ترى:
```
smart-guide-app
```

## 🚀 أوامر البناء

### 1. البناء للاختبار (APK)

```powershell
# تأكد أنك في المجلد الصحيح أولاً
cd C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app

# ثم شغّل البناء
eas build --platform android --profile dev
```

### 2. البناء للنشر (AAB)

```powershell
cd C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app
eas build --platform android --profile prod
```

### 3. استخدام السكريبتات الجاهزة

```powershell
cd C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app

# للاختبار
npm run build:android:apk

# للنشر
npm run build:android
```

## 📂 الملفات المهمة

### 1. package.json
الموقع: `smart-guide-app/package.json`

يحتوي على السكريبتات:
```json
{
  "scripts": {
    "build:android": "eas build --platform android --profile prod",
    "build:android:apk": "eas build --platform android --profile dev"
  }
}
```

### 2. eas.json
الموقع: `smart-guide-app/eas.json`

يحتوي على إعدادات البناء:
```json
{
  "build": {
    "dev": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "prod": {
      "developmentClient": false,
      "distribution": "store"
    }
  }
}
```

### 3. app.json
الموقع: `smart-guide-app/app.json`

يحتوي على معلومات التطبيق

## ❌ الأخطاء الشائعة

### خطأ: "Missing script"
**السبب**: أنت في المجلد الخطأ
**الحل**:
```powershell
cd C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app
```

### خطأ: "command not found"
**السبب**: EAS CLI غير مثبت
**الحل**:
```powershell
npm install -g eas-cli
```

### خطأ: "Not logged in"
**السبب**: لم تسجل دخول
**الحل**:
```powershell
eas login
```

## 📋 قائمة التحقق قبل البناء

- [ ] أنت في المجلد الصحيح: `smart-guide-app/`
- [ ] EAS CLI مثبت: `eas --version`
- [ ] مسجل دخول: `eas whoami`
- [ ] المشروع مربوط: `eas.json` موجود

## 🎯 الأمر الكامل (نسخ ولصق)

```powershell
# 1. انتقل للمجلد الصحيح
cd C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app

# 2. تأكد من تسجيل الدخول
eas whoami

# 3. ابدأ البناء
eas build --platform android --profile dev

# أو استخدم السكريبت
npm run build:android:apk
```

## 📱 بعد البناء

عند نجاح البناء، ستحصل على:
1. رابط لتحميل APK
2. إشعار في Terminal
3. يمكنك رؤية البناء على: https://expo.dev

## 💡 نصيحة

احفظ هذا الأمر في ملف نصي:
```powershell
cd C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app && eas build --platform android --profile dev
```

ثم فقط انسخه والصقه في Terminal عند الحاجة!

</div>
