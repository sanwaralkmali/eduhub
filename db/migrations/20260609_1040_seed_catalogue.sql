-- Edu-Hub · seed catalogue (idempotent)
-- Mirrors src/lib/catalogue/seed.ts so live data matches the dev fallback.

insert into public.service_categories
  (slug, name_en, name_ar, tagline_en, tagline_ar, description_en, description_ar, sort_order)
values
  ('activities', 'Activities', 'الأنشطة',
   'Competitions, trips, and events', 'مسابقات ورحلات وفعاليات',
   'Competitions, indoor and outdoor trips, and school events your students will remember.',
   'مسابقات، ورحلات داخلية وخارجية، وفعاليات مدرسية يتذكّرها طلابك.', 1),
  ('school-services', 'School Services', 'الخدمات المدرسية',
   'Uniforms, gifts, and merchandise', 'أزياء وهدايا ومنتجات',
   'Uniforms, teacher-day gifts, and event merchandise — sourced, branded, and delivered.',
   'أزياء مدرسية، وهدايا يوم المعلّم، ومنتجات الفعاليات — توريد وتجهيز وتوصيل.', 2),
  ('graduation', 'Graduation', 'التخرّج',
   'Gowns, ceremonies, and coordination', 'أثواب وحفلات وتنسيق',
   'Gowns, ceremony packages, and full coordination for a graduation day that runs itself.',
   'أثواب وباقات حفلات وتنسيق كامل ليوم تخرّج يُدار بسلاسة.', 3)
on conflict (slug) do nothing;

-- Helper: insert an item under a category looked up by slug.
insert into public.catalogue_items
  (category_id, slug, name_en, name_ar, summary_en, summary_ar, description_en, description_ar,
   features_en, features_ar, price_label_en, price_label_ar, is_featured, sort_order)
