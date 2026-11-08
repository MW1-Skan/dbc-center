# Arabic glossary

Terms used consistently across `messages/ar.json`. Keep this file in step with the copy: when a
new term is decided, add it here first.

## Style

- Modern Standard Arabic, warm and clear, addressing the reader respectfully (أنت). Headlines are
  rewritten for Arabic rhythm rather than translated word for word.
- Arabic punctuation (، ؛ ؟) and Arabic quotation marks («…»); Western digits (0-9) for every
  number: phone numbers, prices, BMI values, years, times, room numbers.
- Numeric ranges (`2013–2018`, `[09–12]`) are left to the browser's bidi algorithm: in an RTL
  paragraph the first value appears on the right, which is how Arabic readers read a range.
- Latin acronyms stay Latin: FRCSI, IFSO, ASMBS, BMI, HMC, M.B.Ch.B., M.S., WhatsApp. The
  institution is written in Arabic with the acronym in parentheses where it helps, e.g.
  زمالة الكلية الملكية للجراحين في أيرلندا (FRCSI).
- A Left-to-Right Mark (U+200E) follows `M.B.Ch.B.` and `M.S.` wherever they sit inside Arabic
  text, so the final period stays attached to the abbreviation instead of jumping to its other
  side. It is invisible in editors; keep it when editing those strings.
- Publication and presentation titles under `DoctorPage.research` stay in English (academic
  convention); only the venue, teaching, congress and honours lines are Arabic.
- The logo wordmark (`Common.brandWord`, `Common.brandSub`) stays "DELTA" / "BARIATRIC CENTER".
- Square-bracket placeholders stay bracketed with the text inside translated:
  `[X working hours]` → `[X ساعة عمل]`, `[EGP 000]` → `[000 جنيه]`, `[Draft for approval]` →
  a bracketed note once the doctor's copy arrives.

## Names

| English                               | Arabic                                                 |
| ------------------------------------- | ------------------------------------------------------ |
| Delta Bariatric Center (running text) | مركز دلتا لجراحات السمنة                               |
| Delta Bariatric Center (short, "DBC") | مركز دلتا                                              |
| Dr. Mohsen Karam                      | د. محسن كرم                                            |
| Dr. Karam                             | د. كرم                                                 |
| Delta Building, Louran                | عمارة دلتا، لوران                                      |
| Al Horreya Road                       | طريق الحرية                                            |
| Alexandria                            | الإسكندرية                                             |
| Hamad Medical Corporation (HMC)       | مؤسسة حمد الطبية                                       |
| Hamad General Hospital                | مستشفى حمد العام                                       |
| Qatar Metabolic Institute (QMI)       | معهد قطر للتمثيل الغذائي                               |
| National Bariatric Center             | المركز الوطني لجراحات السمنة                           |
| Qatar Robotic Surgery Centre          | مركز قطر للجراحة الروبوتية                             |
| Royal College of Surgeons in Ireland  | الكلية الملكية للجراحين في أيرلندا                     |
| University of Strasbourg              | جامعة ستراسبورغ                                        |
| Alexandria University                 | جامعة الإسكندرية                                       |
| Faculty of Medicine                   | كلية الطب                                              |
| IFSO (full name)                      | الاتحاد الدولي لجراحة السمنة واضطرابات التمثيل الغذائي |
| ASMBS (full name)                     | الجمعية الأمريكية لجراحات التمثيل الغذائي والسمنة      |
| American College of Surgeons          | الكلية الأمريكية للجراحين                              |
| IFSO World Congress                   | مؤتمر IFSO العالمي                                     |
| ASMBS Annual Meeting                  | اجتماع ASMBS السنوي                                    |
| ObesityWeek, GOSS                     | kept in Latin                                          |

## Medical and service terms (given)

| English                       | Arabic                         |
| ----------------------------- | ------------------------------ |
| bariatric & metabolic surgery | جراحات السمنة والتمثيل الغذائي |
| sleeve gastrectomy            | تكميم المعدة                   |
| gastric bypass                | تحويل مسار المعدة              |
| gastric plication             | طي المعدة                      |
| gastric balloon               | بالون المعدة                   |
| laparoscopic                  | بالمنظار                       |
| non-surgical                  | بدون جراحة                     |
| consultation                  | استشارة                        |
| follow-up                     | متابعة                         |
| BMI                           | مؤشر كتلة الجسم (BMI)          |
| dietitian                     | أخصائي التغذية                 |
| psychologist                  | أخصائي نفسي                    |
| physiotherapy                 | العلاج الطبيعي                 |
| room rental                   | تأجير غرف الكشف                |
| consultation room             | غرفة كشف                       |
| Book a consultation           | احجز استشارة                   |
| Request a call back           | اطلب معاودة الاتصال            |
| WhatsApp us                   | راسلنا على واتساب              |

## Terms decided during translation

