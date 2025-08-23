# 🏛️ دربال - موقع المقالات والقبسات

**موقع دربال للمقالات والقبسات والمواضيع المختارة** - منصة عربية متكاملة للمحتوى الأدبي والفكري

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📋 جدول المحتويات

- [نظرة عامة](#نظرة-عامة)
- [المميزات](#المميزات)
- [التقنيات المستخدمة](#التقنيات-المستخدمة)
- [هيكل المشروع](#هيكل-المشروع)
- [التثبيت والتشغيل](#التثبيت-والتشغيل)
- [الهيكل التقني](#الهيكل-التقني)
- [SEO والبيانات الوصفية](#seo-والبيانات-الوصفية)
- [المساهمة](#المساهمة)
- [الترخيص](#الترخيص)

## 🌟 نظرة عامة

**دربال** هو موقع عربي متطور يقدم منصة شاملة للمقالات والقبسات والمواضيع المختارة. يتميز الموقع بتصميم عصري، واجهة مستخدم بديهية، وتجربة قراءة مريحة باللغة العربية مع دعم كامل للـ RTL.

### 🎯 الأهداف

- توفير منصة عربية عالية الجودة للمحتوى الأدبي والفكري
- تسهيل اكتشاف وتنظيم المقالات حسب التصنيفات والوسوم
- تقديم تجربة مستخدم متميزة ومتجاوبة مع جميع الأجهزة
- تحسين محركات البحث (SEO) للمحتوى العربي

## ✨ المميزات

### 🎨 واجهة المستخدم

- **تصميم عصري ومتجاوب** - يعمل على جميع الأجهزة والشاشات
- **دعم كامل للغة العربية** - اتجاه RTL وتصميم مخصص للعربية
- **خطوط عربية جميلة** - استخدام خط Tajawal للقراءة المريحة
- **ألوان متناسقة** - لوحة ألوان احترافية ومريحة للعين

### 📱 تجربة المستخدم

- **تنقل سلس** - انتقال سريع بين الصفحات والأقسام
- **بحث متقدم** - البحث في المقالات والمحتوى
- **تصنيف ذكي** - تنظيم المحتوى حسب الفئات والوسوم
- **المفضلة** - حفظ المقالات المفضلة للقراءة لاحقاً
- **تصفح سريع** - تبديل سريع بين التصنيفات الفرعية

### 🔍 SEO وتحسين محركات البحث

- **بيانات وصفية ديناميكية** - لكل صفحة ومقال
- **بيانات منظمة (Structured Data)** - JSON-LD schema
- **Open Graph** - تحسين المشاركة على وسائل التواصل الاجتماعي
- **Twitter Cards** - دعم كامل لمشاركة المحتوى
- **URLs صديقة لمحركات البحث** - هيكل URL واضح ومنطقي

### 🚀 الأداء

- **Next.js 15** - أحدث إصدار مع App Router
- **Server Components** - تحسين الأداء والـ SEO
- **تحسين الصور** - WebP و AVIF مع أحجام متعددة
- **تحسين الخطوط** - تحميل سريع للخطوط العربية
- **ضغط المحتوى** - تحسين سرعة التحميل

## 🛠️ التقنيات المستخدمة

### Frontend

- **[Next.js 15.4.6](https://nextjs.org/)** - إطار عمل React مع App Router
- **[React 19.1.0](https://reactjs.org/)** - مكتبة واجهة المستخدم
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - لغة البرمجة مع دعم الأنواع
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - إطار عمل CSS utility-first

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** - مكونات UI قابلة للوصول
- **[Lucide React](https://lucide.dev/)** - أيقونات جميلة ومتسقة
- **[React Icons](https://react-icons.github.io/react-icons/)** - مكتبة شاملة للأيقونات
- **[Embla Carousel](https://www.embla-carousel.com/)** - عرض شرائح متقدم

### State Management & Data Fetching

- **[TanStack Query](https://tanstack.com/query)** - إدارة حالة البيانات والـ API calls
- **[React Query](https://tanstack.com/query/latest)** - إدارة حالة الخادم

### Styling & Animation

- **[Class Variance Authority](https://cva.style/docs)** - إدارة متغيرات CSS
- **[CLSX](https://github.com/lukasbach/clsx)** - دمج classes بشكل ذكي
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - دمج Tailwind classes
- **[Motion](https://motion.dev/)** - مكتبة الرسوم المتحركة
- **[TW Animate CSS](https://github.com/joeattardi/tw-animate-css)** - رسوم متحركة CSS

### Security & Validation

- **[React Google reCAPTCHA](https://github.com/tdoan51/react-google-recaptcha)** - حماية من الروبوتات

## 📁 هيكل المشروع

```
src/
├── app/                          # Next.js App Router
│   ├── (homePage)/              # مجموعة الصفحات الرئيسية
│   │   ├── components/          # مكونات الصفحة الرئيسية
│   │   ├── [categoryname]/      # صفحات الفئات (ديناميكية)
│   │   │   └── [subCategory]/   # صفحات الفئات الفرعية
│   │   │       └── [articleId]/ # صفحات المقالات
│   │   ├── archive/             # صفحة المفضلة
│   │   ├── search/              # صفحة البحث
│   │   ├── tags/                # صفحة الوسوم
│   │   └── resume/              # صفحة السيرة الذاتية
│   ├── [...rest]/               # صفحة 404
│   ├── globals.css              # الأنماط العامة
│   └── layout.tsx               # التخطيط الرئيسي
├── components/                   # المكونات المشتركة
│   ├── common/                  # مكونات عامة
│   ├── providers/               # مزودي الحالة
│   └── accessibility-wrapper/   # مكونات إمكانية الوصول
├── lib/                         # المكتبات والوظائف المساعدة
│   ├── api/                     # API calls
│   ├── metadata/                # توليد البيانات الوصفية
│   ├── Seo/                     # بيانات SEO المنظمة
│   └── utils/                   # وظائف مساعدة
└── constant/                     # الثوابت والمتغيرات
```

## 🚀 التثبيت والتشغيل

### المتطلبات الأساسية

- **Node.js** 18.0 أو أحدث
- **npm** أو **yarn** أو **pnpm**

### خطوات التثبيت

1. **استنساخ المشروع**

   ```bash
   git clone https://github.com/yourusername/new-dirbal-website-v2.git
   cd new-dirbal-website-v2
   ```

2. **تثبيت التبعيات**

   ```bash
   npm install
   # أو
   yarn install
   # أو
   pnpm install
   ```

3. **إعداد متغيرات البيئة**

   ```bash
   cp .env.example .env.local
   ```

   ثم قم بتعديل `.env.local`:

   ```env
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   ```

4. **تشغيل المشروع في وضع التطوير**

   ```bash
   npm run dev
   # أو
   yarn dev
   # أو
   pnpm dev
   ```

5. **فتح المتصفح**
   ```
   http://localhost:3000
   ```

### أوامر أخرى مفيدة

```bash
# بناء المشروع للإنتاج
npm run build

# تشغيل المشروع المبنى
npm run start

# فحص الكود
npm run lint
```

## 🏗️ الهيكل التقني

### App Router Architecture

يستخدم المشروع **Next.js 15** مع **App Router** الجديد، مما يوفر:

- **Server Components** افتراضياً - تحسين الأداء والـ SEO
- **Client Components** عند الحاجة - للتفاعل والـ state
- **Route Groups** - تنظيم منطقي للصفحات
- **Dynamic Routes** - صفحات ديناميكية للفئات والمقالات

### Metadata & SEO System

نظام متقدم للبيانات الوصفية والـ SEO:

```typescript
// مثال على توليد البيانات الوصفية
export async function generateMetadata({ params }) {
  return generateArticleMetadata(article, categoryName);
}

// مثال على البيانات المنظمة
const structuredData = generateArticleStructuredData(article, categoryName);
```

**المميزات:**

- ✅ **بيانات وصفية ديناميكية** لكل صفحة
- ✅ **Open Graph** للمشاركة الاجتماعية
- ✅ **Twitter Cards** لدعم تويتر
- ✅ **JSON-LD Schema** لمحركات البحث
- ✅ **URLs متعددة اللغات** (عربي/إنجليزي)

### Component Architecture

- **Server Components** - للصفحات والبيانات الوصفية
- **Client Components** - للتفاعل والـ state management
- **Composition Pattern** - إعادة استخدام المكونات
- **Props Interface** - TypeScript interfaces واضحة

### Styling Strategy

- **Tailwind CSS 4.0** - utility-first CSS framework
- **CSS Variables** - للألوان والخطوط
- **Responsive Design** - تصميم متجاوب بالكامل
- **RTL Support** - دعم كامل للغة العربية

## 🔍 SEO والبيانات الوصفية

### Metadata Generation

كل صفحة في الموقع تولد بيانات وصفية مخصصة:

```typescript
// الصفحة الرئيسية
generateHomeMetadata();

// صفحات الفئات
generateSubCategoryMetadata(subCategory, subSubCategory, categoryName);

// صفحات المقالات
generateArticleMetadata(article, categoryName);

// صفحة المفضلة
generateArchiveMetadata();

// صفحة البحث
generateSearchMetadata(query);

// صفحة الوسوم
generateTagsMetadata(tag);
```

### Structured Data (JSON-LD)

بيانات منظمة لتحسين فهم محركات البحث:

- **WebSite** - معلومات الموقع الأساسية
- **Organization** - معلومات المؤسسة
- **Article** - بيانات المقالات
- **CollectionPage** - صفحات المجموعات
- **BreadcrumbList** - مسار التنقل
- **SearchResultsPage** - صفحات نتائج البحث

### Open Graph & Social Media

تحسين المشاركة على وسائل التواصل الاجتماعي:

- **og:title** - عنوان الصفحة
- **og:description** - وصف المحتوى
- **og:image** - صورة المشاركة
- **og:type** - نوع المحتوى
- **og:locale** - اللغة والمنطقة

## 🎨 المكونات الرئيسية

### Layout Components

- **RootLayout** - التخطيط الرئيسي مع البيانات الوصفية العامة
- **HomePageLayout** - تخطيط صفحات الصفحة الرئيسية
- **AccessibilityWrapper** - مكونات إمكانية الوصول
- **ScrollToTopButton** - زر العودة للأعلى

### Page Components

- **HomePage** - الصفحة الرئيسية
- **CategoryPage** - صفحات الفئات
- **ArticlePage** - صفحات المقالات
- **ArchivePage** - صفحة المفضلة
- **SearchPage** - صفحة البحث
- **TagsPage** - صفحة الوسوم

### UI Components

- **ArticleCard** - بطاقة المقال
- **SectionLogo** - شعار القسم
- **HeadingText** - نص العنوان
- **Pagination** - ترقيم الصفحات
- **TabNavigation** - تنقل التبويبات

## 🌐 دعم اللغات والمناطق

### اللغة العربية (RTL)

- **اتجاه RTL** - من اليمين إلى اليسار
- **خطوط عربية** - خط Tajawal
- **ترجمة كاملة** - جميع النصوص بالعربية
- **تصميم مخصص** - واجهة مخصصة للغة العربية

### دعم متعدد اللغات

- **URLs متعددة اللغات** - `/ar/` و `/en/`
- **بيانات وصفية متعددة اللغات** - لكل لغة
- **ترجمة ديناميكية** - حسب اللغة المختارة

## 📱 التصميم المتجاوب

### Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Features

- **Mobile First** - تصميم يبدأ من الأجهزة المحمولة
- **Touch Friendly** - واجهة مناسبة للمس
- **Responsive Images** - صور متجاوبة مع جميع الأحجام
- **Flexible Layouts** - تخطيطات مرنة ومتجاوبة

## 🚀 الأداء والتحسين

### Next.js Optimizations

- **Server Components** - تقليل JavaScript في المتصفح
- **Image Optimization** - تحسين الصور تلقائياً
- **Font Optimization** - تحسين تحميل الخطوط
- **Code Splitting** - تقسيم الكود تلقائياً

### Performance Features

- **Lazy Loading** - تحميل الكسول للمكونات
- **Dynamic Imports** - استيراد ديناميكي
- **Bundle Analysis** - تحليل حجم الحزم
- **Compression** - ضغط المحتوى

## 🔒 الأمان

### Security Features

- **reCAPTCHA** - حماية من الروبوتات
- **Input Validation** - التحقق من المدخلات
- **XSS Protection** - حماية من XSS
- **CSRF Protection** - حماية من CSRF

### Best Practices

- **Environment Variables** - متغيرات بيئية آمنة
- **Type Safety** - TypeScript للسلامة
- **Error Boundaries** - حدود الأخطاء
- **Secure Headers** - رؤوس HTTP آمنة

## 🧪 الاختبار

### Testing Strategy

- **Unit Tests** - اختبارات الوحدات
- **Integration Tests** - اختبارات التكامل
- **E2E Tests** - اختبارات النهاية للنهاية
- **Accessibility Tests** - اختبارات إمكانية الوصول

### Tools

- **Jest** - إطار عمل الاختبار
- **React Testing Library** - مكتبة اختبار React
- **Cypress** - اختبارات E2E
- **axe-core** - اختبارات إمكانية الوصول

## 📚 التوثيق

### Code Documentation

- **JSDoc** - توثيق الكود
- **TypeScript Interfaces** - تعريفات الأنواع
- **Component Props** - توثيق خصائص المكونات
- **API Documentation** - توثيق API

### User Documentation

- **User Guide** - دليل المستخدم
- **API Reference** - مرجع API
- **Component Library** - مكتبة المكونات
- **Best Practices** - أفضل الممارسات

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

### كيفية المساهمة

1. **Fork** المشروع
2. **Create** فرع جديد (`git checkout -b feature/amazing-feature`)
3. **Commit** التغييرات (`git commit -m 'Add amazing feature'`)
4. **Push** إلى الفرع (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### معايير الكود

- **TypeScript** - استخدام TypeScript للكود الجديد
- **ESLint** - اتباع قواعد ESLint
- **Prettier** - تنسيق الكود
- **Conventional Commits** - رسائل commit قياسية

### Reporting Issues

- **Bug Reports** - تقارير الأخطاء
- **Feature Requests** - طلبات الميزات
- **Documentation** - تحسينات التوثيق
- **Performance** - مشاكل الأداء

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة **MIT**. راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 الدعم والاتصال

### Support Channels

- **GitHub Issues** - للمشاكل والطلبات
- **Discussions** - للمناقشات والأسئلة
- **Email** - للاتصال المباشر

### Team

- **Maintainers** - المطورون الرئيسيون
- **Contributors** - المساهمون
- **Community** - المجتمع

---

## 🙏 شكر وتقدير

شكراً لجميع المساهمين والمطورين الذين ساعدوا في تطوير هذا المشروع.

**⭐ إذا أعجبك المشروع، لا تنس إعطاءه نجمة!**

---

**تم التطوير بحب ❤️ للغة العربية والمحتوى العربي**
