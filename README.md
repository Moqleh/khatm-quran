# اختم قرآنك | Khatm Quran

منصة قرآنية مجانية وبدون إعلانات، محورها القرآن والختمة اليومية، مع الصلاة والقبلة والخصوصية.

> صدقة جارية عن محمد العقلة وعائلته.

## مبادئ الإصدار
- القرآن والختمة أولًا.
- لا حساب مطلوب للاستخدام الأساسي.
- التقدم والإعدادات محلية مع تصدير/استيراد JSON.
- لا يعرض نص قرآني بديل عند فشل التحقق.
- لا تستخدم مواضع تقريبية للسور أو الأجزاء أو الصفحات.
- واجهة عربية/إنجليزية وPWA.

## بوابة سلامة القرآن
التطبيق مهيأ لاستخدام ملف محلي فقط: `assets/data/quran-uthmani.txt`.
يجب أن تكون النسخة مثبتة حرفيًا من المصدر المعتمد، ثم ينجح:

```bash
npm run verify-quran
```

الفحص الحالي يرفض البناء عند غياب الملف، أو اختلاف 6236 آية / 114 سورة / 604 بداية صفحة، أو فساد تسلسل بيانات الصفحات. كما يحسب SHA-256. لا تعتبر البصمة مرجعية حتى تتم مطابقتها مستقلًا مع artifact رسمي موثق.

## المصادر
- Quran text target: Tanzil Quran Text, Uthmani v1.1 — verbatim distribution only with attribution under Tanzil terms.
- Prayer times: AlAdhan, requested only after user action.
- Qibla: local mathematical bearing to the Kaaba coordinates.
- Manual city fallback geocodes only after explicit user action.

## النشر
GitHub Actions يشغل `npm run verify-quran` على push وpull request. أي فشل يمنع اعتبار طبقة القرآن صالحة للنشر.
