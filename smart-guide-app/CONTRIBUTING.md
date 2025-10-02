# دليل المساهمة - Contributing Guide

<div dir="rtl">

## 🤝 نرحب بمساهماتك!

شكراً لاهتمامك بالمساهمة في مشروع سمارت جايد. هذا الدليل سيساعدك على البدء.

## 📋 قبل البدء

### اقرأ الوثائق

- [README.md](./README.md) - نظرة عامة على المشروع
- [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - تعليمات الإعداد
- [BUILD_GUIDE.md](./BUILD_GUIDE.md) - دليل البناء والنشر

### تأكد من البيئة

```bash
node --version  # يجب أن يكون 18 أو أحدث
npm --version   # يجب أن يكون 9 أو أحدث
```

## 🚀 خطوات المساهمة

### 1. Fork المشروع

اضغط على زر "Fork" في أعلى الصفحة على GitHub.

### 2. استنسخ نسختك

```bash
git clone https://github.com/YOUR_USERNAME/guide-yourself-.git
cd guide-yourself-/smart-guide-app
```

### 3. أضف المستودع الأصلي

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/guide-yourself-.git
```

### 4. أنشئ فرع جديد

```bash
git checkout -b feature/amazing-feature
```

استخدم أسماء واضحة للفروع:
- `feature/` - للمميزات الجديدة
- `fix/` - لإصلاح الأخطاء
- `docs/` - لتحديثات الوثائق
- `refactor/` - لإعادة هيكلة الكود
- `test/` - لإضافة الاختبارات

### 5. ثبّت التبعيات

```bash
npm install
```

### 6. شغّل التطبيق

```bash
npm start
```

### 7. قم بالتعديلات

اتبع معايير الكود (انظر أدناه).

### 8. اختبر تعديلاتك

```bash
# شغّل الاختبارات
npm test

# تأكد من عمل التطبيق
npm start
```

### 9. Commit التغييرات

```bash
git add .
git commit -m "إضافة ميزة رائعة"
```

استخدم رسائل commit واضحة بالعربية أو الإنجليزية:
- ✅ "إضافة ميزة البحث في الأهداف"
- ✅ "إصلاح خطأ في عرض الإشعارات"
- ✅ "تحديث وثائق API"
- ❌ "تعديلات"
- ❌ "fix"

### 10. Push للفرع

```bash
git push origin feature/amazing-feature
```

### 11. افتح Pull Request

1. اذهب إلى صفحة المشروع على GitHub
2. اضغط "Compare & pull request"
3. املأ النموذج بوضوح:
   - **العنوان**: وصف مختصر للتغيير
   - **الوصف**: شرح مفصل لما تم تغييره ولماذا
   - **لقطات الشاشة**: إذا كانت التغييرات مرئية
   - **الاختبارات**: كيف اختبرت التغييرات

## 📝 معايير الكود

### TypeScript

- استخدم TypeScript لجميع الملفات الجديدة
- حدد الأنواع بوضوح
- تجنب `any` قدر الإمكان

```typescript
// ✅ جيد
interface Goal {
  id: number;
  title: string;
  progress: number;
}

// ❌ سيء
const goal: any = { ... };
```

### React Components

- استخدم Functional Components مع Hooks
- فصل المنطق عن العرض
- استخدم أسماء واضحة

```typescript
// ✅ جيد
export const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <View>
      {/* ... */}
    </View>
  );
};

// ❌ سيء
export default function Card(props: any) {
  // ...
}
```

### التنسيق

- استخدم مسافتين للمسافة البادئة
- استخدم فواصل منقوطة
- استخدم علامات اقتباس مفردة للنصوص

```typescript
// ✅ جيد
const message = 'مرحباً';
const colors = {
  primary: '#7c3aed',
  background: '#0b1020'
};

// ❌ سيء
const message="مرحباً"
const colors={primary:"#7c3aed",background:"#0b1020"}
```

### الأسماء

- المكونات: `PascalCase`
- الدوال: `camelCase`
- الثوابت: `UPPER_SNAKE_CASE`
- الملفات: `PascalCase.tsx` للمكونات

```typescript
// ✅ جيد
const GoalsList = () => { ... };
const calculateProgress = () => { ... };
const MAX_GOALS = 100;