values
  ((select id from public.service_categories where slug = 'activities'),
   'science-fair', 'Science Fair Package', 'باقة معرض العلوم',
   'An end-to-end science competition for your school.', 'مسابقة علمية متكاملة لمدرستك.',
   'We plan, judge, and run your science fair from the first call to the awards — booths, scoring, medals, and certificates all included.',
   'نخطّط ونحكّم وننفّذ معرض العلوم من أول اتصال حتى توزيع الجوائز — تشمل الأجنحة والتقييم والميداليات والشهادات.',
   array['Full event planning', 'Judging and scoring', 'Medals and certificates']::text[],
   array['تخطيط كامل للفعالية', 'تحكيم وتقييم', 'ميداليات وشهادات']::text[],
   'Request a quote', 'اطلب عرض سعر', true, 1),

  ((select id from public.service_categories where slug = 'activities'),
   'museum-day', 'Museum & Discovery Day', 'يوم المتحف والاكتشاف',
   'A guided indoor trip that turns a lesson into an adventure.', 'رحلة داخلية موجّهة تحوّل الدرس إلى مغامرة.',
   'Transport, tickets, guides, and a safety plan for an indoor day of discovery, sized to your class.',
   'النقل والتذاكر والمرشدون وخطة السلامة ليوم داخلي من الاكتشاف، مُصمّم لحجم صفّك.',
   array['Transport and tickets', 'Trained guides', 'Full safety plan']::text[],
   array['النقل والتذاكر', 'مرشدون مدرّبون', 'خطة سلامة كاملة']::text[],
   'Request a quote', 'اطلب عرض سعر', false, 2),

  ((select id from public.service_categories where slug = 'activities'),
   'adventure-camp', 'Outdoor Adventure Camp', 'مخيّم المغامرات الخارجي',
   'A day outdoors with games, teamwork, and supervision.', 'يوم في الهواء الطلق مع الألعاب والعمل الجماعي والإشراف.',
   'Outdoor activities, meals, equipment, and trained supervisors for a safe day that builds teamwork.',
   'أنشطة خارجية ووجبات ومعدّات ومشرفون مدرّبون ليوم آمن يبني روح الفريق.',
   array['Activities and equipment', 'Meals included', 'Trained supervisors']::text[],
   array['أنشطة ومعدّات', 'وجبات مشمولة', 'مشرفون مدرّبون']::text[],
   'Request a quote', 'اطلب عرض سعر', false, 3),

  ((select id from public.service_categories where slug = 'school-services'),
   'uniform-program', 'School Uniform Program', 'برنامج الزي المدرسي',
   'Quality branded uniforms in a full range of standard sizes, delivered to your school.', 'أزياء مدرسية عالية الجودة بشعار مدرستك، بمجموعة كاملة من المقاسات القياسية، تُوصَّل إليك.',
   'Durable uniforms with your school crest, supplied in a full range of standard sizes and delivered ready to wear — with easy restocking whenever you need more.',
   'أزياء متينة تحمل شعار مدرستك، تُوفَّر بمجموعة كاملة من المقاسات القياسية وتُسلَّم جاهزة للارتداء — مع إعادة تزويد سهلة عند الحاجة.',
   array['Range of standard sizes', 'School crest branding', 'Easy restocking']::text[],
   array['مقاسات قياسية متنوّعة', 'طباعة شعار المدرسة', 'إعادة تزويد سهلة']::text[],
   'Request a quote', 'اطلب عرض سعر', true, 1),

  ((select id from public.service_categories where slug = 'school-services'),
   'teacher-gifts', 'Teacher Appreciation Gifts', 'هدايا تكريم المعلّمين',
   'Thoughtful, branded gifts for Teacher Day.', 'هدايا مدروسة تحمل علامتكم ليوم المعلّم.',
   'Curated gift sets, personalised with your school name, packaged and ready to hand out.',
   'مجموعات هدايا منتقاة، مخصّصة باسم مدرستك، مغلّفة وجاهزة للتوزيع.',
   array['Curated gift sets', 'Personalised packaging', 'Bulk delivery']::text[],
   array['مجموعات هدايا منتقاة', 'تغليف مخصّص', 'توصيل بالجملة']::text[],
   'Request a quote', 'اطلب عرض سعر', false, 2),

  ((select id from public.service_categories where slug = 'school-services'),
   'event-merch', 'Event Merchandise Pack', 'حزمة منتجات الفعاليات',
   'T-shirts, caps, and banners for your big day.', 'قمصان وقبّعات ولافتات ليومك الكبير.',
   'Branded merchandise for sports days, festivals, and competitions — designed, produced, and delivered on time.',
   'منتجات تحمل علامتكم لأيام الرياضة والمهرجانات والمسابقات — تصميم وإنتاج وتوصيل في الموعد.',
   array['Custom designs', 'T-shirts and caps', 'Banners and signage']::text[],
   array['تصاميم مخصّصة', 'قمصان وقبّعات', 'لافتات ولوحات']::text[],
   'Request a quote', 'اطلب عرض سعر', false, 3),

  ((select id from public.service_categories where slug = 'graduation'),
   'grad-gowns', 'Graduation Gowns & Caps', 'أثواب وقبّعات التخرّج',
   'Comfortable gowns and caps in your school colours.', 'أثواب وقبّعات مريحة بألوان مدرستك.',
   'Sized for every graduate, in your school colours, with optional sashes and tassels — rented or owned.',
   'بمقاسات لكل خرّيج، بألوان مدرستك، مع أوشحة وشراشيب اختيارية — للإيجار أو التملّك.',
   array['Every size', 'School colours', 'Sashes and tassels']::text[],
   array['كل المقاسات', 'ألوان المدرسة', 'أوشحة وشراشيب']::text[],
   'Request a quote', 'اطلب عرض سعر', true, 1),

  ((select id from public.service_categories where slug = 'graduation'),
   'ceremony-package', 'Ceremony Package', 'باقة الحفل',
   'Stage, sound, and décor for a memorable ceremony.', 'مسرح وصوت وديكور لحفل لا يُنسى.',
   'Stage, sound, lighting, seating, and décor — set up and run so your team can enjoy the day.',
   'مسرح وصوت وإضاءة ومقاعد وديكور — تجهيز وتشغيل ليستمتع فريقك باليوم.',
   array['Stage and sound', 'Décor and seating', 'On-site team']::text[],
   array['مسرح وصوت', 'ديكور ومقاعد', 'فريق في الموقع']::text[],
   'Request a quote', 'اطلب عرض سعر', false, 2),

  ((select id from public.service_categories where slug = 'graduation'),
   'grad-coordination', 'Graduation Coordination', 'تنسيق التخرّج',
   'One coordinator to run the whole graduation day.', 'منسّق واحد لإدارة يوم التخرّج بالكامل.',
   'A dedicated coordinator handles the schedule, rehearsals, vendors, and the run of show from start to finish.',
   'منسّق مخصّص يدير الجدول والبروفات والموردين وسير الحفل من البداية إلى النهاية.',
   array['Dedicated coordinator', 'Rehearsals and run of show', 'Vendor management']::text[],
   array['منسّق مخصّص', 'بروفات وإدارة الحفل', 'إدارة الموردين']::text[],
   'Request a quote', 'اطلب عرض سعر', false, 3)
on conflict (category_id, slug) do nothing;