| English                                              | Arabic                                                    | Note                                                   |
| ---------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| Procedures (section, nav)                            | العمليات                                                  |                                                        |
| Our team / departments                               | فريقنا / الأقسام                                          |                                                        |
| Patient stories                                      | قصص المرضى                                                |                                                        |
| Medical advice                                       | نصائح طبية                                                |                                                        |
| Bariatric surgery (department)                       | جراحات السمنة                                             | plural form used throughout                            |
| Bariatric medicine                                   | طب السمنة                                                 |                                                        |
| Clinical nutrition                                   | التغذية العلاجية                                          |                                                        |
| Psychology (department)                              | الدعم النفسي                                              | "الطب النفسي" would read as psychiatry                 |
| Plastic surgery                                      | جراحات التجميل                                            |                                                        |
| Dermatology                                          | الأمراض الجلدية                                           |                                                        |
| Consultant General, Laparoscopic & Bariatric Surgeon | استشاري الجراحة العامة وجراحات المناظير والسمنة           |                                                        |
| Fellow / fellowship                                  | زمالة                                                     |                                                        |
| Fellowship training                                  | تدريب زمالة                                               |                                                        |
| University Diploma in Laparoscopic Surgery           | دبلوم جامعي في الجراحة بالمنظار                           | French title kept in Latin where it is the formal name |
| Master of Surgery                                    | ماجستير الجراحة                                           |                                                        |
| M.B.Ch.B.                                            | بكالوريوس الطب والجراحة (M.B.Ch.B.)                       |                                                        |
| Very Good with Honour                                | تقدير جيد جدًا مع مرتبة الشرف                             |                                                        |
| Residents / fellows                                  | الأطباء المقيمون / أطباء الزمالة                          |                                                        |
| Peer-reviewed publications                           | منشورات علمية محكّمة                                      |                                                        |
| Oral presentation / poster / surgical video          | عرض شفهي / ملصق علمي / فيديو جراحي                        |                                                        |
| Grand rounds                                         | جولات كبرى                                                |                                                        |
| Journal club                                         | نادي الدوريات العلمية                                     |                                                        |
| Stars of Excellence — Award of Merit                 | نجوم التميّز — جائزة الاستحقاق                            |                                                        |
| Certificate of Appreciation                          | شهادة تقدير                                               |                                                        |
| Clinical appointments                                | المناصب الإكلينيكية                                       |                                                        |
| Specialist / Consultant                              | أخصائي / استشاري                                          |                                                        |
| Second opinion                                       | رأي ثانٍ                                                  |                                                        |
| First consultation                                   | استشارة أولى                                              |                                                        |
| Time of day: Morning / Afternoon / Evening           | صباحًا / بعد الظهر / مساءً                                |                                                        |
| Half-day / Full day / Monthly                        | نصف يوم / يوم كامل / شهري                                 |                                                        |
| Available / Selected / In use                        | متاحة / محددة / مستخدمة                                   | feminine, agreeing with غرفة                           |
| In use by DBC                                        | يستخدمها مركز دلتا                                        |                                                        |
| Not for rent                                         | غير متاحة للإيجار                                         |                                                        |
| Waiting area / Reception / Corridor                  | صالة الانتظار / الاستقبال / الممر                         |                                                        |
| Floor plan                                           | مخطط                                                      |                                                        |
| Rental inquiry                                       | استفسار عن الإيجار                                        |                                                        |
| Availability                                         | المواعيد المتاحة                                          |                                                        |
| Quote (price)                                        | عرض السعر                                                 |                                                        |
| Request received / Inquiry sent                      | تم استلام طلبك / تم إرسال استفسارك                        |                                                        |
| Sending…                                             | جارٍ الإرسال…                                             |                                                        |
| Call me back                                         | اتصلوا بي                                                 |                                                        |
| Optional                                             | (اختياري)                                                 |                                                        |
| Privacy / Medical disclaimer / Rental terms          | الخصوصية / إخلاء المسؤولية الطبية / شروط الإيجار          |                                                        |
| Back to top / Skip to content                        | العودة إلى الأعلى / انتقل إلى المحتوى                     |                                                        |
| Home (nav, breadcrumb)                               | الرئيسية                                                  |                                                        |
| Photo · / Portrait · / Illustration                  | صورة · / صورة شخصية · / رسم توضيحي                        | placeholder labels                                     |
| Photo placeholder: …                                 | موضع صورة: …                                              | alt text for placeholders                              |
| EGP                                                  | جنيه                                                      | `[EGP 000]` → `[000 جنيه]`                             |
| m²                                                   | م²                                                        |                                                        |
| cm / kg                                              | سم / كجم                                                  |                                                        |
| Healthy range / Overweight / Obesity class I–III     | نطاق صحي / زيادة في الوزن / سمنة من الدرجة الأولى–الثالثة |                                                        |
| Could weight-loss surgery be right for you?          | هل تناسبك جراحة إنقاص الوزن؟                              |                                                        |
| Travelling from the Gulf or abroad?                  | قادم من الخليج أو من الخارج؟                              |                                                        |