// ❌ سيء
const goals_list = () => { ... };
const CalculateProgress = () => { ... };
const maxGoals = 100;
```

### التعليقات

- اكتب تعليقات بالعربية أو الإنجليزية
- اشرح "لماذا" وليس "ماذا"
- استخدم JSDoc للدوال المعقدة

```typescript
// ✅ جيد
/**
 * حساب نسبة التقدم بناءً على المهام المكتملة
 * @param completed - عدد المهام المكتملة
 * @param total - إجمالي عدد المهام
 * @returns نسبة التقدم من 0 إلى 100
 */
const calculateProgress = (completed: number, total: number): number => {
  // تجنب القسمة على صفر
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// ❌ سيء
// هذه الدالة تحسب التقدم
const calc = (c, t) => {
  return (c / t) * 100;
};
```

## 🧪 الاختبارات

### كتابة اختبارات جديدة

كل ميزة جديدة يجب أن تحتوي على اختبارات:

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { GoalCard } from './GoalCard';

describe('GoalCard', () => {
  it('يعرض عنوان الهدف', () => {
    const goal = { id: 1, title: 'قراءة كتاب', progress: 50 };
    const { getByText } = render(<GoalCard goal={goal} />);
    
    expect(getByText('قراءة كتاب')).toBeTruthy();
  });
  
  it('يعرض نسبة التقدم الصحيحة', () => {
    const goal = { id: 1, title: 'قراءة كتاب', progress: 75 };
    const { getByText } = render(<GoalCard goal={goal} />);
    
    expect(getByText('75%')).toBeTruthy();
  });
});
```

### تشغيل الاختبارات

```bash
# جميع الاختبارات
npm test

# اختبار محدد
npm test -- GoalCard.test.tsx

# مع التغطية
npm test -- --coverage
```

## 🎨 التصميم

### الألوان

استخدم الألوان المحددة في المشروع:

```typescript
const colors = {
  background: '#0b1020',
  primary: '#7c3aed',
  text: '#ffffff',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b'
};
```

### المسافات

استخدم مضاعفات 4 أو 8:

```typescript
// ✅ جيد
style={{ padding: 16, margin: 8 }}

// ❌ سيء
style={{ padding: 15, margin: 7 }}
```

### الخطوط

- العناوين: `fontWeight: '700'`
- النص العادي: `fontWeight: '400'` أو '600'
- النص الثانوي: `fontSize: 12` أو 13

## 🐛 الإبلاغ عن الأخطاء

عند الإبلاغ عن خطأ، يرجى تضمين:

1. **وصف المشكلة**: ماذا حدث؟
2. **الخطوات لإعادة الإنتاج**: كيف يمكن إعادة إنتاج الخطأ؟
3. **السلوك المتوقع**: ماذا كان يجب أن يحدث؟
4. **لقطات الشاشة**: إذا كان الخطأ مرئياً
5. **البيئة**:
   - نظام التشغيل
   - إصدار Node.js
   - إصدار التطبيق

## 💡 اقتراح ميزات جديدة

عند اقتراح ميزة:

1. **الوصف**: ما هي الميزة؟
2. **الفائدة**: لماذا هذه الميزة مفيدة؟
3. **الاستخدام**: كيف سيستخدمها المستخدمون؟
4. **البدائل**: هل هناك طرق أخرى لتحقيق نفس الهدف؟

## 📞 التواصل

- **GitHub Issues**: للأخطاء والاقتراحات
- **Pull Requests**: للمساهمات بالكود
- **Discussions**: للأسئلة والنقاشات

## ✅ قائمة التحقق قبل PR

قبل فتح Pull Request، تأكد من:

- [ ] الكود يعمل بدون أخطاء
- [ ] الاختبارات تمر بنجاح (`npm test`)
- [ ] لا توجد تحذيرات TypeScript
- [ ] الكود منسق بشكل صحيح
- [ ] التعليقات واضحة ومفيدة
- [ ] الوثائق محدثة (إذا لزم الأمر)
- [ ] لقطات الشاشة مرفقة (للتغييرات المرئية)
- [ ] رسالة Commit واضحة
- [ ] الفرع محدث مع `main`

## 🙏 شكراً!

شكراً لمساهمتك في جعل سمارت جايد أفضل! 🎉

</div>
