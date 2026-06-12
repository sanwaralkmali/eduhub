-- Edu-Hub · correct the "School Uniform Program" item on existing databases.
-- We supply standard sizes (no on-site measuring) and quote on request. The seed
-- migration uses ON CONFLICT DO NOTHING, so it won't update an already-seeded row —
-- run this once in the Supabase SQL editor to fix the live data. Idempotent.

update public.catalogue_items
set
  summary_en = 'Quality branded uniforms in a full range of standard sizes, delivered to your school.',
  summary_ar = 'أزياء مدرسية عالية الجودة بشعار مدرستك، بمجموعة كاملة من المقاسات القياسية، تُوصَّل إليك.',
  description_en = 'Durable uniforms with your school crest, supplied in a full range of standard sizes and delivered ready to wear — with easy restocking whenever you need more.',
  description_ar = 'أزياء متينة تحمل شعار مدرستك، تُوفَّر بمجموعة كاملة من المقاسات القياسية وتُسلَّم جاهزة للارتداء — مع إعادة تزويد سهلة عند الحاجة.',
  features_en = array['Range of standard sizes', 'School crest branding', 'Easy restocking']::text[],
  features_ar = array['مقاسات قياسية متنوّعة', 'طباعة شعار المدرسة', 'إعادة تزويد سهلة']::text[],
  price_label_en = 'Request a quote',
  price_label_ar = 'اطلب عرض سعر'
where slug = 'uniform-program';
