# دليل حفظ الصور - Image Save Guide

<div dir="rtl">

## 📥 كيفية حفظ الصور في مجلد assets

### الطريقة 1: السحب والإفلات (الأسهل)

1. **افتح مجلد assets**:
   - اذهب إلى: `C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app\assets\`

2. **احفظ الصور من المحادثة**:
   - انقر بزر الماوس الأيمن على كل صورة في المحادثة
   - اختر "Save image as..." أو "حفظ الصورة باسم..."
   - احفظها في مجلد `assets` بالاسم المناسب

### الأسماء المطلوبة:

| الصورة في المحادثة | احفظها باسم | الوصف |
|---------------------|-------------|-------|
| الصورة 5 (الزجاجية الكاملة) | `icon.png` | الأيقونة الرئيسية |
| الصورة 4 (الجزء الأيسر) | `adaptive-icon.png` | أيقونة Android التكيفية |
| الصورة 3 أو 5 | `splash.png` | شاشة البداية |
| الصورة 2 (البيضاء والسوداء) | `notification-icon.png` | أيقونة الإشعارات |

### الطريقة 2: استخدام صور مؤقتة

إذا لم تستطع حفظ الصور، يمكنك استخدام أيقونات مؤقتة:

1. **حمّل أيقونات مجانية من**:
   - https://www.flaticon.com/free-icon/compass
   - https://www.iconfinder.com/search?q=compass&price=free
   - https://icons8.com/icons/set/compass

2. **أو استخدم أيقونة Expo الافتراضية**:
   - حمّل من: https://docs.expo.dev/guides/app-icons/

### الطريقة 3: إنشاء أيقونات بسيطة

استخدم أداة مجانية لإنشاء الأيقونات:

**Canva** (الأسهل):
1. اذهب إلى: https://www.canva.com
2. ابحث عن "App Icon"
3. اختر قالب بنفسجي/أزرق
4. أضف رمز بوصلة
5. حمّل بحجم 1024x1024

**Figma** (احترافي):
1. اذهب إلى: https://www.figma.com
2. أنشئ مربع 1024x1024
3. صمم أيقونة بسيطة
4. صدّر كـ PNG

### التحقق من الصور

بعد حفظ الصور، تحقق من وجودها:

```bash
cd C:\Users\Dell\Desktop\guide-yourself-\smart-guide-app\assets
dir
```

يجب أن ترى:
```
icon.png
adaptive-icon.png
splash.png
notification-icon.png
```

### المواصفات المطلوبة:

- **icon.png**: 1024x1024 px، PNG، خلفية شفافة أو ملونة
- **adaptive-icon.png**: 1024x1024 px، PNG، خلفية شفافة
- **splash.png**: 1284x2778 px (أو أي حجم كبير)، PNG
- **notification-icon.png**: 96x96 px، PNG، خلفية شفافة، أبيض وأسود

### إذا لم تكن الصور بالحجم الصحيح

استخدم أداة تغيير الحجم:
- https://www.iloveimg.com/resize-image
- https://imageresizer.com/
- أو Photoshop / GIMP

### حل بديل: استخدام أيقونة واحدة لكل شيء

إذا كان لديك صورة واحدة فقط:

1. احفظها 4 مرات بأسماء مختلفة:
   ```
   icon.png
   adaptive-icon.png
   splash.png
   notification-icon.png
   ```

2. Expo سيقوم بتغيير حجمها تلقائياً

## 🆘 لا تستطيع حفظ الصور؟

### الحل المؤقت: استخدم أيقونة Expo الافتراضية

لا تفعل شيئاً! احذف سطور الأيقونات من `app.json`:

```json
{
  "expo": {
    "name": "سمارت جايد",
    // احذف هذه الأسطر مؤقتاً:
    // "icon": "./assets/icon.png",
    // "splash": { ... },
    // ...
  }
}
```

Expo سيستخدم أيقونة افتراضية، والتطبيق سيعمل بشكل طبيعي.

## ✅ بعد حفظ الصور

شغّل التطبيق:
```bash
npm start
```

الأيقونات ستظهر تلقائياً!

</div>
